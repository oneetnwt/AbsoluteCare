import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { getSidebarConfig } from "../../config/sidebarConfig";
import { useSidebar } from "../../context/useSidebar";

function Sidebar({ role, badgeCounts }) {
  const config = getSidebarConfig(role, badgeCounts);
  const { collapsed, toggleCollapsed, isMobile } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const closeDrawer = window.setTimeout(() => {
      if (!isMobile) setMobileOpen(false);
    }, 0);
    return () => window.clearTimeout(closeDrawer);
  }, [isMobile]);

  return (
    <>
      {mobileOpen && (
        <button
          className="dashboard-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      {isMobile && (
        <button
          className="dashboard-mobile-menu"
          type="button"
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={21} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
      <aside
        className={`dashboard-sidebar${collapsed ? " is-collapsed" : ""}${mobileOpen ? " is-open" : ""}`}
        aria-label={`${config.label} navigation`}
      >
        <div className="dashboard-sidebar-head">
          <Link
            className="dashboard-brand"
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            <span className="dashboard-brand-mark" aria-hidden="true">
              <HeartPulse size={19} strokeWidth={2.2} />
            </span>
            <span className="dashboard-brand-copy">
              AbsoluteCare <small>{config.subtitle}</small>
            </span>
          </Link>
          <button
            className="dashboard-sidebar-toggle"
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            onClick={toggleCollapsed}
          >
            {collapsed ? <ChevronRight size={19} /> : <ChevronLeft size={19} />}
          </button>
          <button
            className="dashboard-sidebar-close"
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          >
            <X size={19} />
          </button>
        </div>
        {config.roleLabel && (
          <div className="dashboard-role-chip">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>{config.roleLabel}</span>
          </div>
        )}
        <nav
          className="dashboard-nav"
          aria-label={`${config.label} navigation`}
        >
          <p className="dashboard-nav-label">{config.navLabel}</p>
          <div className="dashboard-nav-list">
            {config.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  className={({ isActive }) =>
                    `dashboard-nav-link${isActive ? " is-active" : ""}`
                  }
                  end={item.end}
                  key={item.key}
                  aria-label={collapsed ? item.label : undefined}
                  title={collapsed ? item.label : undefined}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  <span className="dashboard-nav-link-label">{item.label}</span>
                  {item.badge ? (
                    <span
                      className="dashboard-nav-badge"
                      aria-label={`${item.badge} pending`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </div>
        </nav>
        <div className="dashboard-sidebar-footer">
          <div className="dashboard-help">
            <span className="dashboard-help-dot" aria-hidden="true" />
            <span className="dashboard-help-copy">
              <strong>{config.helpTitle}</strong>
              <small>{config.helpText}</small>
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
