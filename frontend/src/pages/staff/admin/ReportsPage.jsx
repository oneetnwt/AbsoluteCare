import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import StaffPageHeader from "../../../components/staff/StaffPageHeader";

function ReportsPage() {
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-section staff-standalone-page">
        <StaffPageHeader
          eyebrow="Insights"
          title="Reports"
          description="Review patient, session, workload, and payment reporting."
          action={
            <button className="staff-section-primary" type="button">
              Choose date range
            </button>
          }
        />
        <div className="report-grid">
          {[
            "Patient count",
            "Completed sessions",
            "Appointment stats",
            "Therapist workload",
            "Payment report",
            "Clinic summary",
          ].map((report) => (
            <article className="report-card" key={report}>
              <span className="report-card-icon">
                <SlidersHorizontal size={16} />
              </span>
              <strong>{report}</strong>
              <span>Awaiting reporting data</span>
              <ArrowUpRight size={15} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
export default ReportsPage;
