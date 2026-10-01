import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { StatusBadge } from "../../../components/dashboard/DashboardPrimitives";
import StaffPageHeader from "../../../components/staff/StaffPageHeader";
import { getTherapistAppointments } from "../../../services/api/therapistApi";

function MyAppointmentsPage() {
  const { assignedAppointments, appointmentsLoading } = useOutletContext();
  const [tab, setTab] = useState("");
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    if (tab === "") return;
    getTherapistAppointments(tab)
      .then((response) => setAppointments(response.data.appointments))
      .catch(() => setAppointments([]));
  }, [assignedAppointments, tab]);
  const visibleAppointments =
    tab === "" ? assignedAppointments || [] : appointments;
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-section staff-standalone-page">
        <StaffPageHeader
          eyebrow="My care desk"
          title="My appointments"
          description="Review your assigned visits and next actions."
        />
        <div className="therapist-tabs">
          {[
            ["", "Assigned / all"],
            ["upcoming", "Upcoming"],
            ["previous", "Previous"],
          ].map(([value, label]) => (
            <button
              className={tab === value ? "is-active" : ""}
              key={value}
              type="button"
              onClick={() => setTab(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="staff-table-shell">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Date & time</th>
                <th>Patient</th>
                <th>Service</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsLoading && tab === "" ? (
                <tr>
                  <td colSpan="5">
                    <p className="staff-muted">Loading appointments...</p>
                  </td>
                </tr>
              ) : visibleAppointments.length ? (
                visibleAppointments.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.scheduledStart
                        ? new Date(item.scheduledStart).toLocaleString(
                            "en-PH",
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                              timeZone: "Asia/Manila",
                            },
                          )
                        : `${item.requestedDate} ${item.requestedTime}`}
                    </td>
                    <td>
                      {item.patient?.firstname} {item.patient?.lastname}
                    </td>
                    <td>{item.service?.name}</td>
                    <td>
                      <StatusBadge status={item.status.replace("_", "-")} />
                    </td>
                    <td>
                      <Link
                        className="staff-table-link"
                        to={`/staff/therapist/appointments/${item._id}`}
                      >
                        View details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <p className="staff-muted">No appointments in this view.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
export default MyAppointmentsPage;
