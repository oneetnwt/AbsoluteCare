import { useEffect, useState } from "react";
import StaffPageHeader from "../../../components/staff/StaffPageHeader";
import {
  getTherapistSessions,
  updateTherapySession,
} from "../../../services/api/therapistApi";
import { showPromise } from "../../../utils/toast";

function SessionRecordsPage() {
  const [sessions, setSessions] = useState([]);
  const [editing, setEditing] = useState(null);
  function load() {
    getTherapistSessions()
      .then((response) => setSessions(response.data.sessions))
      .catch(() => setSessions([]));
  }
  useEffect(() => {
    load();
  }, []);
  async function save(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const request = updateTherapySession(editing._id, {
      sessionDate: form.get("sessionDate"),
      durationMinutes: form.get("durationMinutes"),
      notes: form.get("notes"),
    });
    showPromise(request, {
      loading: "Saving session record...",
      success: "Session record updated.",
      error: "Couldn't update the session record.",
    });
    try {
      await request;
      setEditing(null);
      load();
    } catch {
      return;
    }
  }
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-section staff-standalone-page">
        <StaffPageHeader
          eyebrow="Clinical records"
          title="Session records"
          description="Review and refine notes from your completed visits."
        />
        <div className="staff-table-shell">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Session date</th>
                <th>Service</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length ? (
                sessions.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.patient?.firstname} {item.patient?.lastname}
                    </td>
                    <td>
                      {new Date(item.sessionDate).toLocaleDateString("en-PH", {
                        dateStyle: "medium",
                        timeZone: "Asia/Manila",
                      })}
                    </td>
                    <td>{item.service?.name}</td>
                    <td>{item.durationMinutes} min</td>
                    <td>
                      <button
                        className="staff-table-link"
                        type="button"
                        onClick={() => setEditing(item)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <p className="staff-muted">No sessions recorded yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {editing && (
        <div className="therapist-modal-backdrop">
          <form className="therapist-modal" onSubmit={save}>
            <h2>Edit session</h2>
            <label>
              Session date
              <input
                name="sessionDate"
                type="date"
                defaultValue={editing.sessionDate.slice(0, 10)}
                max={new Date().toISOString().slice(0, 10)}
                required
              />
            </label>
            <label>
              Duration (minutes)
              <input
                name="durationMinutes"
                type="number"
                min="1"
                defaultValue={editing.durationMinutes}
                required
              />
            </label>
            <label>
              Notes
              <textarea
                name="notes"
                defaultValue={
                  editing.clinicalNotes || editing.patientVisibleNotes
                }
                rows="5"
              />
            </label>
            <div className="therapist-modal-actions">
              <button type="button" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button className="staff-section-primary" type="submit">
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
export default SessionRecordsPage;
