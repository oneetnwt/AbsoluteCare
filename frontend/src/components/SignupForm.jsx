import { useState } from "react";
import PasswordField from "./PasswordField";
import AuthDivider from "./AuthDivider";
import GoogleAuthButton from "./GoogleAuthButton";
import axiosInstance from "../api/axiosInstance";
import HipaaModal from "./HipaaModal";
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function SignupForm({ onNavigate }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    text: "",
    isError: false,
  });
  const [isHipaaModalOpen, setIsHipaaModalOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

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

    if (!form.firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!form.lastName.trim()) nextErrors.lastName = "Enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 8)
      nextErrors.password = "Use at least 8 characters.";
    if (form.confirm !== form.password)
      nextErrors.confirm = "Passwords do not match.";
    if (!form.terms)
      nextErrors.terms = "Please accept the terms and HIPAA safeguard policy.";
    if (!captchaToken) nextErrors.captcha = "Complete the reCAPTCHA check.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setStatusMessage({ text: "", isError: false });

    try {
      const response = await axiosInstance.post("/auth/signup", {
        firstname: form.firstName,
        lastname: form.lastName,
        email: form.email,
        password: form.password,
        confirmpassword: form.confirm,
        captchaToken,
      });

      setLoading(false);
      setStatusMessage({
        text:
          response.data.message ||
          "Account created successfully! Welcome to AbsoluteCare.",
        isError: false,
      });
      onNavigate("/login");
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setStatusMessage({ text: err.response.data.message, isError: true });
      } else {
        setStatusMessage({
          text: `Welcome, ${form.firstName}! Your AbsoluteCare account has been registered.`,
          isError: false,
        });
      }
    }
  };

  return (
    <>
      <div className="mb-5">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-care-blue-700/20 bg-care-blue-50/70 px-2.5 py-0.5 text-xs font-semibold text-care-blue-700 dark:border-care-blue-500/30 dark:bg-care-blue-900/30 dark:text-care-blue-100">
          <span className="size-1.5 rounded-full bg-care-blue-500" />
          Create your scheduling account
        </div>
        <h1
          id="auth-title"
          className="font-display text-2xl font-bold tracking-tight text-care-ink dark:text-care-night-ink sm:text-3xl"
        >
          Start scheduling with AbsoluteCare
        </h1>
        <p className="mt-1.5 text-sm text-care-muted dark:text-care-night-muted">
          Set up appointments, reminders, and patient details in minutes.
        </p>
      </div>

      <div className="space-y-4">
        <GoogleAuthButton label="Continue with Google" />
        <AuthDivider />

        <form onSubmit={submit} noValidate className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label
                htmlFor="signup-first-name"
                className="text-xs font-bold text-care-ink dark:text-care-night-ink"
              >
                First name
              </label>
              <input
                id="signup-first-name"
                type="text"
                value={form.firstName}
                onChange={update("firstName")}
                autoComplete="given-name"
                placeholder="Sarah"
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={
                  errors.firstName ? "signup-first-name-error" : undefined
                }
                className="care-input"
              />
              {errors.firstName && (
                <p
                  id="signup-first-name-error"
                  className="m-0 text-xs font-semibold text-care-error"
                >
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <label
                htmlFor="signup-last-name"
                className="text-xs font-bold text-care-ink dark:text-care-night-ink"
              >
                Last name
              </label>
              <input
                id="signup-last-name"
                type="text"
                value={form.lastName}
                onChange={update("lastName")}
                autoComplete="family-name"
                placeholder="Miller"
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={
                  errors.lastName ? "signup-last-name-error" : undefined
                }
                className="care-input"
              />
              {errors.lastName && (
                <p
                  id="signup-last-name-error"
                  className="m-0 text-xs font-semibold text-care-error"
                >
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <label
              htmlFor="signup-email"
              className="text-xs font-bold text-care-ink dark:text-care-night-ink"
            >
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
              placeholder="sarah@apexphysicaltherapy.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              className="care-input"
            />
            {errors.email && (
              <p
                id="signup-email-error"
                className="m-0 text-xs font-semibold text-care-error"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password & Confirm */}
          <PasswordField
            id="signup-password"
            label="Create password"
            value={form.password}
            onChange={update("password")}
            error={errors.password}
            autoComplete="new-password"
            showStrength={true}
          />

          <PasswordField
            id="signup-confirm"
            label="Confirm password"
            value={form.confirm}
            onChange={update("confirm")}
            error={errors.confirm}
            autoComplete="new-password"
          />

          {recaptchaSiteKey ? (
            <div>
              <ReCAPTCHA
                sitekey={recaptchaSiteKey}
                onChange={(token) => {
                  setCaptchaToken(token || "");
                  setErrors({ ...errors, captcha: "" });
                }}
                onExpired={() => setCaptchaToken("")}
              />
              {errors.captcha && (
                <p className="mt-2 text-xs font-semibold text-care-error">
                  {errors.captcha}
                </p>
              )}
            </div>
          ) : (
            <p role="alert" className="text-xs font-semibold text-care-error">
              reCAPTCHA is not configured. Contact the administrator.
            </p>
          )}

          {/* Terms & HIPAA Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 text-xs text-care-muted dark:text-care-night-muted cursor-pointer">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={update("terms")}
                aria-invalid={Boolean(errors.terms)}
                className="mt-0.5 size-4 shrink-0 rounded accent-care-green-700"
              />
              <span className="leading-snug">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setIsHipaaModalOpen(true)}
                  className="font-semibold text-care-blue-700 underline dark:text-care-blue-500 hover:text-care-blue-800"
                >
                  Terms of Service
                </button>
                ,{" "}
                <button
                  type="button"
                  onClick={() => setIsHipaaModalOpen(true)}
                  className="font-semibold text-care-blue-700 underline dark:text-care-blue-500 hover:text-care-blue-800"
                >
                  Privacy Policy
                </button>
                , and{" "}
                <button
                  type="button"
                  onClick={() => setIsHipaaModalOpen(true)}
                  className="font-semibold text-care-blue-700 underline dark:text-care-blue-500 hover:text-care-blue-800"
                >
                  HIPAA Safeguards
                </button>
                .
              </span>
            </label>
            {errors.terms && (
              <p className="mt-1 text-xs font-semibold text-care-error">
                {errors.terms}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg border-0 bg-care-green-700 py-3 text-sm font-bold text-white shadow-sm shadow-care-green-700/25 transition-[background-color,box-shadow,opacity,transform] hover:bg-care-green-800 active:scale-[0.99] disabled:opacity-60 dark:bg-care-green-600 dark:hover:bg-care-green-700"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          {/* Status Message */}
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

      <div className="mt-6 border-t border-care-line pt-5 text-center text-xs text-care-muted dark:border-care-night-line dark:text-care-night-muted">
        <span>Already have an account? </span>
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="font-bold text-care-blue-700 underline decoration-1 underline-offset-4 hover:text-care-blue-800 dark:text-care-blue-500"
        >
          Sign in
        </button>
      </div>

      <HipaaModal
        isOpen={isHipaaModalOpen}
        onClose={() => setIsHipaaModalOpen(false)}
      />
    </>
  );
}

export default SignupForm;
