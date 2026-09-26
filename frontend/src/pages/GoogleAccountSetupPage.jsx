import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axiosInstance from "../api/axiosInstance";
import { setStoredUser } from "../auth/authStorage";

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(
      window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
  } catch {
    return null;
  }
}

function GoogleAccountSetupPage({ onNavigate }) {
  const token = new URLSearchParams(window.location.search).get("token") || "";
  const googleProfile = decodeToken(token);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm({ ...form, [field]: value });
    setError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!googleProfile?.email || googleProfile.purpose !== "google-signup") {
      setError("This Google signup link is invalid or expired.");
      return;
    }
    if (
      !form.password ||
      form.password.length < 8 ||
      form.password !== form.confirmPassword
    ) {
      setError("Passwords must match and be at least 8 characters.");
      return;
    }
    if (!form.terms) {
      setError("Accept the terms before creating your account.");
      return;
    }
    if (!captchaToken) {
      setError("Complete the reCAPTCHA check.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/google/complete", {
        token,
        password: form.password,
        confirmPassword: form.confirmPassword,
        terms: form.terms,
        captchaToken,
      });
      setStoredUser(data.user);
      onNavigate("/dashboard");
    } catch (requestError) {
      setLoading(false);
      setError(
        requestError.response?.data?.message ||
          "Unable to create your account. Please try again.",
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold text-care-blue-700 dark:text-care-blue-100">
          Google account setup
        </p>
        <h1
          id="auth-title"
          className="font-display text-2xl font-bold tracking-tight text-care-ink dark:text-care-night-ink sm:text-3xl"
        >
          Finish creating your account
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
          Google supplied your basic details. Add a password and accept the
          terms to start scheduling.
        </p>
      </div>

      {googleProfile?.profilePicture && (
        <div className="mb-5 flex items-center gap-3 rounded-lg border border-care-line bg-care-canvas p-3 dark:border-care-night-line dark:bg-care-night-card">
          <img
            src={googleProfile.profilePicture}
            alt="Google profile"
            width="48"
            height="48"
            className="size-12 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-care-ink dark:text-care-night-ink">
              {googleProfile.firstname} {googleProfile.lastname}
            </p>
            <p className="truncate text-xs text-care-muted dark:text-care-night-muted">
              {googleProfile.email}
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-bold">
          First name
          <input
            value={googleProfile?.firstname || ""}
            readOnly
            className="care-input bg-care-canvas"
          />
        </label>
        <label className="grid gap-1.5 text-xs font-bold">
          Last name
          <input
            value={googleProfile?.lastname || ""}
            readOnly
            className="care-input bg-care-canvas"
          />
        </label>
      </div>
      <label className="mt-4 grid gap-1.5 text-xs font-bold">
        Email address
        <input
          value={googleProfile?.email || ""}
          readOnly
          type="email"
          className="care-input bg-care-canvas"
        />
      </label>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <label className="grid gap-1.5 text-xs font-bold">
          Create password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={update("password")}
            autoComplete="new-password"
            className="care-input"
          />
        </label>
        <label className="grid gap-1.5 text-xs font-bold">
          Confirm password
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
            autoComplete="new-password"
            className="care-input"
          />
        </label>

        {recaptchaSiteKey && (
          <ReCAPTCHA
            sitekey={recaptchaSiteKey}
            onChange={(value) => setCaptchaToken(value || "")}
            onExpired={() => setCaptchaToken("")}
          />
        )}

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-care-muted dark:text-care-night-muted">
          <input
            name="terms"
            type="checkbox"
            checked={form.terms}
            onChange={update("terms")}
            className="mt-0.5 size-4 shrink-0 accent-care-green-700"
          />
          <span>
            I agree to the Terms of Service, Privacy Policy, and HIPAA
            safeguards.
          </span>
        </label>

        {error && (
          <p role="alert" className="text-xs font-semibold text-care-error">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-care-green-700 py-3 text-sm font-bold text-white hover:bg-care-green-800 disabled:opacity-60 dark:bg-care-green-600"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
    </div>
  );
}

export default GoogleAccountSetupPage;
