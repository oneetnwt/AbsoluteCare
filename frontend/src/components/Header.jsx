import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, Plus, ShieldCheck, X } from "lucide-react";

function Header({ onNavigate, onOpenHipaa }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    if (typeof target === "string" && target.startsWith("#")) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      onNavigate(target);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-care-line/70 bg-white/95 backdrop-blur-md dark:border-care-night-line/80 dark:bg-care-night/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 border-0 bg-transparent p-0 text-left font-display text-xl font-extrabold tracking-tight text-care-ink dark:text-care-night-ink"
        >
          <span className="grid size-9 place-items-center rounded-lg bg-care-green-700 text-white shadow-md shadow-care-green-700/20 dark:bg-care-green-600">
            <Plus className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <span className="leading-none">AbsoluteCare</span>
            <span className="text-[0.65rem] font-semibold text-care-muted dark:text-care-night-muted">
              Physical therapy scheduling
            </span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden items-center gap-7 text-sm font-medium text-care-muted dark:text-care-night-muted md:flex"
          aria-label="Main navigation"
        >
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#features");
            }}
            className="transition-colors hover:text-care-green-700 dark:hover:text-care-green-100"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#how-it-works");
            }}
            className="transition-colors hover:text-care-green-700 dark:hover:text-care-green-100"
          >
            How it Works
          </a>
          <button
            type="button"
            onClick={onOpenHipaa}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-care-green-700 hover:underline dark:text-care-green-100"
          >
            <ShieldCheck className="size-4" aria-hidden="true" />
            HIPAA Info
          </button>
        </nav>

        {/* Desktop Controls */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-care-green-700 transition hover:bg-care-green-100/60 dark:text-care-green-100 dark:hover:bg-care-night-panel"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => onNavigate("signup")}
            className="rounded-lg border-0 bg-care-green-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-care-green-700/20 transition hover:bg-care-green-800 active:scale-95 dark:bg-care-green-600 dark:hover:bg-care-green-700"
          >
            Create account
          </button>
        </div>

        {/* Mobile Toggle & Theme Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid size-10 place-items-center rounded-lg border border-care-line bg-white text-care-ink dark:border-care-night-line dark:bg-care-night-panel dark:text-care-night-ink"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-care-line bg-white px-6 py-5 shadow-lg dark:border-care-night-line dark:bg-care-night-panel md:hidden">
          <nav className="flex flex-col gap-4 text-base font-semibold text-care-ink dark:text-care-night-ink">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#features");
              }}
              className="py-1 transition-colors hover:text-care-green-700 dark:hover:text-care-green-100"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#how-it-works");
              }}
              className="py-1 transition-colors hover:text-care-green-700 dark:hover:text-care-green-100"
            >
              How it Works
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHipaa();
              }}
              className="flex items-center gap-2 py-1 text-left text-sm font-semibold text-care-green-700 dark:text-care-green-100"
            >
              <ShieldCheck className="size-4" aria-hidden="true" />
              HIPAA & Security Assurance
            </button>
            <div className="mt-3 grid gap-2 pt-3 border-t border-care-line dark:border-care-night-line">
              <button
                type="button"
                onClick={() => handleNavClick("login")}
                className="w-full rounded-lg border border-care-line py-2.5 text-center font-bold text-care-green-700 dark:border-care-night-line dark:text-care-green-100"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("signup")}
                className="w-full rounded-lg bg-care-green-700 py-2.5 text-center font-bold text-white shadow-md"
              >
                Create account
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
