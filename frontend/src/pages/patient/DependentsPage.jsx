import { Plus, RefreshCw } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { DependentsSection } from "./Dashboard";

function DependentsPage() {
  const { dependents, loading, error, retry } = useOutletContext();

  if (loading) return <PageState message="Loading your dependents…" />;
  if (error) return <PageState error={error} retry={retry} />;

  return (
    <main className="dashboard-content">
      <section className="dashboard-section patient-page-section">
        <div className="section-title-row">
          <div>
            <p className="dashboard-eyebrow">For your family</p>
            <h1>My dependents</h1>
          </div>
          <button className="dashboard-primary-button" type="button">
            <Plus size={16} />
            Add dependent
          </button>
        </div>
        <DependentsSection dependents={dependents} />
      </section>
    </main>
  );
}

function PageState({ message, error, retry }) {
  return (
    <main className="dashboard-content dashboard-state">
      <div className="dashboard-state-card">
        {error ? (
          <>
            <span className="empty-icon">
              <RefreshCw size={22} />
            </span>
            <h1>We couldn’t load your dependents</h1>
            <p>{error}</p>
            <button
              className="dashboard-primary-button"
              type="button"
              onClick={retry}
            >
              Try again
            </button>
          </>
        ) : (
          <>
            <span className="dashboard-state-loader" />
            <h1>{message}</h1>
          </>
        )}
      </div>
    </main>
  );
}

export default DependentsPage;
