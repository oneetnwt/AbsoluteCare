import ThemeToggle from "./ThemeToggle";

function Footer({ onNavigate, onOpenHipaa }) {
  return (
    <footer className="border-t border-care-line bg-care-canvas py-12 text-care-muted dark:border-care-night-line dark:bg-care-night dark:text-care-night-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info Column */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 border-0 bg-transparent p-0 text-left font-display text-xl font-extrabold text-care-ink dark:text-care-night-ink"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-care-green-700 text-lg text-white font-bold dark:bg-care-green-600">
                +
              </span>
              AbsoluteCare
            </button>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Scheduling that keeps physical therapists focused on progress and
              patients focused on recovery.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-care-green-700 dark:text-care-green-100">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>HIPAA BAA Compliant Platform</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-care-ink dark:text-care-night-ink">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="#features"
                  className="transition hover:text-care-green-700 dark:hover:text-care-green-100"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="transition hover:text-care-green-700 dark:hover:text-care-green-100"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Links */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-care-ink dark:text-care-night-ink">
              Privacy & Trust
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenHipaa}
                  className="text-left transition hover:text-care-green-700 dark:hover:text-care-green-100"
                >
                  HIPAA Safeguards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenHipaa}
                  className="text-left transition hover:text-care-green-700 dark:hover:text-care-green-100"
                >
                  BAA Agreement Terms
                </button>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="transition hover:text-care-green-700 dark:hover:text-care-green-100"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* User Access Links */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-care-ink dark:text-care-night-ink">
              Portals
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("login")}
                  className="text-left font-semibold text-care-green-700 hover:underline dark:text-care-green-100"
                >
                  Sign in
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("login")}
                  className="text-left transition hover:text-care-green-700 dark:hover:text-care-green-100"
                >
                  Sign in to scheduling
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("signup")}
                  className="text-left font-bold text-care-green-700 dark:text-care-green-100 hover:underline"
                >
                  Create account
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-care-line pt-6 text-xs dark:border-care-night-line sm:flex-row">
          <p>© {new Date().getFullYear()} AbsoluteCare. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              onClick={onOpenHipaa}
              className="text-care-green-700 underline dark:text-care-green-100"
            >
              HIPAA Verification Badge
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
