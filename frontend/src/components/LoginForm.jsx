import { useState } from "react";
import AuthDivider from "./AuthDivider";
import GoogleAuthButton from "./GoogleAuthButton";
import PasswordField from "./PasswordField";

function LoginForm({ onNavigate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
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
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      nextErrors.email = "Enter a valid email address.";
    if (!form.password) nextErrors.password = "Enter your password.";
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStatus(
        "Welcome back. This demo sign-in is ready for API integration.",
      );
    }, 700);
  };

  return (
    <>
      <div className="mb-7">
        <p className="mb-5 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-care-green-700">
          Your care, connected
        </p>
        <h2
          className="mb-[9px] font-display text-2xl font-bold leading-[1.12] tracking-[-0.045em] md:text-[2rem]"
          id="auth-title"
        >
          Welcome back
        </h2>
        <p className="m-0 leading-[1.55] text-care-muted">
          Log in to manage your appointments and recovery plan.
        </p>
      </div>
      <div className="grid gap-4.25">
        <form className="grid gap-4.25" onSubmit={submit} noValidate>
          <div className="grid gap-[7px]">
            <label className="text-[0.88rem] font-bold" htmlFor="login-email">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              className="min-h-[49px] w-full rounded-lg border border-care-line bg-[#fcfefd] px-3.5 py-3 text-care-ink outline-none transition focus:border-care-blue-500 focus:ring-3 focus:ring-[rgba(67,143,189,0.18)] aria-[invalid=true]:border-care-error aria-[invalid=true]:bg-care-error-bg"
            />
            {errors.email && (
              <p
                className="m-0 text-[0.78rem] text-care-error"
                id="login-email-error"
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
          <div className="-my-0.5 flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-[0.84rem] text-care-muted">
              <input
                className="size-4 accent-care-green-700"
                type="checkbox"
                checked={form.remember}
                onChange={update("remember")}
              />{" "}
              Remember me
            </label>
            <button
              className="border-0 bg-transparent p-0 font-bold text-care-green-700 underline decoration-1 underline-offset-4"
              type="button"
              onClick={() => onNavigate("forgot")}
            >
              Forgot password?
            </button>
          </div>
          <button
            className="min-h-[50px] rounded-lg border-0 bg-care-green-700 font-bold text-white transition hover:bg-care-green-800 disabled:cursor-wait disabled:opacity-65"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in…" : "Log in"}
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
        New to AbsoluteCare?{" "}
        <button
          className="border-0 bg-transparent p-0 font-bold text-care-green-700 underline decoration-1 underline-offset-4"
          type="button"
          onClick={() => onNavigate("signup")}
        >
          Create an account
        </button>
      </p>
    </>
  );
}

export default LoginForm;
