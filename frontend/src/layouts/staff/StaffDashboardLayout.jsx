import { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Activity,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings2,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { getStaffRole, getStaffRoute } from "../../config/staffDashboardConfig";

const navigationIcons = {
  dashboard: LayoutDashboard,
  users: UsersRound,
  therapists: Stethoscope,
  patients: UserRound,
  appointments: CalendarDays,
  services: ClipboardList,
  payments: CircleDollarSign,
  reports: BarChart3,
  records: ClipboardList,
  availability: Activity,
  profile: Settings2,
};

function StaffDashboardLayout({ role: routeRole }) {
  const { role: paramRole } = useParams();
  const role = routeRole || paramRole;
  const roleConfig = getStaffRole(role);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  function logOut() {
    navigate("/staff/login");
  }

  return (
    <div className="staff-dashboard-shell">
      {sidebarOpen && (
        <button
          className="staff-dashboard-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`staff-dashboard-sidebar ${sidebarOpen ? "is-open" : ""}`}
      >
        <div className="staff-dashboard-brand-row">
          <Link className="staff-dashboard-brand" to="/">
            <span className="staff-dashboard-brand-mark">
              <HeartPulse size={18} />
            </span>
            <span>
              AbsoluteCare <small>Staff portal</small>
            </span>
          </Link>
          <button
            className="staff-sidebar-close"
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>
        <div className="staff-role-chip">
          <ShieldCheck size={14} />
          <span>{roleConfig.label} access</span>
        </div>
        <nav
          className="staff-dashboard-nav"
          aria-label={`${roleConfig.label} navigation`}
        >
          <p>Workspace</p>
          {roleConfig.navigation.map(([label, key]) => {
            const Icon = navigationIcons[key] || LayoutDashboard;
            return (
              <NavLink
                className={({ isActive }) =>
                  `staff-dashboard-nav-link ${isActive ? "is-active" : ""}`
                }
                to={getStaffRoute(role, key)}
                end={key === "dashboard"}
                key={key}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="staff-sidebar-footer">
          <span>Need help?</span>
          <strong>Contact clinic admin</strong>
        </div>
      </aside>
      <div className="staff-dashboard-main">
        <header className="staff-dashboard-topbar">
          <button
            className="staff-sidebar-menu"
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>
          <div className="staff-topbar-title">
            <span>Staff portal</span>
            <b>/</b>
            <strong>{roleConfig.label}</strong>
          </div>
          <div className="staff-topbar-actions">
            <div className="staff-topbar-popover-wrap">
              <button
                className="staff-icon-button"
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Open notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell size={18} />
                <i />
              </button>
              {notificationsOpen && (
                <div className="staff-popover">
                  <strong>Notifications</strong>
                  <p>No new notifications.</p>
                </div>
              )}
            </div>
            <div className="staff-topbar-popover-wrap">
              <button
                className="staff-profile-trigger"
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
              >
                <span className="staff-avatar">ST</span>
                <span>Staff member</span>
                <ChevronDown size={14} />
              </button>
              {profileOpen && (
                <div className="staff-popover staff-profile-menu">
                  <Link to={getStaffRoute(role, "profile")}>
                    <UserRound size={14} />
                    View profile
                  </Link>
                  <Link to={getStaffRoute(role, "profile")}>
                    <Settings2 size={14} />
                    Edit profile
                  </Link>
                  <button type="button" onClick={logOut}>
                    <LogOut size={14} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <Outlet context={{ role, roleConfig }} />
      </div>
    </div>
  );
}

export default StaffDashboardLayout;
