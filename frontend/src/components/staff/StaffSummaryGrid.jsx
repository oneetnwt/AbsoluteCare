import {
  CalendarDays,
  CircleDollarSign,
  Clock3,
  UsersRound,
} from "lucide-react";
import { DashboardCard } from "../dashboard/DashboardPrimitives";

const summaryIcons = [UsersRound, CalendarDays, Clock3, CircleDollarSign];

function StaffSummaryGrid({ summaries }) {
  return (
    <section
      className={`staff-summary-grid summary-count-${summaries.length}`}
      aria-label="Staff dashboard summary"
    >
      {summaries.map(([label, value, reference], index) => {
        const Icon = summaryIcons[index % summaryIcons.length];
        return (
          <DashboardCard className="staff-summary-card" key={label}>
            <span className={`staff-summary-icon summary-tone-${index % 4}`}>
              <Icon size={18} />
            </span>
            <span className="staff-summary-label">{label}</span>
            <strong>{value}</strong>
            <small>Requirement {reference}</small>
          </DashboardCard>
        );
      })}
    </section>
  );
}

export default StaffSummaryGrid;
