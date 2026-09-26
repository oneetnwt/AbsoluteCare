import { CalendarDays, Clock3 } from "lucide-react";
import StaffPageHeader from "../../../components/staff/StaffPageHeader";

function AvailabilityPage() {
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-section staff-standalone-page">
        <StaffPageHeader
          eyebrow="My care desk"
          title="My availability"
          description="Set working days and hours for your schedule."
          action={
            <button className="staff-section-primary" type="button">
              Save availability
            </button>
          }
        />
        <div className="availability-panel">
          <div className="availability-placeholder">
            <Clock3 size={20} />
            <strong>Working days and hours</strong>
            <span>Availability settings will appear here once configured.</span>
          </div>
          <div className="calendar-sync">
            <CalendarDays size={18} />
            <span>
              <strong>Google Calendar</strong>
              <small>Not connected</small>
            </span>
            <button type="button">Connect</button>
          </div>
        </div>
      </section>
    </main>
  );
}
export default AvailabilityPage;
