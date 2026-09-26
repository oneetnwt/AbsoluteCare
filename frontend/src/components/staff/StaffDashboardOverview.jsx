import { CheckCircle2 } from "lucide-react";
import StaffSummaryGrid from "./StaffSummaryGrid";

function StaffDashboardOverview({ roleConfig }) {
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-welcome">
        <div>
          <p className="staff-eyebrow">{roleConfig.label} workspace</p>
          <h1>{roleConfig.title}</h1>
          <p>{roleConfig.description}</p>
        </div>
        <span className="staff-welcome-status">
          <CheckCircle2 size={15} /> System ready
        </span>
      </section>
      <StaffSummaryGrid summaries={roleConfig.summaries} />
    </main>
  );
}

export default StaffDashboardOverview;
