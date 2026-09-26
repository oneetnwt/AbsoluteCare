import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Activity,
  Bell,
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  UserRoundCog,
  UsersRound,
  X,
} from "lucide-react";
import { usePatientDashboard } from "../../hooks/usePatientDashboard";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    label: "My Appointments",
    icon: CalendarDays,
    href: "/dashboard#appointments",
  },
  { label: "Book Appointment", icon: CalendarPlus, href: "/signup" },
  { label: "Therapy Progress", icon: Activity, href: "/dashboard#history" },
  { label: "My Dependents", icon: UsersRound, href: "/dashboard#dependents" },
  {
    label: "Profile & Settings",
    icon: UserRoundCog,
    href: "/dashboard#profile",
  },
];

function DashboardLayout() {
  const navigate = useNavigate();
  const dashboardState = usePatientDashboard();
  const { profile } = dashboardState;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  function logOut() {
    navigate("/login");
  }

  return (
    <div className="dashboard-shell">
      {sidebarOpen && (
        <button
          className="dashboard-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="dashboard-brand-wrap">
          <Link className="dashboard-brand" to="/">
            <span className="dashboard-brand-mark" aria-hidden="true">
              <HeartPulse size={19} strokeWidth={2.2} />
            </span>
            <span>
              AbsoluteCare <small>Therapy Center</small>
            </span>
          </Link>
          <button
            className="sidebar-close"
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="dashboard-nav" aria-label="Patient navigation">
          <p className="dashboard-nav-label">Your care</p>
          {navigation.map(({ label, icon: Icon, href }) => (
            <Link
              className={`dashboard-nav-link ${label === "Dashboard" ? "is-active" : ""}`}
              key={label}
              to={href}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-help">
          <span className="sidebar-help-dot" />
          <div>
            <strong>Need a hand?</strong>
            <span>Call 0917 715 2780</span>
          </div>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="sidebar-menu"
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>
          <div className="topbar-context">
            <span>Patient portal</span>
            <span className="topbar-separator">/</span>
            <strong>Dashboard</strong>
          </div>
          <div className="topbar-actions">
            <div className="notification-wrap">
              <button
                className="icon-button notification-button"
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Open notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell size={19} strokeWidth={1.8} />
                <span className="notification-dot" />
              </button>
              {notificationsOpen && (
                <div className="popover notification-popover">
                  <strong>Notifications</strong>
                  <p>Your appointment on 14 May is confirmed.</p>
                  <small>Just now</small>
                </div>
              )}
            </div>
            <div className="profile-wrap">
              <button
                className="profile-trigger"
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
              >
                <span className="avatar avatar-small">
                  {profile?.initials || "AC"}
                </span>
                <span className="profile-trigger-name">
                  {profile?.firstName || "Patient"}
                </span>
                <ChevronDown size={15} />
              </button>
              {profileOpen && (
                <div className="popover profile-popover">
                  <Link
                    to="/dashboard#profile"
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserRound size={15} />
                    Profile
                  </Link>
                  <Link
                    to="/dashboard#profile"
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserRoundCog size={15} />
                    Settings
                  </Link>
                  <button type="button" onClick={logOut}>
                    <LogOut size={15} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <Outlet context={dashboardState} />
      </div>
    </div>
  );
}

export default DashboardLayout;
