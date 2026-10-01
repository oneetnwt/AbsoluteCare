function Skeleton({ className = "", variant = "text", width, height, radius }) {
  const classes = `skeleton skeleton-${variant} ${className}`.trim();
  return (
    <span
      className={classes}
      aria-hidden="true"
      style={{ width, height, borderRadius: radius }}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <article className="stat-card stat-card-skeleton">
      <div className="stat-card-header">
        <Skeleton variant="rectangle" />
        <Skeleton variant="text" width="46%" height="12px" />
      </div>
      <Skeleton variant="heading" width="74%" height="28px" />
      <Skeleton variant="text" width="58%" height="11px" />
      <Skeleton variant="text" width="38%" height="11px" />
    </article>
  );
}

export function DashboardSkeleton() {
  return (
    <main
      className="dashboard-content dashboard-loading-region"
      aria-busy="true"
    >
      <p className="sr-only" role="status">
        Loading your dashboard
      </p>
      <section
        className="dashboard-welcome dashboard-welcome-skeleton"
        aria-hidden="true"
      >
        <div>
          <Skeleton variant="text" width="145px" height="10px" />
          <Skeleton variant="heading" width="310px" height="45px" />
          <Skeleton variant="text" width="220px" height="12px" />
        </div>
        <Skeleton variant="button" width="160px" height="44px" />
      </section>
      <section className="summary-grid" aria-hidden="true">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </section>
      <Skeleton
        className="dashboard-skeleton-banner"
        variant="rectangle"
        width="100%"
        height="55px"
      />
      <section
        className="dashboard-section dashboard-history-skeleton"
        aria-hidden="true"
      >
        <div className="section-title-row">
          <div>
            <Skeleton variant="text" width="120px" height="10px" />
            <Skeleton variant="heading" width="190px" height="29px" />
          </div>
          <Skeleton variant="rectangle" width="32px" height="32px" />
        </div>
        {[1, 2, 3].map((row) => (
          <div className="history-skeleton-row" key={row}>
            <Skeleton variant="circle" width="29px" height="29px" />
            <span>
              <Skeleton variant="text" width="130px" height="11px" />
              <Skeleton variant="text" width="210px" height="10px" />
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}

export function AppLoader() {
  return (
    <main className="app-loader" aria-live="polite" aria-busy="true">
      <div className="app-loader-mark" aria-hidden="true">
        +
      </div>
      <span className="app-loader-spinner" aria-hidden="true" />
      <p>Checking your session</p>
    </main>
  );
}

export default Skeleton;
