import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import HipaaModal from "./HipaaModal";

function AuthLayout({ onNavigate, children }) {
  const [isHipaaOpen, setIsHipaaOpen] = useState(false);

  return (
    <div className="care-grid-paper flex min-h-svh flex-col justify-between bg-care-canvas text-care-ink transition-colors duration-200 dark:bg-care-night dark:text-care-night-ink">
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-care-line/70 bg-care-canvas/95 backdrop-blur-md dark:border-care-night-line/80 dark:bg-care-night-panel/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="group flex items-center gap-3 border-0 bg-transparent p-0 text-left font-display text-lg font-extrabold tracking-tight text-care-ink dark:text-care-night-ink"
            aria-label="Return to AbsoluteCare homepage"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-care-green-700 text-lg font-bold text-white shadow-sm shadow-care-green-700/20 transition group-hover:bg-care-green-800 dark:bg-care-green-600">
              <svg
                className="size-5 fill-none stroke-current stroke-[2.5]"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <div className="flex flex-col">
              <span className="leading-tight font-extrabold text-care-ink dark:text-care-night-ink">
                AbsoluteCare
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-care-muted dark:text-care-night-muted">
                Appointment Scheduling
              </span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsHipaaOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-care-blue-700/20 bg-care-blue-50/70 px-3 py-1 text-xs font-semibold text-care-blue-700 transition hover:bg-care-blue-100/60 dark:border-care-blue-500/30 dark:bg-care-blue-900/30 dark:text-care-blue-100"
            >
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>HIPAA Compliant</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Centered Form Container */}
      <main
        className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:grid lg:grid-cols-[0.9fr_1fr] lg:gap-20 lg:px-10"
        aria-labelledby="auth-title"
      >
        <section
          className="hidden lg:block"
          aria-label="AbsoluteCare scheduling overview"
        >
          <div className="care-reveal max-w-md">
            <div className="mb-8 flex items-center gap-3 text-sm font-semibold text-care-green-700 dark:text-care-green-100">
              <span className="grid size-10 place-items-center rounded-xl bg-care-green-700 text-xl font-bold text-white shadow-lg shadow-care-green-700/20 dark:bg-care-green-600">
                +
              </span>
              <span>Keep every appointment on track</span>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-care-ink dark:text-care-night-ink xl:text-5xl">
              Scheduling that keeps every visit on track.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-care-muted dark:text-care-night-muted">
              AbsoluteCare keeps appointments, patient details, and visit
              reminders clear from booking through follow-up.
            </p>
            <div className="care-grid-paper mt-10 rounded-2xl border border-care-line bg-white/80 p-5 shadow-sm dark:border-care-night-line dark:bg-care-night-panel/80">
              <div className="flex items-center justify-between border-b border-care-line pb-4 text-xs font-semibold text-care-muted dark:border-care-night-line dark:text-care-night-muted">
                <span>Thursday, October 12</span>
                <span className="text-care-green-700 dark:text-care-green-100">
                  4 visits
                </span>
              </div>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-care-green-700/20 bg-care-green-50 p-3 dark:border-care-green-600/30 dark:bg-care-green-900/30">
                  <p className="text-xs font-bold text-care-green-800 dark:text-care-green-100">
                    3:30 PM · Knee rehabilitation
                  </p>
                  <p className="mt-1 text-xs text-care-muted dark:text-care-night-muted">
                    Alex Rivera · Confirmed
                  </p>
                </div>
                <div className="rounded-xl border border-care-line bg-care-canvas p-3 dark:border-care-night-line dark:bg-care-night-card">
                  <p className="text-xs font-bold text-care-ink dark:text-care-night-ink">
                    5:00 PM · Initial evaluation
                  </p>
                  <p className="mt-1 text-xs text-care-muted dark:text-care-night-muted">
                    New patient intake ready
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="care-card care-reveal w-full max-w-lg p-6 shadow-xl sm:p-10">
          {children}
        </div>
      </main>

      {/* Subdued Footer */}
      <footer className="w-full border-t border-care-line/60 py-4 text-center text-xs text-care-muted dark:border-care-night-line/60 dark:text-care-night-muted">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 sm:flex-row">
          <p>© {new Date().getFullYear()} AbsoluteCare. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsHipaaOpen(true)}
              className="text-care-blue-700 underline decoration-1 underline-offset-2 hover:text-care-blue-800 dark:text-care-blue-500"
            >
              HIPAA Safeguard Agreement
            </button>
            <span>•</span>
            <span>AES-256 Encrypted</span>
          </div>
        </div>
      </footer>

      <HipaaModal isOpen={isHipaaOpen} onClose={() => setIsHipaaOpen(false)} />
    </div>
  );
}

export default AuthLayout;
