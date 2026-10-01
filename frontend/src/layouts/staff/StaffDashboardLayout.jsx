import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Bell, ChevronDown, LogOut, Settings2, UserRound } from "lucide-react";
import Sidebar from "../../components/dashboard/Sidebar";
import { getStaffRole, getStaffRoute } from "../../config/staffDashboardConfig";
import { useSidebar } from "../../context/useSidebar";
import { useAuth } from "../../context/useAuth";
import { getTherapistAppointments } from "../../services/api/therapistApi";

function StaffDashboardLayout({ role: routeRole }) {
  const { role: paramRole } = useParams();
  const { user, loading: authLoading, logout } = useAuth();
  const role = user?.role || routeRole || paramRole;
  const roleConfig = getStaffRole(role);
  const { collapsed, sidebarWidth } = useSidebar();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const [assignedAppointmentsState, setAssignedAppointments] = useState(
    role === "therapist" && user?.id ? null : [],
  );

  useEffect(() => {
    if (role !== "therapist" || !user?.id) return;
    getTherapistAppointments()
      .then((response) =>
        setAssignedAppointments(response.data.appointments || []),
      )
      .catch(() => setAssignedAppointments([]));
  }, [role, user?.id]);

  const assignedAppointments = assignedAppointmentsState || [];
  const appointmentsLoading =
    role === "therapist" && assignedAppointmentsState === null;

  const firstName = user?.firstName || user?.firstname || "";
  const lastName = user?.lastName || user?.lastname || "";
  const displayName = `${firstName} ${lastName}`.trim();
  const initials =
    `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "…";

  useEffect(() => {
    if (!profileOpen) return;
    function moveProfileFocus(event) {
      if (
        !profileMenuRef.current ||
        !["ArrowDown", "ArrowUp"].includes(event.key)
      )
        return;
      const items = [...profileMenuRef.current.querySelectorAll("a, button")];
      const currentIndex = items.indexOf(document.activeElement);
      const nextIndex =
        event.key === "ArrowDown"
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;
      event.preventDefault();
      items[nextIndex]?.focus();
    }
    document.addEventListener("keydown", moveProfileFocus);
    return () => document.removeEventListener("keydown", moveProfileFocus);
  }, [profileOpen]);

  async function logOut() {
    await logout();
    navigate("/staff/login");
  }

  return (
    <div
      className={`staff-dashboard-shell${collapsed ? " is-sidebar-collapsed" : ""}`}
      style={{ "--sidebar-width": sidebarWidth }}
    >
      <Sidebar
        role={user?.role || role}
        badgeCounts={
          appointmentsLoading
            ? {}
            : { appointments: assignedAppointments.length }
        }
        onLogout={logOut}
      />
      <div className="staff-dashboard-main">
        <header className="staff-dashboard-topbar">
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
                <span className="staff-avatar">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="" />
                  ) : authLoading ? (
                    <span
                      className="staff-avatar-skeleton"
                      aria-hidden="true"
                    />
                  ) : (
                    initials
                  )}
                </span>
                <span>
                  {authLoading
                    ? "Loading profile"
                    : displayName || "Staff member"}
                </span>
                <ChevronDown size={14} />
              </button>
              {profileOpen && (
                <div
                  className="staff-popover staff-profile-menu"
                  ref={profileMenuRef}
                >
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
        <Outlet
          context={{
            role,
            roleConfig,
            assignedAppointments,
            appointmentsLoading,
          }}
        />
      </div>
    </div>
  );
}

export default StaffDashboardLayout;
