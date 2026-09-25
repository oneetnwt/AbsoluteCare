import { useState } from "react";
import AuthDivider from "./AuthDivider";
import GoogleAuthButton from "./GoogleAuthButton";
import PasswordField from "./PasswordField";

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
  const [status, setStatus] = useState("");
  const update = (field) => (event) => {
    setForm({
      ...form,
      [field]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
    setErrors({ ...errors, [field]: "" });
    setStatus("");
  };
  const submit = (event) => {
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
    if (!form.terms) nextErrors.terms = "Accept the terms to continue.";
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStatus("Your demo account is ready. Welcome to AbsoluteCare.");
    }, 700);
  };
  return (
    <>
      <div className="mb-7">
        <p className="mb-5 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-care-green-700">
          Start your recovery journey
        </p>
        <h2
          className="mb-[9px] font-display text-2xl font-bold leading-[1.12] tracking-[-0.045em] md:text-[2rem]"
          id="auth-title"
        >
          Create your account
        </h2>
        <p className="m-0 leading-[1.55] text-care-muted">
          Set up your secure space for appointments and progress.
        </p>
      </div>
      <div className="grid gap-[17px]">
        <form className="grid gap-[17px]" onSubmit={submit} noValidate>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-[7px]">
              <label
                className="text-[0.88rem] font-bold"
                htmlFor="signup-first-name"
              >
                First name
              </label>
              <input
                id="signup-first-name"
                value={form.firstName}
                onChange={update("firstName")}
                autoComplete="given-name"
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={
                  errors.firstName ? "signup-first-name-error" : undefined
                }
                className="w-full rounded-lg border border-care-line bg-[#fcfefd] px-3 py-2 text-care-ink outline-none transition focus:border-care-blue-500 focus:ring-3 focus:ring-[rgba(67,143,189,0.18)] aria-[invalid=true]:border-care-error aria-[invalid=true]:bg-care-error-bg"
              />
              {errors.firstName && (
                <p
                  className="m-0 text-[0.78rem] text-care-error"
                  id="signup-first-name-error"
                >
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="grid gap-[7px]">
              <label
                className="text-[0.88rem] font-bold"
                htmlFor="signup-last-name"
              >
                Last name
              </label>
              <input
                id="signup-last-name"
                value={form.lastName}
                onChange={update("lastName")}
                autoComplete="family-name"
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={
                  errors.lastName ? "signup-last-name-error" : undefined
                }
                className="w-full rounded-lg border border-care-line bg-[#fcfefd] px-3 py-2 text-care-ink outline-none transition focus:border-care-blue-500 focus:ring-3 focus:ring-[rgba(67,143,189,0.18)] aria-[invalid=true]:border-care-error aria-[invalid=true]:bg-care-error-bg"
              />
              {errors.lastName && (
                <p
                  className="m-0 text-[0.78rem] text-care-error"
                  id="signup-last-name-error"
                >
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-[7px]">
            <label className="text-[0.88rem] font-bold" htmlFor="signup-email">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              className="w-full rounded-lg border border-care-line bg-[#fcfefd] px-3 py-2 text-care-ink outline-none transition focus:border-care-blue-500 focus:ring-3 focus:ring-[rgba(67,143,189,0.18)] aria-[invalid=true]:border-care-error aria-[invalid=true]:bg-care-error-bg"
            />
            {errors.email && (
              <p
                className="m-0 text-[0.78rem] text-care-error"
                id="signup-email-error"
              >
                {errors.email}
              </p>
            )}
          </div>
          <PasswordField
            id="signup-password"
            label="Password"
            value={form.password}
            onChange={update("password")}
            error={errors.password}
            autoComplete="new-password"
          />
          <PasswordField
            id="signup-confirm"
            label="Confirm password"
            value={form.confirm}
            onChange={update("confirm")}
            error={errors.confirm}
            autoComplete="new-password"
          />
          <label className="flex items-start gap-2 text-[0.84rem] leading-[1.45] text-care-muted">
            <input
              type="checkbox"
              className="mt-0.5 size-4 shrink-0 accent-care-green-700"
              checked={form.terms}
              onChange={update("terms")}
              aria-invalid={Boolean(errors.terms)}
            />{" "}
            <span>
              I agree to the{" "}
              <button
                className="border-0 bg-transparent p-0 font-bold text-care-green-700 underline decoration-1 underline-offset-4"
                type="button"
              >
                terms of service
              </button>{" "}
              and privacy policy.
            </span>
          </label>
          {errors.terms && (
            <p className="m-0 text-[0.78rem] text-care-error">{errors.terms}</p>
          )}
          <button
            className="p-3 rounded-lg border-0 bg-care-green-700 font-bold text-white transition hover:bg-care-green-800 disabled:cursor-wait disabled:opacity-65"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
          {status ?? (
            <p
              className="min-h-[1.2em] text-[0.84rem] text-care-green-800"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          )}
        </form>
        <AuthDivider />
        <GoogleAuthButton />
      </div>
      <p className="mt-[26px] text-center text-[0.88rem] text-care-muted">
        Already have an account?{" "}
        <button
          className="border-0 bg-transparent p-0 font-bold text-care-green-700 underline decoration-1 underline-offset-4"
          type="button"
          onClick={() => onNavigate("login")}
        >
          Log in
        </button>
      </p>
    </>
  );
}

export default SignupForm;
