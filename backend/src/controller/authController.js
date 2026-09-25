import User from "../models/userModel.js";
import { signupSchema, loginSchema } from "../schema/authSchema.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const body = signupSchema.parse(req.body);

    const existingUser = await User.findOne({ email: body.email.toLowerCase() });

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
