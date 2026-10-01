import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StatusBadge } from "../../../components/dashboard/DashboardPrimitives";
import StaffPageHeader from "../../../components/staff/StaffPageHeader";
import {
  createTherapySession,
  getTherapistAppointment,
  markAppointmentNoShow,
  requestTherapistReschedule,
} from "../../../services/api/therapistApi";
import { showPromise } from "../../../utils/toast";

function AppointmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [mode, setMode] = useState("");
  useEffect(() => {
    getTherapistAppointment(id)
      .then((response) => setAppointment(response.data.appointment))
      .catch(() => navigate("/staff/therapist/my-appointments"));
  }, [id, navigate]);
  if (!appointment)
    return (
      <main className="staff-dashboard-content">
        <p className="staff-muted">Loading appointment...</p>
      </main>
    );
  const canAct =
    ["pending", "confirmed"].includes(appointment.status) &&
    new Date(appointment.scheduledStart || 0) > new Date();
  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    let request;
    let messages;
    if (mode === "reschedule") {
      request = requestTherapistReschedule(id, data);
      messages = {
        loading: "Submitting reschedule request...",
        success: "Reschedule request sent.",
        error: "Couldn't submit the reschedule request.",
      };
    }
    if (mode === "session") {
      request = createTherapySession(id, {
        ...data,
        durationMinutes: Number(data.durationMinutes),
        notes: data.notes,
      });
      messages = {
        loading: "Recording therapy session...",
        success: "Therapy session recorded.",
        error: "Couldn't record the therapy session.",
      };
    }
    if (mode === "no-show") {
      request = markAppointmentNoShow(id);
      messages = {
        loading: "Marking appointment as no-show...",
        success: "Appointment marked as no-show.",
        error: "Couldn't mark the appointment as no-show.",
      };
    }
    showPromise(request, messages);
    try {
      await request;
      const response = await getTherapistAppointment(id);
      setAppointment(response.data.appointment);
      setMode("");
    } catch {
      return;
    }
  }
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-section staff-standalone-page">
        <StaffPageHeader
          eyebrow="Appointment details"
          title={`${appointment.patient?.firstname} ${appointment.patient?.lastname}`}
          description={appointment.service?.name}
        />
        <div className="therapist-detail-grid">
          <div>
            <span>Date and time</span>
            <strong>
              {appointment.scheduledStart
                ? new Date(appointment.scheduledStart).toLocaleString("en-PH", {
                    dateStyle: "full",
                    timeStyle: "short",
                    timeZone: "Asia/Manila",
                  })
                : `${appointment.requestedDate} ${appointment.requestedTime}`}
            </strong>
          </div>
          <div>
            <span>Status</span>
            <StatusBadge status={appointment.status.replace("_", "-")} />
          </div>
          <div>
            <span>Duration</span>
            <strong>{appointment.service?.duration || "-"} minutes</strong>
          </div>
          <div>
            <span>Patient email</span>
            <strong>{appointment.patient?.email}</strong>
          </div>
        </div>
        <div className="therapist-action-row">
          {canAct && (
            <button type="button" onClick={() => setMode("reschedule")}>
              Request reschedule
            </button>
          )}
          {appointment.status === "confirmed" &&
            new Date(appointment.scheduledStart) <= new Date() && (
              <>
                <button type="button" onClick={() => setMode("session")}>
                  Record session
                </button>
                <button type="button" onClick={() => setMode("no-show")}>
                  Mark no-show
                </button>
              </>
            )}
        </div>
      </section>
      {mode && (
        <div className="therapist-modal-backdrop">
          <form className="therapist-modal" onSubmit={submit}>
            <h2>
              {mode === "reschedule"
                ? "Request a new time"
                : mode === "session"
                  ? "Record therapy session"
                  : "Mark no-show"}
            </h2>
            {mode === "reschedule" && (
              <>
                <label>
                  Proposed date
                  <input
                    name="proposedDate"
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    required
                  />
                </label>
                <label>
                  Proposed time
                  <input name="proposedTime" type="time" required />
                </label>
                <label>
                  Reason
                  <textarea name="reason" rows="4" />
                </label>
              </>
            )}
            {mode === "session" && (
              <>
                <label>
                  Session date
                  <input
                    name="sessionDate"
                    type="date"
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
                    required
                  />
                </label>
                <label>
                  Notes
                  <textarea name="notes" rows="5" />
                </label>
              </>
            )}
            {mode === "no-show" && (
              <p>
                This will close the appointment as a no-show. The action cannot
                be undone by a therapist.
              </p>
            )}
            <div className="therapist-modal-actions">
              <button type="button" onClick={() => setMode("")}>
                Cancel
              </button>
              <button className="staff-section-primary" type="submit">
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
export default AppointmentDetailsPage;
