import User from "../models/userModel.js";
import { signupSchema, loginSchema } from "../schema/authSchema.js";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import {
  FRONTEND_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
  GOOGLE_SECRET_KEY,
  JWT_SECRET,
  RECAPTCHA_SECRET_KEY,
} from "../config/env.js";

const googleScopes = "openid email profile";

function requireOAuthConfig() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_SECRET_KEY || !JWT_SECRET) {
    throw new Error("Google OAuth is not configured on the server.");
  }
}

function signAuthToken(user) {
  requireOAuthConfig();
  return jwt.sign({ sub: user._id.toString() }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

function readCookie(request, name) {
  const cookies = request.headers.cookie || "";
  const value = cookies
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return value ? decodeURIComponent(value.slice(name.length + 1)) : "";
}

function setOAuthStateCookie(response, value, maxAge = 600) {
  response.setHeader(
    "Set-Cookie",
    `google_oauth_state=${encodeURIComponent(value)}; HttpOnly; SameSite=Lax; Path=/auth/google; Max-Age=${maxAge}`,
  );
}

function googleRedirect(path) {
  return `${FRONTEND_URL}${path}`;
}

async function verifyRecaptcha(token) {
  if (!RECAPTCHA_SECRET_KEY || !token) return false;

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        }),
      },
    );
    const result = await response.json();
    return response.ok && result.success === true;
  } catch {
    return false;
  }
}

export function googleStart(req, res) {
  try {
    requireOAuthConfig();
    const state = crypto.randomBytes(24).toString("hex");
    setOAuthStateCookie(res, state);
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: googleScopes,
      state,
      access_type: "online",
      prompt: "select_account",
    });
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
  } catch (error) {
    res.redirect(
      googleRedirect(`/login?oauthError=${encodeURIComponent(error.message)}`),
    );
  }
}

export async function googleCallback(req, res) {
  try {
    requireOAuthConfig();
    const stateCookie = readCookie(req, "google_oauth_state");
    setOAuthStateCookie(res, "", 0);
    if (!stateCookie || stateCookie !== req.query.state) {
      throw new Error("Invalid Google OAuth state.");
    }
    if (!req.query.code)
      throw new Error("Google did not return an authorization code.");

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: req.query.code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_SECRET_KEY,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });
    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      throw new Error("Google authorization failed.");
    }

    const profileResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );
    const profile = await profileResponse.json();
    if (!profileResponse.ok || !profile.email || !profile.email_verified) {
      throw new Error("Google did not return a verified email address.");
    }

    const email = profile.email.toLowerCase();
    const user = await User.findOne({ email });
    if (user) {
      const token = signAuthToken(user);
      return res.redirect(
        googleRedirect(`/auth/callback?token=${encodeURIComponent(token)}`),
      );
    }

    const setupToken = jwt.sign(
      {
        purpose: "google-signup",
        email,
        firstname: profile.given_name || "",
        lastname: profile.family_name || "",
        profilePicture: profile.picture || "",
      },
      JWT_SECRET,
      { expiresIn: "10m" },
    );
    return res.redirect(
      googleRedirect(`/google/setup?token=${encodeURIComponent(setupToken)}`),
    );
  } catch (error) {
    return res.redirect(
      googleRedirect(`/login?oauthError=${encodeURIComponent(error.message)}`),
    );
  }
}

export async function googleSession(req, res) {
  try {
    requireOAuthConfig();
    const token = req.headers.authorization?.replace("Bearer ", "");
    const payload = jwt.verify(token || "", JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "Account not found." });
    return res.json({ user: user.omitPassword() });
  } catch {
    return res
      .status(401)
      .json({ message: "Google session is invalid or expired." });
  }
}

export async function completeGoogleSignup(req, res) {
  try {
    requireOAuthConfig();
    const payload = jwt.verify(req.body.token || "", JWT_SECRET);
    if (payload.purpose !== "google-signup") {
      return res.status(400).json({ message: "Invalid Google account setup." });
    }
    const password = String(req.body.password || "");
    if (password.length < 8 || password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({
          message: "Passwords must match and be at least 8 characters.",
        });
    }
    if (!req.body.terms) {
      return res
        .status(400)
        .json({ message: "Accept the terms before creating your account." });
    }
    if (!(await verifyRecaptcha(req.body.captchaToken))) {
      return res
        .status(400)
        .json({ message: "reCAPTCHA verification failed. Please try again." });
    }
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return res
        .status(409)
        .json({
          message: "An account with this email address already exists.",
        });
    }
    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10),
    );
    const user = await User.create({
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      password: hashedPassword,
      profilePicture: payload.profilePicture || "",
      role: "user",
    });
    return res
      .status(201)
      .json({ user: user.omitPassword(), token: signAuthToken(user) });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message || "Unable to finish Google signup." });
  }
}

export const signup = async (req, res) => {
  try {
    const body = signupSchema.parse(req.body);

    if (!(await verifyRecaptcha(body.captchaToken))) {
      return res.status(400).json({
        message: "reCAPTCHA verification failed. Please try again.",
      });
    }

    const existingUser = await User.findOne({
      email: body.email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email address already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);

    const newUser = new User({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email.toLowerCase(),
      password: hashPassword,
      role: body.role || "user",
    });

    await newUser.save();

    return res.status(201).json({
      message: "Account created successfully.",
      user: newUser.omitPassword(),
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed.",
        errors: error.errors,
      });
    }
    return res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const body = loginSchema.parse(req.body);

    if (!(await verifyRecaptcha(body.captchaToken))) {
      return res.status(400).json({
        message: "reCAPTCHA verification failed. Please try again.",
      });
    }

    const user = await User.findOne({ email: body.email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    return res.status(200).json({
      message: "Login successful.",
      user: user.omitPassword(),
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed.",
        errors: error.errors,
      });
    }
    return res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};
