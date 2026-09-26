import { useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  authenticate,
  getApiErrorMessage,
  getGoogleAuthUrl,
} from "../../services/api/authApi";
import RecaptchaField from "../../components/auth/RecaptchaField";
import { authModes, getAuthMode } from "../../config/authConfig";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  Dot,
  Eye,
  EyeOff,
  HeartPulse,
  LoaderCircle,
} from "lucide-react";

function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentMode = getAuthMode(window.location.pathname, searchParams);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const recaptchaRef = useRef(null);

  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /\d/.test(password),
  ].filter(Boolean).length;
  const passwordMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (currentMode === "forgot") {
      setLoading(true);
      window.setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 650);
      return;
    }
    if (!recaptchaToken) {
      setError("recaptcha");
      return;
    }
    if (currentMode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
      captchaToken: recaptchaToken,
    };
    if (currentMode === "signup") {
      payload.firstname = formData.get("firstName");
      payload.lastname = formData.get("lastName");
      payload.confirmpassword = formData.get("confirmPassword");
    }
    try {
      await authenticate(currentMode, payload);
      if (currentMode === "login") {
        navigate("/dashboard");
        return;
      }
      setSubmitted(true);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } finally {
      setLoading(false);
    }
  }

  function switchMode(nextMode) {
    setSubmitted(false);
    setError("");
    navigate(`/auth?mode=${nextMode}`);
  }

  if (submitted && currentMode === "forgot") {
    return (
      <AuthShell>
        <div className="auth-success">
          <CheckCircle2 className="success-check" aria-hidden="true" />
          <h1>Check your inbox</h1>
          <p>
            If an account exists with this email, a reset link has been sent.
          </p>
          <Link
            className="auth-button auth-button-primary"
            to="/auth?mode=login"
          >
            Back to log in <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </AuthShell>
    );
  }

  if (submitted && currentMode === "signup") {
    return (
      <AuthShell>
        <div className="auth-success">
          <CheckCircle2 className="success-check" aria-hidden="true" />
          <h1>Account created</h1>
          <p>Your AbsoluteCare account is ready. Log in to continue.</p>
          <Link
            className="auth-button auth-button-primary"
            to="/auth?mode=login"
          >
            Log in <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="auth-heading">
        <p className="auth-eyebrow">AbsoluteCare patient portal</p>
        <h1>{authModes[currentMode].title}</h1>
        <p>{authModes[currentMode].description}</p>
      </div>
      {error && error !== "recaptcha" && (
        <div className="auth-alert" role="alert" aria-live="polite">
          <CircleAlert size={16} aria-hidden="true" />
          {currentMode === "login" ? "Invalid email or password" : error}
        </div>
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        {currentMode === "signup" && (
          <div className="auth-form-row">
            <label>
              First name
              <input
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
              />
            </label>
            <label>
              Last name
              <input
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
              />
            </label>
          </div>
        )}
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        {currentMode !== "forgot" && (
          <label>
            Password
            <div className="password-wrap">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={
                  currentMode === "login" ? "current-password" : "new-password"
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                className="password-toggle"
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
            {currentMode === "login" && (
              <Link className="forgot-link" to="/auth?mode=forgot">
                Forgot password?
              </Link>
            )}
            {currentMode === "signup" && (
              <span className="strength" data-strength={strength}>
                <span>Password strength</span>
                <i />
                <i />
                <i />
                <b>
                  {strength === 3
                    ? "Good"
                    : strength === 2
                      ? "Almost there"
                      : "Use 8+ characters"}
                </b>
              </span>
            )}
          </label>
        )}
        {currentMode === "signup" && (
          <label>
            Confirm password
            <div className="password-wrap">
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <span
                className={`match-indicator ${passwordMatch ? "is-match" : ""}`}
              >
                {confirmPassword
                  ? passwordMatch
                    ? "Passwords match"
                    : "Passwords do not match"
                  : ""}
              </span>
            </div>
          </label>
        )}
        {currentMode !== "forgot" && (
          <RecaptchaField
            error={error}
            onChange={(token) => {
              setRecaptchaToken(token);
              setError("");
            }}
            onExpired={() => {
              setRecaptchaToken(null);
              setError("recaptcha-expired");
            }}
            onErrored={() => {
              setRecaptchaToken(null);
              setError("recaptcha");
            }}
            recaptchaRef={recaptchaRef}
          />
        )}
        <button
          className="auth-button auth-button-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle
                className="button-spinner"
                size={16}
                aria-hidden="true"
              />{" "}
              Sending…
            </>
          ) : (
            authModes[currentMode].submit
          )}
        </button>
      </form>
      {currentMode !== "forgot" && (
        <>
          <div className="auth-divider">
            <span>or</span>
          </div>
          <a className="auth-button google-button" href={getGoogleAuthUrl()}>
            <FcGoogle size={19} aria-hidden="true" />
            Continue with Google
          </a>
        </>
      )}
      <p className="auth-switch">
        {currentMode === "login" ? (
          <>
            Don't have an account?{" "}
            <button type="button" onClick={() => switchMode("signup")}>
              Sign up
            </button>
          </>
        ) : currentMode === "signup" ? (
          <>
            Already have an account?{" "}
            <button type="button" onClick={() => switchMode("login")}>
              Log in
            </button>
          </>
        ) : (
          <>
            Remembered your password?{" "}
            <button type="button" onClick={() => switchMode("login")}>
              Back to log in
            </button>
          </>
        )}
      </p>
    </AuthShell>
  );
}

function AuthShell({ children }) {
  return (
    <main className="auth-page">
      <header className="auth-brand">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            <HeartPulse size={19} strokeWidth={2.2} />
          </span>
          <span>
            AbsoluteCare <small>Therapy Center</small>
          </span>
        </Link>
        <span className="auth-location">Malaybalay City, Bukidnon</span>
      </header>
      <section className="auth-card">{children}</section>
      <p className="auth-footer">
        Your care, held with attention. <Dot size={16} aria-hidden="true" />{" "}
        <Link to="/">Back to AbsoluteCare</Link>
      </p>
    </main>
  );
}

export default Auth;
