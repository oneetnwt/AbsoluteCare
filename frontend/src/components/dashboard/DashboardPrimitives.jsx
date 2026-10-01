import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function StatCard({
  action,
  caption,
  children,
  icon,
  label,
  className,
  value,
  variant = "default",
  href,
}) {
  const content = (
    <>
      <div className="stat-card-header">
        <span className="stat-card-icon">{icon}</span>
        <span className="stat-card-label">{label}</span>
      </div>
      <div className="stat-card-value-area">
        <strong className="stat-card-value">{value}</strong>
        {children}
        <span className="stat-card-caption">{caption}</span>
      </div>
      <span className="stat-card-footer">
        {action} <ArrowUpRight size={14} aria-hidden="true" />
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        className={cx("stat-card", `stat-card-${variant}`, className)}
        to={href}
      >
        {content}
      </Link>
    );
  }

  return (
    <article className={cx("stat-card", `stat-card-${variant}`, className)}>
      {content}
    </article>
  );
}

export function DashboardCard({
  as: Element = "article",
  className,
  children,
  ...props
}) {
  return (
    <Element className={cx("dashboard-card", className)} {...props}>
      {children}
    </Element>
  );
}

export function StatusBadge({ status }) {
  const statusKey = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={cx("dashboard-status-badge", `status-${statusKey}`)}>
      {status}
    </span>
  );
}

export function DashboardEmptyState({ icon, title, message, action }) {
  return (
    <div className="dashboard-empty-state">
      {icon && <span className="dashboard-empty-state-icon">{icon}</span>}
      <strong>{title}</strong>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}
