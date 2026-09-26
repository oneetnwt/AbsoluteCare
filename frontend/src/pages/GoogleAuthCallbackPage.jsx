import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { setStoredUser } from "../auth/authStorage";

function GoogleAuthCallbackPage({ onNavigate }) {
  const token = new URLSearchParams(window.location.search).get("token");
  const [error, setError] = useState(
    token ? "" : "Google sign-in did not return a valid session.",
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    axiosInstance
      .get("/auth/google/session", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setStoredUser(data.user);
        onNavigate("/dashboard");
      })
      .catch(() => {
        setError("Google sign-in could not be completed. Please try again.");
      });
  }, [onNavigate, token]);

  return (
    <div className="py-8 text-center">
      {error ? (
        <>
          <h1 id="auth-title" className="font-display text-2xl font-bold">
            Sign-in could not be completed
          </h1>
          <p className="mt-3 text-sm text-care-muted dark:text-care-night-muted">
            {error}
          </p>
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="mt-6 rounded-lg bg-care-green-700 px-5 py-3 text-sm font-bold text-white hover:bg-care-green-800 dark:bg-care-green-600"
          >
            Return to sign in
          </button>
        </>
      ) : (
        <>
          <h1 id="auth-title" className="font-display text-2xl font-bold">
            Completing Google sign-in…
          </h1>
          <p className="mt-3 text-sm text-care-muted dark:text-care-night-muted">
            Checking your AbsoluteCare account.
          </p>
        </>
      )}
    </div>
  );
}

export default GoogleAuthCallbackPage;
