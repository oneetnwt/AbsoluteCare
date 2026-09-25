import { useState } from "react";
import AuthDivider from "./AuthDivider";
import GoogleAuthButton from "./GoogleAuthButton";

function ForgotPasswordForm({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setError("Enter a valid email address.");
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };
  return (
    <>
      <button
        className="mb-[26px] inline-flex items-center gap-[7px] border-0 bg-transparent p-0 text-[0.84rem] font-bold text-care-blue-700"
        type="button"
        onClick={() => onNavigate("login")}
      >
        <svg
          className="size-[17px] fill-none stroke-current stroke-[1.8]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        Back to log in
      </button>
      <div className="mb-7">
        <p className="mb-5 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-care-green-700">
          A fresh start is close
        </p>
        <h2
          className="mb-[9px] font-display text-2xl font-bold leading-[1.12] tracking-[-0.045em] md:text-[2rem]"
          id="auth-title"
        >
          Reset your password
        </h2>
        <p className="m-0 leading-[1.55] text-care-muted">
          Enter your email and we’ll send instructions to get you back into your
          account.
        </p>
      </div>
      {submitted ? (
        <div
          className="rounded-[10px] border border-[#b9dece] bg-care-green-100 p-[22px] text-care-green-900"
          role="status"
          aria-live="polite"
        >
          <strong className="mb-[7px] block font-display">
            Check your inbox
          </strong>
          <p className="m-0 text-[0.88rem] leading-[1.5] text-care-green-800">
            If an account exists for {email}, you’ll receive password reset
            instructions shortly.
          </p>
        </div>
      ) : (
        <div className="grid gap-[17px]">
          <GoogleAuthButton />
          <AuthDivider />
          <form className="grid gap-[17px]" onSubmit={submit} noValidate>
            <div className="grid gap-[7px]">
              <label
                className="text-[0.88rem] font-bold"
                htmlFor="forgot-email"
              >
                Email address
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                autoComplete="email"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "forgot-email-error" : undefined}
                className="min-h-[49px] w-full rounded-lg border border-care-line bg-[#fcfefd] px-3.5 py-3 text-care-ink outline-none transition focus:border-care-blue-500 focus:ring-3 focus:ring-[rgba(67,143,189,0.18)] aria-[invalid=true]:border-care-error aria-[invalid=true]:bg-care-error-bg"
              />
              {error && (
                <p
                  className="m-0 text-[0.78rem] text-care-error"
                  id="forgot-email-error"
                >
                  {error}
                </p>
              )}
            </div>
            <button
              className="min-h-[50px] rounded-lg border-0 bg-care-green-700 font-bold text-white shadow-[0_7px_15px_rgba(27,107,84,0.16)] transition hover:-translate-y-px hover:bg-care-green-800 disabled:cursor-wait disabled:opacity-65"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        </div>
      )}
      <p className="mt-[26px] text-center text-[0.88rem] text-care-muted">
        Remember your password?{" "}
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

export default ForgotPasswordForm;
