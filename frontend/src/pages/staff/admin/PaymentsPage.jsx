import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import Skeleton from "../../../components/dashboard/Skeleton";
import StaffPageHeader from "../../../components/staff/StaffPageHeader";
import {
  exportAdminPayments,
  getAdminPayments,
  recordAdminPayment,
  updateAdminPayment,
} from "../../../services/api/adminMonitoringApi";
import { getToastError, showError, showPromise } from "../../../utils/toast";

function PaymentModal({ appointment, onClose, onSaved }) {
  const [status, setStatus] = useState(appointment.payment?.status || "unpaid");
  const [form, setForm] = useState({
    amount:
      appointment.payment?.amount ||
      appointment.service?.fee ||
      appointment.serviceSnapshot?.fee ||
      0,
    method: appointment.payment?.method || "cash",
    referenceNumber: "",
    reason: "",
  });
  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  async function submit(event) {
    event.preventDefault();
    const request =
      status === "paid" && appointment.payment?.status !== "paid"
        ? recordAdminPayment(appointment._id, form)
        : updateAdminPayment(appointment._id, { ...form, status });
    showPromise(request, {
      loading: "Updating payment...",
      success:
        status === "paid" ? "Payment marked paid." : "Payment marked unpaid.",
      error: "Unable to update payment.",
    });
    try {
      const response = await request;
      onSaved(response.data.appointment);
      onClose();
    } catch {
      return;
    }
  }
  return (
    <div
      className="staff-modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="staff-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-title"
      >
        <div className="staff-modal-header">
          <h2 id="payment-title">Update payment</h2>
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <form className="admin-user-form" onSubmit={submit}>
          <label>
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </label>
          {status === "paid" ? (
            <>
              <label>
                Amount (₱)
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.amount}
                  onChange={(event) => update("amount", event.target.value)}
                  required
                />
              </label>
              <label>
                Payment method
                <select
                  value={form.method}
                  onChange={(event) => update("method", event.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="gcash">GCash</option>
                  <option value="card">Card</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Reference number
                <input
                  value={form.referenceNumber}
                  onChange={(event) =>
                    update("referenceNumber", event.target.value)
                  }
                />
              </label>
            </>
          ) : (
            <label>
              Reason
              <textarea
                rows="3"
                value={form.reason}
                onChange={(event) => update("reason", event.target.value)}
                required
              />
            </label>
          )}
          <div className="profile-edit-actions">
            <button
              className="profile-cancel-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="staff-section-primary" type="submit">
              Save payment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function PaymentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    from: "",
    to: "",
  });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const load = () =>
    getAdminPayments(filters)
      .then((response) => setAppointments(response.data.appointments))
      .catch((error) =>
        showError(getToastError(error, "Unable to load payments.")),
      )
      .finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, [filters]);
  const paid = appointments.filter((item) => item.payment?.status === "paid");
  const outstanding = appointments
    .filter((item) => item.payment?.status !== "paid")
    .reduce(
      (sum, item) =>
        sum +
        Number(
          item.payment?.amount ||
            item.serviceSnapshot?.fee ||
            item.service?.fee ||
            0,
        ),
      0,
    );
  async function exportCsv() {
    const response = await exportAdminPayments(filters);
    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "absolutecare-payments.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <main className="staff-dashboard-content">
      <section className="staff-dashboard-section staff-standalone-page">
        <StaffPageHeader
          eyebrow="Finance"
          title="Payments"
          description="Monitor clinic-wide collections and outstanding balances."
          action={
            <button
              className="staff-section-primary"
              type="button"
              onClick={exportCsv}
            >
              <Download size={15} />
              Export CSV
            </button>
          }
        />
        <div className="report-grid">
          <article className="report-card">
            <strong>Collected in view</strong>
            <span>
              ₱
              {paid
                .reduce(
                  (sum, item) => sum + Number(item.payment.amount || 0),
                  0,
                )
                .toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </span>
          </article>
          <article className="report-card">
            <strong>Outstanding</strong>
            <span>
              ₱
              {outstanding.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
              })}
            </span>
          </article>
          <article className="report-card">
            <strong>Unpaid appointments</strong>
            <span>{appointments.length - paid.length}</span>
          </article>
        </div>
        <div className="user-management-toolbar">
          <label className="user-search">
            <span className="sr-only">Search payments</span>
            <input
              placeholder="Search patient, therapist, or service"
              value={filters.search}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  search: event.target.value,
                }))
              }
            />
          </label>
          <select
            aria-label="Payment status"
            value={filters.status}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                status: event.target.value,
              }))
            }
          >
            <option value="all">All statuses</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <label className="compact-date-filter">
            From
            <input
              type="date"
              value={filters.from}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  from: event.target.value,
                }))
              }
            />
          </label>
          <label className="compact-date-filter">
            To
            <input
              type="date"
              value={filters.to}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  to: event.target.value,
                }))
              }
            />
          </label>
        </div>
        {loading ? (
          <div className="staff-loading-block">
            <Skeleton variant="text" width="100%" height="46px" />
            <Skeleton variant="text" width="100%" height="46px" />
          </div>
        ) : (
          <div className="appointment-table-wrap">
            <table className="appointment-admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Patient</th>
                  <th>Therapist</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.scheduledStart
                        ? new Date(item.scheduledStart).toLocaleDateString(
                            "en-PH",
                            { timeZone: "Asia/Manila" },
                          )
                        : "Not scheduled"}
                    </td>
                    <td>
                      {item.patient?.firstname} {item.patient?.lastname}
                    </td>
                    <td>
                      {item.therapist
                        ? `${item.therapist.firstname} ${item.therapist.lastname}`
                        : "Unassigned"}
                    </td>
                    <td>
                      ₱
                      {Number(
                        item.payment?.amount ||
                          item.serviceSnapshot?.fee ||
                          item.service?.fee ||
                          0,
                      ).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <span
                        className={`dashboard-status-badge status-${item.payment?.status === "paid" ? "confirmed" : "pending"}`}
                      >
                        {item.payment?.status === "paid" ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td>
                      <button type="button" onClick={() => setSelected(item)}>
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {selected && (
        <PaymentModal
          appointment={selected}
          onClose={() => setSelected(null)}
          onSaved={(appointment) =>
            setAppointments((current) =>
              current.map((item) =>
                item._id === appointment._id ? appointment : item,
              ),
            )
          }
        />
      )}
    </main>
  );
}
