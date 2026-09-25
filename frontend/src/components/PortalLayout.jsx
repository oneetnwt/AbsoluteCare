import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const roleColors = {
  patient: "bg-care-blue-700",
  therapist: "bg-care-green-700",
  admin: "bg-care-green-900",
  secretary: "bg-care-blue-700",
};

function PortalLayout({
  role,
  roleLabel,
  navItems,
  activeView,
  onSelect,
  onExit,
  children,
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const color = roleColors[role] || roleColors.patient;

  const selectView = (view) => {
    onSelect(view);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-svh bg-care-canvas text-care-ink dark:bg-care-night dark:text-care-night-ink">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-care-line bg-white dark:border-care-night-line dark:bg-care-night-panel lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-care-line px-6 dark:border-care-night-line">
          <span
            className={`grid size-9 place-items-center rounded-xl ${color} text-lg font-bold text-white`}
            aria-hidden="true"
          >
            +
          </span>
          <div>
            <p className="font-display text-sm font-extrabold text-care-ink dark:text-care-night-ink">
              AbsoluteCare
            </p>
            <p className="text-[11px] font-semibold text-care-muted dark:text-care-night-muted">
              {roleLabel} portal
            </p>
          </div>
        </div>
        <nav
          className="flex-1 space-y-1 overflow-y-auto px-4 py-6"
          aria-label={`${roleLabel} portal navigation`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectView(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                activeView === item.id
                  ? "bg-care-green-50 text-care-green-800 dark:bg-care-green-900/30 dark:text-care-green-100"
                  : "text-care-muted hover:bg-care-canvas hover:text-care-ink dark:text-care-night-muted dark:hover:bg-care-night-card dark:hover:text-care-night-ink"
              }`}
              aria-current={activeView === item.id ? "page" : undefined}
            >
              <span
                className="grid size-7 place-items-center rounded-lg bg-care-canvas text-[11px] font-extrabold text-care-muted dark:bg-care-night-card dark:text-care-night-muted"
                aria-hidden="true"
              >
                {item.shortLabel}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-care-line p-4 dark:border-care-night-line">
          <button
            type="button"
            onClick={onExit}
            className="w-full rounded-xl border border-care-line px-3 py-2.5 text-left text-sm font-semibold text-care-muted transition hover:border-care-green-700 hover:text-care-green-700 dark:border-care-night-line dark:text-care-night-muted dark:hover:border-care-green-600 dark:hover:text-care-green-100"
          >
            Return to home
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-care-line bg-white/95 px-4 backdrop-blur-md dark:border-care-night-line dark:bg-care-night/95 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="grid size-10 place-items-center rounded-xl border border-care-line text-care-ink dark:border-care-night-line dark:text-care-night-ink lg:hidden"
              aria-label="Toggle portal navigation"
              aria-expanded={mobileNavOpen}
            >
              <span aria-hidden="true">{mobileNavOpen ? "×" : "☰"}</span>
            </button>
            <div>
              <p className="text-xs font-semibold text-care-muted dark:text-care-night-muted">
                AbsoluteCare
              </p>
              <h1 className="font-display text-lg font-extrabold text-care-ink dark:text-care-night-ink">
                {roleLabel} workspace
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden rounded-full bg-care-blue-50 px-3 py-1.5 text-xs font-bold text-care-blue-700 dark:bg-care-blue-900/30 dark:text-care-blue-100 sm:inline-flex">
              Data connection pending
            </span>
            <ThemeToggle />
          </div>
        </header>

        {mobileNavOpen && (
          <div className="border-b border-care-line bg-white px-4 py-4 dark:border-care-night-line dark:bg-care-night-panel lg:hidden">
            <nav className="grid gap-1" aria-label="Mobile portal navigation">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectView(item.id)}
                  className={`rounded-xl px-3 py-3 text-left text-sm font-semibold ${activeView === item.id ? "bg-care-green-50 text-care-green-800 dark:bg-care-green-900/30 dark:text-care-green-100" : "text-care-muted dark:text-care-night-muted"}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

export default PortalLayout;
