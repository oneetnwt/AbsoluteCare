import { useOutletContext } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarCheck2,
  CalendarPlus,
  ChevronRight,
  FileText,
  MoveRight,
  Plus,
  RefreshCw,
  Stethoscope,
} from "lucide-react";
import {
  DashboardCard,
  DashboardEmptyState,
  StatusBadge,
} from "../../components/dashboard/DashboardPrimitives";

function Dashboard() {
  const {
    profile,
    appointments,
    sessionHistory,
    dependents,
    upcomingAppointment,
    sessionsCompleted,
    treatmentPlan,
    loading,
    error,
    retry,
  } = useOutletContext();

  if (loading) return <DashboardState message="Loading your care dashboard…" />;
  if (error) return <DashboardState error={error} retry={retry} />;

  const firstName = profile?.firstName || "there";
  const today = new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <main className="dashboard-content">
      <section className="dashboard-welcome">
        <div>
          <p className="dashboard-eyebrow">{today}</p>
          <h1>Welcome back, {firstName}</h1>
          <p>Here is your care plan at a glance.</p>
        </div>
        <a className="dashboard-primary-button" href="/signup">
          <CalendarPlus size={17} aria-hidden="true" />
          Book an appointment
        </a>
      </section>

      <section className="summary-grid" aria-label="Care summary">
        <AppointmentSummary appointment={upcomingAppointment} />
        <SummaryCard
          icon={<Stethoscope size={18} />}
          iconClass="icon-mint"
          label="Sessions completed"
          value={sessionsCompleted}
          caption="sessions recorded"
          linkLabel="View history"
          href="#history"
        />
        <TreatmentSummary plan={treatmentPlan} />
        <DashboardCard
          as="a"
          className="summary-card quick-action"
          href="/signup"
        >
          <span className="quick-action-mark">
            <Plus size={22} />
          </span>
          <strong>Book a new appointment</strong>
          <span>Choose a service and find a time that works.</span>
          <MoveRight size={20} />
        </DashboardCard>
      </section>

      <AppointmentsSection appointments={appointments} />
      <div className="dashboard-lower-grid">
        <HistorySection sessions={sessionHistory} />
        <DependentsSection dependents={dependents} />
      </div>
    </main>
  );
}

function AppointmentSummary({ appointment }) {
  return (
    <DashboardCard className="summary-card appointment-summary">
      <div className="summary-card-head">
        <span className="summary-icon">
          <CalendarCheck2 size={18} />
        </span>
        <span className="summary-label">Upcoming appointment</span>
      </div>
      {appointment ? (
        <>
          <strong className="summary-date">{appointment.date}</strong>
          <div className="summary-detail">{appointment.time}</div>
          <div className="summary-service">
            <span>{appointment.service}</span>
            <small>{appointment.therapist}</small>
          </div>
          <div className="summary-actions">
            <button type="button">Reschedule</button>
            <button type="button">Cancel</button>
          </div>
        </>
      ) : (
        <EmptySummary
          message="No upcoming appointments"
          action="Book your next session"
        />
      )}
    </DashboardCard>
  );
}

function SummaryCard({
  icon,
  iconClass,
  label,
  value,
  caption,
  linkLabel,
  href,
}) {
  return (
    <DashboardCard className="summary-card stat-summary">
      <span className={`summary-icon ${iconClass}`}>{icon}</span>
      <span className="summary-label">{label}</span>
      <strong className="stat-number">{value}</strong>
      <span className="stat-caption">{caption}</span>
      <a className="summary-link" href={href}>
        {linkLabel} <ArrowUpRight size={14} />
      </a>
    </DashboardCard>
  );
}

function TreatmentSummary({ plan }) {
  return (
    <DashboardCard className="summary-card plan-summary">
      <span className="summary-icon icon-lilac">
        <FileText size={18} />
      </span>
      <span className="summary-label">Active treatment plan</span>
      {plan ? (
        <>
          <strong className="plan-title">{plan.name}</strong>
          <div className="plan-progress">
            <span>
              <b>Week {plan.week}</b> of {plan.totalWeeks}
            </span>
            <span>{plan.percent}%</span>
          </div>
          <div className="progress-track">
            <span style={{ width: `${plan.percent}%` }} />
          </div>
          <a className="summary-link" href="#history">
            View progress <ArrowUpRight size={14} />
          </a>
        </>
      ) : (
        <EmptySummary
          message="No active plan yet"
          action="Your plan will appear here"
        />
      )}
    </DashboardCard>
  );
}

function EmptySummary({ message, action }) {
  return (
    <div className="summary-empty">
      <strong>{message}</strong>
      <span>{action}</span>
    </div>
  );
}

function AppointmentsSection({ appointments }) {
  return (
    <section className="dashboard-section" id="appointments">
      <SectionHeading eyebrow="Your schedule" title="Upcoming appointments">
        <a className="subtle-action" href="/signup">
          Book appointment <ArrowUpRight size={14} />
        </a>
      </SectionHeading>
      {appointments.length ? (
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Service</th>
                <th>Therapist</th>
                <th>Status</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={`${appointment.date}-${appointment.time}`}>
                  <td data-label="Date">
                    <strong>{appointment.date}</strong>
                  </td>
                  <td data-label="Time">{appointment.time}</td>
                  <td data-label="Service">
                    <span className="service-cell">
                      <span className="service-dot" />
                      {appointment.service}
                    </span>
                  </td>
                  <td data-label="Therapist">{appointment.therapist}</td>
                  <td data-label="Status">
                    <StatusBadge status={appointment.status} />
                  </td>
                  <td className="table-actions">
                    <button
                      type="button"
                      aria-label={`Actions for ${appointment.date}`}
                    >
                      •••
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyPanel
          icon={<CalendarCheck2 size={22} />}
          title="No upcoming appointments"
          message="When you book a visit, your appointment details will appear here."
          action="Book your next session"
          href="/signup"
        />
      )}
      <div className="table-footnote">
        <span>
          {appointments.length
            ? `Showing ${appointments.length} upcoming visit${appointments.length === 1 ? "" : "s"}`
            : "Your schedule is clear"}
        </span>
        {appointments.length > 0 && (
          <a href="#appointments">
            View all appointments <ChevronRight size={14} />
          </a>
        )}
      </div>
    </section>
  );
}

function HistorySection({ sessions }) {
  return (
    <section className="dashboard-section history-section" id="history">
      <SectionHeading eyebrow="Keep track of your care" title="Recent activity">
        <a
          className="icon-link"
          href="#history"
          aria-label="View all recent activity"
        >
          <ArrowUpRight size={17} />
        </a>
      </SectionHeading>
      {sessions.length ? (
        <div className="history-list">
          {sessions.map((session) => (
            <article className="history-item" key={session.date}>
              <span className="history-marker">
                <CalendarCheck2 size={14} />
              </span>
              <div>
                <strong>{session.date}</strong>
                <span>
                  {session.service} <i /> {session.therapist}
                </span>
                <p>{session.note}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyPanel
          icon={<Stethoscope size={22} />}
          title="No session history yet"
          message="Completed visits and therapist notes will appear here."
        />
      )}
    </section>
  );
}

function DependentsSection({ dependents }) {
  return (
    <section className="dashboard-section dependents-section" id="dependents">
      <SectionHeading eyebrow="For your family" title="My dependents">
        <button className="icon-link" type="button" aria-label="Add dependent">
          <Plus size={17} />
        </button>
      </SectionHeading>
      {dependents.length ? (
        <div className="dependents-list">
          {dependents.map((dependent) => (
            <article className="dependent" key={dependent.name}>
              <span className="avatar dependent-avatar">
                {dependent.initials}
              </span>
              <div className="dependent-main">
                <strong>{dependent.name}</strong>
                <span>
                  {dependent.age} · {dependent.service}
                </span>
                <small>
                  <span className="dependent-status" />
                  {dependent.progress}
                </small>
              </div>
              <div className="dependent-next">
                <span>Next visit</span>
                <strong>{dependent.nextVisit}</strong>
              </div>
              <ChevronRight size={16} className="dependent-arrow" />
            </article>
          ))}
        </div>
      ) : (
        <EmptyPanel
          icon={<Plus size={22} />}
          title="No dependents added"
          message="Add a child profile when you manage pediatric OT care for your family."
          action="Add a dependent"
        />
      )}
    </section>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-title-row">
      <div>
        <p className="dashboard-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function EmptyPanel({ icon, title, message, action, href }) {
  return (
    <DashboardEmptyState
      icon={icon}
      title={title}
      message={message}
      action={
        action &&
        (href ? (
          <a className="empty-action" href={href}>
            {action} <ArrowUpRight size={14} />
          </a>
        ) : (
          <button className="empty-action" type="button">
            {action}
          </button>
        ))
      }
    />
  );
}

function DashboardState({ message, error, retry }) {
  return (
    <main className="dashboard-content dashboard-state">
      <div className="dashboard-state-card">
        {error ? (
          <>
            <span className="empty-icon">
              <RefreshCw size={22} />
            </span>
            <h1>We couldn’t load your dashboard</h1>
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

export default Dashboard;
