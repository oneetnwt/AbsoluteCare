import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import Sidebar from "../../components/dashboard/Sidebar";
import { useSidebar } from "../../context/useSidebar";
import { useAuth } from "../../context/useAuth";
import { usePatientDashboard } from "../../hooks/usePatientDashboard";
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationRead,
} from "../../services/api/patientApi";
import { relativeTime } from "../../utils/patientFormatters";

function DashboardLayout() {
  const navigate = useNavigate();
  const dashboardState = usePatientDashboard();
  const { profile } = dashboardState;
  const { user, logout } = useAuth();
  const headerProfile = user || profile;
  const headerInitials =
    `${headerProfile?.firstName?.[0] || headerProfile?.firstname?.[0] || ""}${headerProfile?.lastName?.[0] || headerProfile?.lastname?.[0] || ""}`.toUpperCase() ||
    "AC";
  const { collapsed, sidebarWidth } = useSidebar();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const refreshNotifications = useCallback(
    async function refreshNotifications() {
      try {
        const [listResponse, countResponse] = await Promise.all([
          getNotifications(),
          getUnreadNotificationCount(),
        ]);
        setNotifications(listResponse.data?.notifications?.slice(0, 5) || []);
        setUnreadCount(countResponse.data?.count || 0);
      } catch {
        // Notification errors should not block the dashboard.
      }
    },
    [],
  );

  useEffect(() => {
    const initialRefresh = window.setTimeout(refreshNotifications, 0);
    const interval = window.setInterval(refreshNotifications, 60_000);
    return () => {
      window.clearTimeout(initialRefresh);
      window.clearInterval(interval);
    };
  }, [refreshNotifications]);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (!profileMenuRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
      if (!notificationRef.current?.contains(event.target))
        setNotificationsOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function logOut() {
    await logout();
    navigate("/login");
  }

  return (
    <div
      className={`dashboard-shell${collapsed ? " is-sidebar-collapsed" : ""}`}
      style={{ "--sidebar-width": sidebarWidth }}
    >
      <Sidebar role={user?.role} />
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-context">
            <span>Patient portal</span>
            <span className="topbar-separator">/</span>
            <strong>Dashboard</strong>
          </div>
          <div className="topbar-actions">
            <div className="notification-wrap" ref={notificationRef}>
              <button
                className="icon-button notification-button"
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Open notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell size={19} strokeWidth={1.8} />
                {unreadCount > 0 && (
                  <span className="notification-count">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              {notificationsOpen && (
                <div className="popover notification-popover">
                  <div className="notification-popover-head">
                    <strong>Notifications</strong>
                    <Link
                      to="/dashboard/notifications"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      View all
                    </Link>
                  </div>
                  {notifications.length ? (
                    notifications.map((notification) => (
                      <button
                        key={notification._id}
                        type="button"
                        className={`notification-popover-item${notification.isRead ? "" : " is-unread"}`}
                        onClick={async () => {
                          if (!notification.isRead)
                            await markNotificationRead(notification._id);
                          setNotificationsOpen(false);
                          if (notification.appointment?._id)
                            navigate(
                              `/dashboard/appointments/${notification.appointment._id}`,
                            );
                        }}
                      >
                        <span>{notification.title}</span>
                        <small>
                          {notification.message} ·{" "}
                          {relativeTime(notification.createdAt)}
                        </small>
                      </button>
                    ))
                  ) : (
                    <p>No new notifications.</p>
                  )}
                </div>
              )}
            </div>
            <div className="profile-wrap" ref={profileMenuRef}>
              <button
                className="profile-trigger"
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
              >
                {headerProfile?.profilePicture ? (
                  <img
                    className="avatar avatar-small"
                    src={headerProfile.profilePicture}
                    alt=""
                  />
                ) : (
                  <span className="avatar avatar-small">{headerInitials}</span>
                )}
                <span className="profile-trigger-name">
                  {headerProfile?.firstName || "Patient"}
                </span>
                <ChevronDown size={15} />
              </button>
              {profileOpen && (
                <div className="popover profile-popover">
                  <Link to="/profile" onClick={() => setProfileOpen(false)}>
                    <UserRound size={15} />
                    Profile
                  </Link>
                  <Link to="/settings" onClick={() => setProfileOpen(false)}>
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
