import { useEffect, useState } from "react";
import { CalendarDays, ClipboardPenLine, UsersRound } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import {
  StatCard,
  StatusBadge,
} from "../../../components/dashboard/DashboardPrimitives";
import StaffPageHeader from "../../../components/staff/StaffPageHeader";
import {
  getTherapistAppointments,
  getTherapistPatients,
  getTherapistSessions,
} from "../../../services/api/therapistApi";

function DashboardPage() {
  const { roleConfig } = useOutletContext();
  const [data, setData] = useState({
    appointments: [],
    patients: [],
    sessions: [],
  });
  useEffect(() => {
    Promise.all([
      getTherapistAppointments("upcoming"),
      getTherapistPatients(),
      getTherapistSessions(),
    ])
      .then(([appointments, patients, sessions]) =>
        setData({
          appointments: appointments.data.appointments,
          patients: patients.data.patients,
          sessions: sessions.data.sessions,
        }),
      )
      .catch(() => {});
  }, []);
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Manila",
  });
  const todaysAppointments = data.appointments.filter(
    (item) => item.scheduledStart?.slice(0, 10) === today,
  );
  const pendingRecords = data.appointments.filter(
    (item) =>
      item.status === "confirmed" && new Date(item.scheduledStart) < new Date(),
  ).length;
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-welcome">
        <div>
          <p className="staff-eyebrow">{roleConfig.label} workspace</p>
          <h1>{roleConfig.title}</h1>
          <p>{roleConfig.description}</p>
        </div>
      </section>
      <section
        className="staff-summary-grid summary-count-4"
        aria-label="Therapist summary"
      >
        <StatCard
          label="Today's appointments"
          value={todaysAppointments.length}
          caption="Asia/Manila"
          icon={<CalendarDays size={17} />}
          action="Open schedule"
          href="/staff/therapist/my-appointments"
        />
        <StatCard
          label="Upcoming appointments"
          value={data.appointments.length}
          caption="Confirmed visits"
          icon={<CalendarDays size={17} />}
          action="View appointments"
          href="/staff/therapist/my-appointments"
        />
        <StatCard
          label="Assigned patients"
          value={data.patients.length}
          caption="Your caseload"
          icon={<UsersRound size={17} />}
          action="View patients"
          href="/staff/therapist/my-patients"
        />
        <StatCard
          label="Records to complete"
          value={pendingRecords}
          caption="Past confirmed visits"
          icon={<ClipboardPenLine size={17} />}
          action="Record sessions"
          href="/staff/therapist/session-records"
        />
      </section>
      <section className="staff-dashboard-section therapist-schedule-panel">
        <StaffPageHeader
          eyebrow="Today"
          title="Your schedule"
          description="The next visits assigned to you."
        />
        <div className="therapist-schedule-list">
          {todaysAppointments.length ? (
            todaysAppointments.map((item) => (
              <Link
                className="therapist-schedule-row"
                to={`/staff/therapist/appointments/${item._id}`}
                key={item._id}
              >
                <span>
                  <strong>
                    {item.patient?.firstname} {item.patient?.lastname}
                  </strong>
                  <small>{item.service?.name}</small>
                </span>
                <span>
                  <strong>
                    {new Date(item.scheduledStart).toLocaleTimeString("en-PH", {
                      hour: "numeric",
                      minute: "2-digit",
                      timeZone: "Asia/Manila",
                    })}
                  </strong>
                  <StatusBadge status={item.status} />
                </span>
              </Link>
            ))
          ) : (
            <p className="staff-muted">No appointments scheduled for today.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
