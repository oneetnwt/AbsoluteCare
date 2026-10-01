import { useEffect, useState } from "react";
import Skeleton from "../../../components/dashboard/Skeleton";
import StaffPageHeader from "../../../components/staff/StaffPageHeader";
import { getAdminReports } from "../../../services/api/adminMonitoringApi";
import { getToastError, showError } from "../../../utils/toast";

const money = (value) =>
  `₱${Number(value || 0).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

function ReportCard({ title, value, detail, children }) {
  return (
    <article className="report-card">
      <strong>{title}</strong>
      <span className="report-card-value">{value}</span>
      {detail && <small>{detail}</small>}
      {children}
    </article>
  );
}

export default function ReportsPage() {
  const [range, setRange] = useState("month");
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const load = () => {
    const now = new Date();
    const from =
      range === "week"
        ? new Date(now.getTime() - 7 * 86400000)
        : range === "quarter"
          ? new Date(now.getFullYear(), now.getMonth() - 2, 1)
          : new Date(now.getFullYear(), now.getMonth(), 1);
    return getAdminReports({ from: from.toISOString(), to: now.toISOString() })
      .then((response) => setReports(response.data))
      .catch((error) =>
        showError(getToastError(error, "Unable to load reports.")),
      )
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, [range]);
  const statusCount = (key) =>
    reports?.appointments?.byStatus?.find((item) => item._id === key)?.count ||
    0;
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-section staff-standalone-page">
        <StaffPageHeader
          eyebrow="Insights"
          title="Reports"
          description="A clinic-wide view of patients, care delivery, workload, and revenue."
          action={
            <label className="staff-section-primary">
              Range
              <select
                aria-label="Report date range"
                value={range}
                onChange={(event) => setRange(event.target.value)}
              >
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="quarter">This quarter</option>
              </select>
            </label>
          }
        />
        {loading ? (
          <div className="staff-loading-block">
            <Skeleton variant="heading" width="40%" height="24px" />
            <Skeleton variant="text" width="100%" height="100px" />
            <Skeleton variant="text" width="100%" height="100px" />
          </div>
        ) : (
          reports && (
            <>
              <div className="report-grid">
                <ReportCard
                  title="Clinic summary"
                  value={reports.appointments.total}
                  detail="Appointments in period"
                />
                <ReportCard
                  title="Patient count"
                  value={reports.patients.total}
                  detail={`${reports.patients.new} new in period`}
                />
                <ReportCard
                  title="Completed sessions"
                  value={reports.sessions.reduce(
                    (sum, item) => sum + item.count,
                    0,
                  )}
                  detail="Recorded sessions"
                />
                <ReportCard
                  title="Revenue collected"
                  value={money(reports.payments.revenue)}
                  detail="Paid appointments"
                />
                <ReportCard
                  title="Completion rate"
                  value={`${Math.round(reports.appointments.completionRate * 100)}%`}
                  detail={`${statusCount("no_show")} no-shows`}
                />
                <ReportCard
                  title="Top therapist"
                  value={reports.topTherapist?.name || "No data"}
                  detail={
                    reports.topTherapist
                      ? `${reports.topTherapist.count} appointments`
                      : "No assigned appointments"
                  }
                />
              </div>
              <div className="report-grid">
                <article className="report-card report-card-wide">
                  <strong>Appointments by status</strong>
                  {reports.appointments.byStatus.map((item) => (
                    <div className="report-bar-row" key={item._id}>
                      <span>{item._id}</span>
                      <div>
                        <i
                          style={{
                            width: `${reports.appointments.total ? (item.count / reports.appointments.total) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <b>{item.count}</b>
                    </div>
                  ))}
                </article>
                <article className="report-card report-card-wide">
                  <strong>Therapist workload</strong>
                  {reports.therapistWorkload.map((item) => (
                    <div className="report-bar-row" key={item._id}>
                      <span>{item.name}</span>
                      <div>
                        <i
                          style={{
                            width: `${reports.therapistWorkload[0]?.assigned ? (item.assigned / reports.therapistWorkload[0].assigned) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <b>
                        {item.completed}/{item.assigned}
                      </b>
                    </div>
                  ))}
                </article>
                <article className="report-card report-card-wide">
                  <strong>Completed sessions by service</strong>
                  {reports.sessions.map((item) => (
                    <div className="report-bar-row" key={item._id}>
                      <span>{item._id || "Unlabelled"}</span>
                      <div>
                        <i
                          style={{
                            width: `${reports.sessions[0]?.count ? (item.count / reports.sessions[0].count) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <b>{item.count}</b>
                    </div>
                  ))}
                </article>
                <article className="report-card report-card-wide">
                  <strong>Payment methods</strong>
                  {reports.payments.byMethod.map((item) => (
                    <div className="report-bar-row" key={item._id}>
                      <span>{item._id}</span>
                      <div>
                        <i
                          style={{
                            width: `${reports.payments.revenue ? (item.total / reports.payments.revenue) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <b>{money(item.total)}</b>
                    </div>
                  ))}
                  <small>
                    Outstanding: {money(reports.payments.unpaid.total)} across{" "}
                    {reports.payments.unpaid.count} appointments.
                  </small>
                </article>
              </div>
            </>
          )
        )}
      </section>
    </main>
  );
}
