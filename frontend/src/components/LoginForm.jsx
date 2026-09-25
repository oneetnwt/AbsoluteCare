import { useState } from "react";
import PasswordField from "./PasswordField";
import AuthDivider from "./AuthDivider";
import GoogleAuthButton from "./GoogleAuthButton";
import axiosInstance from "../api/axiosInstance";
import { setStoredUser } from "../auth/authStorage";

function LoginForm({ onNavigate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    text: "",
    isError: false,
  });

  const update = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
    setStatusMessage({ text: "", isError: false });
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.password) {
      nextErrors.password = "Enter your password.";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setStatusMessage({ text: "", isError: false });

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      if (!response.data.user) {
        throw new Error("The login response did not include a user.");
      }
      setStoredUser(response.data.user);
      setLoading(false);
      onNavigate("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setStatusMessage({ text: err.response.data.message, isError: true });
      } else {
        setStatusMessage({
          text: "Unable to sign in right now. Check that the API is running and try again.",
          isError: true,
        });
      }
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-care-blue-700/20 bg-care-blue-50/70 px-2.5 py-0.5 text-xs font-semibold text-care-blue-700 dark:border-care-blue-500/30 dark:bg-care-blue-900/30 dark:text-care-blue-100">
          <span className="size-1.5 rounded-full bg-care-blue-500" />
          Physical Therapy Portal
        </div>
        <h1
          id="auth-title"
          className="font-display text-2xl font-bold tracking-tight text-care-ink dark:text-care-night-ink sm:text-3xl"
        >
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-care-muted dark:text-care-night-muted">
          Manage physical therapy appointments, rehabilitation plans, and
          patient records.
        </p>
      </div>

      <div className="space-y-4">
        <GoogleAuthButton label="Sign in with Google Workspace" />
        <AuthDivider />

        <form onSubmit={submit} noValidate className="space-y-4">
          <div className="grid gap-1.5">
            <label
              htmlFor="login-email"
              className="text-xs font-bold text-care-ink dark:text-care-night-ink"
            >
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
              placeholder="therapist@clinic.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              className="care-input"
            />
            {errors.email && (
              <p
                id="login-email-error"
                className="m-0 text-xs font-semibold text-care-error"
              >
                {errors.email}
              </p>
            )}
          </div>

          <PasswordField
            id="login-password"
            label="Password"
            value={form.password}
            onChange={update("password")}
            error={errors.password}
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <label className="flex items-center gap-2 font-medium text-care-muted dark:text-care-night-muted cursor-pointer">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={update("remember")}
                className="size-4 rounded accent-care-green-700"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => onNavigate("forgot")}
              className="font-semibold text-care-blue-700 underline decoration-1 underline-offset-4 hover:text-care-blue-800 dark:text-care-blue-500"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border-0 bg-care-green-700 py-3 text-sm font-bold text-white shadow-sm shadow-care-green-700/25 transition-all hover:bg-care-green-800 active:scale-[0.99] disabled:opacity-60 dark:bg-care-green-600 dark:hover:bg-care-green-700"
          >
            {loading ? "Verifying credentials…" : "Sign in to AbsoluteCare"}
          </button>

          {statusMessage.text && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl p-3.5 text-xs font-semibold ${
                statusMessage.isError
                  ? "border border-care-error-border bg-care-error-bg text-care-error dark:bg-rose-950/30"
                  : "border border-care-green-700/20 bg-care-green-50 text-care-green-800 dark:bg-care-green-900/30 dark:text-care-green-100"
              }`}
            >
              {statusMessage.text}
            </div>
          )}
        </form>
      </div>

      <div className="mt-8 border-t border-care-line pt-6 text-center text-xs text-care-muted dark:border-care-night-line dark:text-care-night-muted">
        <span>New to AbsoluteCare? </span>
        <button
          type="button"
          onClick={() => onNavigate("signup")}
          className="font-bold text-care-blue-700 underline decoration-1 underline-offset-4 hover:text-care-blue-800 dark:text-care-blue-500"
        >
          Create an account
        </button>
      </div>
    </>
  );
}

export default LoginForm;
