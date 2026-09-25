import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import axiosInstance from "../api/axiosInstance";
import { setStoredUser } from "../auth/authStorage";

const roleDetails = {
  patient: {
    label: "Patient",
    title: "Stay close to your recovery plan.",
    description:
      "Request visits, keep appointment details in one place, and follow your care journey.",
    path: "/portal/patient",
  },
  therapist: {
    label: "Therapist",
    title: "Make every treatment hour count.",
    description:
      "Shape your schedule, review patient care, and record progress in a focused workspace.",
    path: "/portal/therapist",
  },
  admin: {
    label: "Admin",
    title: "Keep the clinic moving clearly.",
    description:
      "Manage access, services, appointments, and reporting from one operations desk.",
    path: "/portal/admin",
  },
  secretary: {
    label: "Secretary",
    title: "Make the front desk feel lighter.",
    description:
      "See the clinic schedule, find appointments, and keep patient conversations organized.",
    path: "/portal/secretary",
  },
};

function PortalLogin({ role, onNavigate }) {
  const detail = roleDetails[role] || roleDetails.patient;
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
    setErrors({ ...errors, [field]: "" });
    setMessage("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 8)
      nextErrors.password = "Enter at least 8 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", form);
      if (!response.data.user) throw new Error("Missing authenticated user.");
      setStoredUser(response.data.user);
      onNavigate("/dashboard");
    } catch (error) {
      setLoading(false);
      setMessage(
        error.response?.data?.message ||
          "Unable to sign in right now. Check that the API is running and try again.",
      );
    }
  };

  return (
    <div className="min-h-svh bg-white text-care-ink dark:bg-care-night dark:text-care-night-ink">
      <header className="flex h-20 items-center justify-between border-b border-care-line px-5 dark:border-care-night-line sm:px-10">
        <button
          type="button"
          onClick={() => onNavigate("/")}
          className="flex items-center gap-3 font-display text-lg font-extrabold"
          aria-label="Return to AbsoluteCare home"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-care-green-700 text-lg text-white">
            +
          </span>
          AbsoluteCare
        </button>
        <ThemeToggle />
      </header>
      <main className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-6xl items-center gap-12 px-5 py-12 lg:grid-cols-[1fr_440px] lg:px-10">
        <section className="hidden lg:block">
          <p className="text-sm font-bold text-care-green-700 dark:text-care-green-100">
            {detail.label} access
          </p>
          <h1 className="mt-4 max-w-xl font-display text-5xl font-extrabold leading-tight tracking-tight text-care-ink dark:text-care-night-ink">
            {detail.title}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-care-muted dark:text-care-night-muted">
            {detail.description}
          </p>
          <div className="mt-10 rounded-2xl border border-care-line bg-care-canvas p-5 dark:border-care-night-line dark:bg-care-night-panel">
            <p className="text-xs font-bold text-care-muted dark:text-care-night-muted">
              Private workspace
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-care-green-100 font-bold text-care-green-800 dark:bg-care-green-900/40 dark:text-care-green-100">
                {detail.label.slice(0, 1)}
              </span>
              <p className="text-sm font-semibold text-care-ink dark:text-care-night-ink">
                Your records will appear here after connection.
              </p>
            </div>
          </div>
        </section>
        <section
          className="care-card p-6 sm:p-10"
          aria-labelledby="portal-login-title"
        >
          <p className="text-sm font-bold text-care-green-700 dark:text-care-green-100">
            {detail.label} portal
          </p>
          <h1
            id="portal-login-title"
            className="mt-2 font-display text-3xl font-extrabold tracking-tight"
          >
            Sign in
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
            Use your clinic or patient credentials to continue.
          </p>
          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            <div className="grid gap-1.5">
              <label htmlFor="portal-email" className="text-sm font-bold">
                Email address
              </label>
              <input
                id="portal-email"
                type="email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
                className="care-input"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "portal-email-error" : undefined
                }
              />
              {errors.email && (
                <p
                  id="portal-email-error"
                  className="text-xs font-semibold text-care-error"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="portal-password" className="text-sm font-bold">
                Password
              </label>
              <input
                id="portal-password"
                type="password"
                value={form.password}
                onChange={update("password")}
                autoComplete="current-password"
                className="care-input"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "portal-password-error" : undefined
                }
              />
              {errors.password && (
                <p
                  id="portal-password-error"
                  className="text-xs font-semibold text-care-error"
                >
                  {errors.password}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-care-green-700 py-3.5 text-sm font-bold text-white transition hover:bg-care-green-800 dark:bg-care-green-600 dark:hover:bg-care-green-700"
            >
              {loading ? "Signing in…" : "Continue to workspace"}
            </button>
            {message && (
              <p
                role="status"
                className="rounded-xl border border-care-green-700/20 bg-care-green-50 p-3 text-xs font-semibold text-care-green-800 dark:bg-care-green-900/30 dark:text-care-green-100"
              >
                {message}
              </p>
            )}
          </form>
          <div className="mt-6 flex items-center justify-between border-t border-care-line pt-5 text-xs dark:border-care-night-line">
            <button
              type="button"
              onClick={() => onNavigate("/forgot")}
              className="font-semibold text-care-blue-700 underline dark:text-care-blue-500"
            >
              Forgot password?
            </button>
            <button
              type="button"
              onClick={() => onNavigate("/signup")}
              className="font-semibold text-care-blue-700 underline dark:text-care-blue-500"
            >
              Create account
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PortalLogin;
