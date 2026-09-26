import { useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  Eye,
  EyeOff,
  HeartPulse,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import RecaptchaField from "../../components/auth/RecaptchaField";
import { getApiErrorMessage } from "../../services/api/authApi";
import {
  authenticateStaff,
  getStaffDashboardPath,
} from "../../services/api/staffAuthApi";

function StaffAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isForgotMode = searchParams.get("mode") === "forgot";
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const recaptchaRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!recaptchaToken) {
      setError("recaptcha");
      return;
    }

    setLoading(true);
    const formData = new FormData(event.currentTarget);

    if (isForgotMode) {
      window.setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 650);
      return;
    }

    try {
      const response = await authenticateStaff({
        email: formData.get("email"),
        password: formData.get("password"),
        captchaToken: recaptchaToken,
      });
      const dashboardPath = getStaffDashboardPath(response.data.user?.role);

      if (!dashboardPath) {
        throw new Error("This account does not have staff portal access.");
      }

      navigate(dashboardPath);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } finally {
      setLoading(false);
    }
  }

  function resetRecaptcha(errorCode) {
    setRecaptchaToken(null);
    setError(errorCode);
  }

  if (submitted && isForgotMode) {
    return (
      <StaffAuthShell>
        <div className="staff-success">
          <CheckCircle2 className="staff-success-icon" aria-hidden="true" />
          <h1>Check your inbox</h1>
          <p>
            If this email is linked to a staff account, a reset link has been
            sent.
          </p>
          <Link className="staff-primary-button" to="/staff/login">
            Back to staff login <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </StaffAuthShell>
    );
  }

  return (
    <StaffAuthShell>
      <div className="staff-heading">
        <span className="staff-heading-icon">
          <ShieldCheck size={19} aria-hidden="true" />
        </span>
        <p className="staff-eyebrow">AbsoluteCare staff portal</p>
        <h1>{isForgotMode ? "Reset your password" : "Employee login"}</h1>
        <p>
          {isForgotMode
            ? "Enter your registered work email and we'll send you a link to reset your password."
            : "Sign in to manage the clinic's schedule and patient care."}
        </p>
      </div>
      {error && error !== "recaptcha" && error !== "recaptcha-expired" && (
        <div className="staff-alert" role="alert" aria-live="polite">
          <CircleAlert size={16} aria-hidden="true" />
          {error === "Invalid email or password."
            ? "Invalid credentials"
            : error}
        </div>
      )}
      <form className="staff-form" onSubmit={handleSubmit}>
        <label>
          Work email
          <input
            name="email"
            type="email"
            autoComplete="username"
            placeholder="name@absolutecare.com"
            required
          />
        </label>
        {!isForgotMode && (
          <label>
            Password
            <div className="staff-password-wrap">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
              />
              <button
                className="staff-password-toggle"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={17} aria-hidden="true" />
                ) : (
                  <Eye size={17} aria-hidden="true" />
                )}
              </button>
            </div>
            <Link className="staff-forgot-link" to="/staff/forgot-password">
              Forgot password?
            </Link>
          </label>
        )}
        <RecaptchaField
          error={error}
          onChange={(token) => {
            setRecaptchaToken(token);
            setError("");
          }}
          onExpired={() => resetRecaptcha("recaptcha-expired")}
          onErrored={() => resetRecaptcha("recaptcha")}
          recaptchaRef={recaptchaRef}
        />
        <button
          className="staff-primary-button"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle
                className="staff-spinner"
                size={16}
                aria-hidden="true"
              />{" "}
              Sending…
            </>
          ) : isForgotMode ? (
            "Send reset link"
          ) : (
            "Log in"
          )}
        </button>
      </form>
      <div className="staff-security-note">
        <ShieldCheck size={15} aria-hidden="true" />
        <span>
          Staff access is protected and monitored for clinic security.
        </span>
      </div>
      <p className="staff-switch">
        <Link to={isForgotMode ? "/staff/login" : "/staff/forgot-password"}>
          {isForgotMode ? (
            <>
              <ArrowLeft size={13} aria-hidden="true" /> Back to staff login
            </>
          ) : (
            "Forgot your password?"
          )}
        </Link>
      </p>
    </StaffAuthShell>
  );
}

function StaffAuthShell({ children }) {
  return (
    <main className="staff-auth-page">
      <header className="staff-auth-header">
        <Link className="staff-brand" to="/">
          <span className="staff-brand-mark" aria-hidden="true">
            <HeartPulse size={19} strokeWidth={2.2} />
          </span>
          <span>
            AbsoluteCare <small>Therapy Center</small>
          </span>
        </Link>
        <span className="staff-portal-label">Internal access</span>
      </header>
      <section className="staff-auth-card">{children}</section>
      <p className="staff-footer">
        Staff accounts are provisioned by the clinic administrator. Contact your
        administrator if you need access.
      </p>
    </main>
  );
}

export default StaffAuth;
