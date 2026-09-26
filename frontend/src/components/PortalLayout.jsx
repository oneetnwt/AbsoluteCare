import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import {
  BarChart3,
  Bell,
  CalendarDays,
  CalendarRange,
  ClipboardList,
  FileClock,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Plus,
  Settings2,
  UserRound,
  UsersRound,
  X,
  CircleCheck,
} from "lucide-react";

const roleColors = {
  patient: "bg-care-blue-700",
  therapist: "bg-care-green-700",
  admin: "bg-care-green-900",
  secretary: "bg-care-blue-700",
};

const navIcons = {
  overview: LayoutDashboard,
  appointments: CalendarDays,
  sessions: FileClock,
  notifications: Bell,
  profile: UserRound,
  calendar: CalendarRange,
  schedule: Settings2,
  patients: UsersRound,
  users: UsersRound,
  therapists: UserRound,
  services: ClipboardList,
  reports: BarChart3,
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
  const activeLabel =
    navItems.find((item) => item.id === activeView)?.label || "Dashboard";

  const selectView = (view) => {
    onSelect(view);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-svh bg-care-canvas text-care-ink dark:bg-care-night dark:text-care-night-ink">
      <a
        href="#dashboard-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-care-green-900 focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to dashboard content
      </a>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-care-line bg-white shadow-[8px_0_30px_-28px_rgba(18,60,50,0.5)] dark:border-care-night-line dark:bg-care-night-panel dark:shadow-none lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-care-line px-5 dark:border-care-night-line">
          <span
            className={`grid size-10 place-items-center rounded-2xl ${color} text-xl font-bold text-white shadow-lg shadow-care-green-700/20`}
            aria-hidden="true"
          >
            <Plus className="size-5" strokeWidth={2.5} />
          </span>
          <div>
            <p className="font-display text-base font-extrabold tracking-tight text-care-ink dark:text-care-night-ink">
              AbsoluteCare
            </p>
            <p className="mt-0.5 text-xs font-semibold text-care-muted dark:text-care-night-muted">
              {roleLabel} dashboard
            </p>
          </div>
        </div>
        <nav
          className="flex-1 space-y-1 overflow-y-auto px-4 py-7"
          aria-label={`${roleLabel} dashboard navigation`}
        >
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-care-muted dark:text-care-night-muted">
            Navigation
          </p>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectView(item.id)}
              className={`group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-semibold transition ${
                activeView === item.id
                  ? "border-care-green-700/20 bg-care-green-50 text-care-green-800 shadow-sm dark:border-care-green-600/30 dark:bg-care-green-900/30 dark:text-care-green-100"
                  : "border-transparent text-care-muted hover:border-care-line hover:bg-care-canvas hover:text-care-ink dark:text-care-night-muted dark:hover:border-care-night-line dark:hover:bg-care-night-card dark:hover:text-care-night-ink"
              }`}
              aria-current={activeView === item.id ? "page" : undefined}
            >
              <span
                className={`grid size-7 place-items-center rounded-lg transition ${activeView === item.id ? "bg-care-green-700 text-white dark:bg-care-green-600" : "bg-care-canvas text-care-muted group-hover:bg-white dark:bg-care-night-card dark:text-care-night-muted dark:group-hover:bg-care-night-panel"}`}
                aria-hidden="true"
              >
                {(() => {
                  const Icon = navIcons[item.id] || MessageSquareText;
                  return <Icon className="size-4" strokeWidth={2} />;
                })()}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-care-line p-4 dark:border-care-night-line">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-care-canvas p-3 dark:bg-care-night-card">
            <span className="grid size-8 place-items-center rounded-lg bg-care-blue-100 text-xs font-extrabold text-care-blue-700 dark:bg-care-blue-900/40 dark:text-care-blue-100">
              {roleLabel.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-care-ink dark:text-care-night-ink">
                {roleLabel} account
              </p>
              <p className="text-[11px] text-care-muted dark:text-care-night-muted">
                Scheduling account
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onExit}
            className="flex w-full items-center gap-2 rounded-xl border border-care-line px-3 py-2.5 text-left text-sm font-semibold text-care-muted transition hover:border-care-error hover:text-care-error dark:border-care-night-line dark:text-care-night-muted dark:hover:border-care-error"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-care-line bg-white/95 px-4 backdrop-blur-md dark:border-care-night-line dark:bg-care-night/95 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="grid size-10 place-items-center rounded-xl border border-care-line text-care-ink dark:border-care-night-line dark:text-care-night-ink lg:hidden"
              aria-label="Toggle dashboard navigation"
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
            <div>
              <p className="text-xs font-bold text-care-muted dark:text-care-night-muted">
                {roleLabel} scheduling
              </p>
              <h1 className="mt-1 font-display text-xl font-extrabold tracking-tight text-care-ink dark:text-care-night-ink">
                {activeLabel}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 rounded-full border border-care-blue-700/15 bg-care-blue-50/70 px-3 py-1.5 text-xs font-bold text-care-blue-700 dark:border-care-blue-500/25 dark:bg-care-blue-900/30 dark:text-care-blue-100 sm:inline-flex">
              <CircleCheck className="size-3.5" aria-hidden="true" />
              Data connection pending
            </span>
            <ThemeToggle />
          </div>
        </header>

        {mobileNavOpen && (
          <div className="border-b border-care-line bg-white px-4 py-4 dark:border-care-night-line dark:bg-care-night-panel lg:hidden">
            <nav
              className="grid gap-1"
              aria-label="Mobile dashboard navigation"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectView(item.id)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition hover:bg-care-canvas dark:hover:bg-care-night-card ${activeView === item.id ? "bg-care-green-50 text-care-green-800 dark:bg-care-green-900/30 dark:text-care-green-100" : "text-care-muted dark:text-care-night-muted"}`}
                >
                  <span
                    className={`grid size-7 place-items-center rounded-lg ${activeView === item.id ? "bg-care-green-700 text-white dark:bg-care-green-600" : "bg-care-canvas text-care-muted dark:bg-care-night-card dark:text-care-night-muted"}`}
                    aria-hidden="true"
                  >
                    {(() => {
                      const Icon = navIcons[item.id] || MessageSquareText;
                      return <Icon className="size-4" strokeWidth={2} />;
                    })()}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
            <button
              type="button"
              onClick={onExit}
              className="mt-4 flex w-full items-center gap-2 rounded-xl border border-care-line px-3 py-3 text-left text-sm font-bold text-care-error dark:border-care-night-line"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Log out
            </button>
          </div>
        )}

        <main
          id="dashboard-main"
          className="care-grid-paper mx-auto min-h-[calc(100svh-5rem)] max-w-7xl px-4 py-7 sm:px-8 lg:px-10 lg:py-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default PortalLayout;
