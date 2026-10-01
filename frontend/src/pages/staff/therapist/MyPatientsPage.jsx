import { useEffect, useState } from "react";
import StaffPageHeader from "../../../components/staff/StaffPageHeader";
import { getTherapistPatients } from "../../../services/api/therapistApi";

function MyPatientsPage() {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    getTherapistPatients()
      .then((response) => setPatients(response.data.patients))
      .catch(() => setPatients([]));
  }, []);
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-section staff-standalone-page">
        <StaffPageHeader
          eyebrow="Care relationships"
          title="My patients"
          description="People assigned to your care, with their next touchpoint."
        />
        <div className="staff-table-shell">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Next appointment</th>
                <th>Last session</th>
              </tr>
            </thead>
            <tbody>
              {patients.length ? (
                patients.map(
                  ({ patient, nextAppointment, lastSessionDate }) => (
                    <tr key={patient._id}>
                      <td>
                        <strong>
                          {patient.firstname} {patient.lastname}
                        </strong>
                        <small>{patient.email}</small>
                      </td>
                      <td>
                        {nextAppointment?.scheduledStart
                          ? new Date(
                              nextAppointment.scheduledStart,
                            ).toLocaleString("en-PH", {
                              dateStyle: "medium",
                              timeStyle: "short",
                              timeZone: "Asia/Manila",
                            })
                          : "None scheduled"}
                      </td>
                      <td>
                        {lastSessionDate
                          ? new Date(lastSessionDate).toLocaleDateString(
                              "en-PH",
                              { dateStyle: "medium", timeZone: "Asia/Manila" },
                            )
                          : "No session yet"}
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td colSpan="3">
                    <p className="staff-muted">No patients assigned yet.</p>
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
export default MyPatientsPage;
