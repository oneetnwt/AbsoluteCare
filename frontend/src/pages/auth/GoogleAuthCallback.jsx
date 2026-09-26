import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CircleAlert, LoaderCircle } from "lucide-react";
import {
  getApiErrorMessage,
  getGoogleSession,
} from "../../services/api/authApi";

function GoogleAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    getGoogleSession(token)
      .then(() => navigate("/dashboard", { replace: true }))
      .catch((requestError) => setError(getApiErrorMessage(requestError)));
  }, [navigate, token]);

  const displayError =
    error || (!token && "Google sign-in did not return a valid session.");

  return (
    <main className="auth-page">
      <section className="auth-card google-callback-card">
        {displayError ? (
          <div className="auth-success">
            <CircleAlert
              className="google-callback-error"
              size={43}
              aria-hidden="true"
            />
            <h1>Sign-in could not finish</h1>
            <p>{displayError}</p>
            <Link
              className="auth-button auth-button-primary"
              to="/auth?mode=login"
            >
              Back to log in
            </Link>
          </div>
        ) : (
          <div className="auth-success">
            <LoaderCircle
              className="google-callback-loader"
              size={42}
              aria-hidden="true"
            />
            <h1>Signing you in</h1>
            <p>We’re securely finishing your Google sign-in.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default GoogleAuthCallback;
