function cx(...classes) {
  return classes.filter(Boolean).join(" ");
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
