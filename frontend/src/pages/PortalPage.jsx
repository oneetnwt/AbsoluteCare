import { useState } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  History,
  ListChecks,
  Camera,
  Trash2,
  UserRound,
} from "lucide-react";
import { getStoredUser, setStoredUser } from "../auth/authStorage";
import EmptyState from "../components/EmptyState";
import PortalLayout from "../components/PortalLayout";
import { useToast } from "../context/ToastContext.js";

const roleConfig = {
  patient: {
    label: "Patient",
    intro: "Manage your visits and recovery details.",
    nav: [
      ["overview", "Overview", "01"],
      ["appointments", "Appointments", "02"],
      ["sessions", "Session history", "03"],
      ["notifications", "Notifications", "04"],
      ["profile", "My profile", "05"],
      ["calendar", "Calendar sync", "06"],
    ],
  },
  therapist: {
    label: "Therapist",
    intro: "Keep treatment planning and documentation in flow.",
    nav: [
      ["overview", "Overview", "01"],
      ["schedule", "Schedule manager", "02"],
      ["appointments", "Appointments", "03"],
      ["patients", "Assigned patients", "04"],
      ["sessions", "Session history", "05"],
      ["profile", "My profile", "06"],
      ["calendar", "Calendar sync", "07"],
    ],
  },
  admin: {
    label: "Admin",
    intro: "Coordinate people, services, and clinic operations.",
    nav: [
      ["overview", "Overview", "01"],
      ["users", "User accounts", "02"],
      ["therapists", "Therapist management", "03"],
      ["services", "Therapy services", "04"],
      ["appointments", "Appointments", "05"],
      ["reports", "Reports", "06"],
      ["notifications", "Notification triggers", "07"],
    ],
  },
  secretary: {
    label: "Secretary",
    intro: "Keep the front desk and clinic schedule aligned.",
    nav: [
      ["overview", "Overview", "01"],
      ["schedule", "Clinic schedule", "02"],
      ["appointments", "Appointments", "03"],
      ["profile", "My profile", "04"],
      ["calendar", "Calendar sync", "05"],
    ],
  },
};

const statusOptions = [
  "pending",
  "confirmed",
  "rescheduled",
  "completed",
  "cancelled",
  "no-show",
];

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold">
      <span>
        {label}
        {required && <span className="text-care-error"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="care-input"
      />
    </label>
  );
}

function Panel({ title, description, action, children }) {
  return (
    <section className="care-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-extrabold text-care-ink dark:text-care-night-ink">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-care-muted dark:text-care-night-muted">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function StatusBadge({ status }) {
  const tone =
    {
      pending:
        "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
      confirmed:
        "bg-care-green-100 text-care-green-800 dark:bg-care-green-900/40 dark:text-care-green-100",
      rescheduled:
        "bg-care-blue-100 text-care-blue-700 dark:bg-care-blue-900/40 dark:text-care-blue-100",
      completed:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
      cancelled:
        "bg-care-error-bg text-care-error dark:bg-rose-950/40 dark:text-rose-200",
      "no-show":
        "bg-care-error-bg text-care-error dark:bg-rose-950/40 dark:text-rose-200",
    }[status] ||
    "bg-care-canvas text-care-muted dark:bg-care-night-card dark:text-care-night-muted";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ${tone}`}
    >
      {status}
    </span>
  );
}

function MetricIcon({ type }) {
  const icons = {
    pending: ClipboardList,
    upcoming: CalendarDays,
    past: History,
  };
  const Icon = icons[type] || ClipboardList;
  return <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />;
}

function SchedulePlaceholder() {
  return (
    <div className="border border-dashed border-care-line bg-care-canvas/60 p-5 dark:border-care-night-line dark:bg-care-night-card/40">
      <div className="flex items-start gap-3">
        <CalendarClock
          className="mt-0.5 size-5 shrink-0 text-care-blue-700 dark:text-care-blue-500"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-bold text-care-ink dark:text-care-night-ink">
            No appointments scheduled yet
          </p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
            Connected appointment details, times, and preparation notes will
            appear here.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        {["Morning", "Afternoon", "Follow-up"].map((period) => (
          <div
            key={period}
            className="border border-care-line bg-white px-3 py-3 dark:border-care-night-line dark:bg-care-night-panel"
          >
            <p className="text-xs font-bold text-care-muted dark:text-care-night-muted">
              {period}
            </p>
            <p className="mt-2 text-sm font-bold text-care-ink dark:text-care-night-ink">
              No visits
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardOverview({ role, onSelect }) {
  const metrics =
    role === "patient"
      ? [
          ["Upcoming visits", "0", "Nothing scheduled", "upcoming"],
          ["Pending requests", "0", "No requests yet", "pending"],
          ["Completed visits", "0", "No visit history", "past"],
        ]
      : role === "therapist"
        ? [
            ["Today’s visits", "0", "No visits scheduled", "upcoming"],
            ["Open notes", "0", "Nothing to finish", "pending"],
            ["Assigned patients", "0", "No patients yet", "past"],
          ]
        : role === "admin"
          ? [
              ["Appointments", "0", "No appointments yet", "upcoming"],
              ["Patients", "0", "No patient records", "past"],
              ["Therapists", "0", "No therapist records", "pending"],
            ]
          : [
              ["Today’s visits", "0", "No visits scheduled", "upcoming"],
              ["Needs attention", "0", "Nothing to review", "pending"],
              ["Completed", "0", "No completed visits", "past"],
            ];
  const actions =
    role === "patient"
      ? [
          ["appointments", "Request an appointment", CalendarDays],
          ["profile", "Complete your profile", UserRound],
        ]
      : role === "therapist"
        ? [
            ["schedule", "Set working hours", CalendarClock],
            ["sessions", "Record a session", ListChecks],
          ]
        : role === "admin"
          ? [
              ["users", "Add a user", UserRound],
              ["services", "Add a service", ClipboardList],
            ]
          : [
              ["schedule", "Open clinic schedule", CalendarClock],
              ["appointments", "Find an appointment", CalendarDays],
            ];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {metrics.map(([label, value, detail, type]) => (
          <div key={label} className="care-card relative overflow-hidden p-5">
            <span
              className="absolute inset-y-0 left-0 w-1 bg-care-green-700 dark:bg-care-green-600"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-care-muted dark:text-care-night-muted">
                {label}
              </p>
              <span className="grid size-8 place-items-center rounded-lg bg-care-blue-50 text-care-blue-700 dark:bg-care-blue-900/30 dark:text-care-blue-100">
                <MetricIcon type={type} />
              </span>
            </div>
            <p className="mt-5 font-display text-3xl font-extrabold leading-none text-care-ink dark:text-care-night-ink">
              {value}
            </p>
            <p className="mt-2 text-xs text-care-muted dark:text-care-night-muted">
              {detail}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Panel
          title="Today’s schedule"
          description="Your next appointments and preparation details will appear here."
        >
          <SchedulePlaceholder />
        </Panel>
        <Panel
          title="Next actions"
          description="Go straight to the work that matters most."
        >
          <div className="grid gap-2">
            {actions.map(([view, label, Icon]) => (
              <button
                key={view}
                type="button"
                onClick={() => onSelect(view)}
                className="flex items-center gap-3 rounded-lg border border-care-line px-4 py-3 text-left text-sm font-bold text-care-ink transition-[background-color,border-color,color] hover:border-care-green-700 hover:bg-care-green-50 dark:border-care-night-line dark:text-care-night-ink dark:hover:border-care-green-600 dark:hover:bg-care-green-900/20"
              >
                <span className="grid size-8 place-items-center rounded-md bg-care-blue-50 text-care-blue-700 dark:bg-care-blue-900/30 dark:text-care-blue-100">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">{label}</span>
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-start gap-2 border-t border-care-line pt-4 text-xs leading-relaxed text-care-muted dark:border-care-night-line dark:text-care-night-muted">
            <CheckCircle2
              className="mt-0.5 size-4 shrink-0 text-care-green-700 dark:text-care-green-100"
              aria-hidden="true"
            />
            Your account is ready for connected scheduling data.
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Overview({ role, onSelect }) {
  return <DashboardOverview role={role} onSelect={onSelect} />;
}

function ProfileView({ role }) {
  const { showToast } = useToast();
  const storedUser = getStoredUser();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialization: "",
  });
  const [profileImage, setProfileImage] = useState(
    storedUser?.profileImage || "",
  );
  const [imageError, setImageError] = useState("");
  const [saved, setSaved] = useState(false);
  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setSaved(false);
  };
  const submit = (event) => {
    event.preventDefault();
    if (storedUser) {
      setStoredUser({ ...storedUser, profileImage });
    }
    setSaved(true);
    showToast("Profile changes are ready to sync.", "success");
  };
  const selectProfileImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Choose an image file, such as JPG or PNG.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageError("Choose an image smaller than 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
      setImageError("");
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };
  const removeProfileImage = () => {
    setProfileImage("");
    setImageError("");
    setSaved(false);
  };
  return (
    <Panel
      title="Profile"
      description="Keep your contact and professional details ready for connection."
    >
      <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-care-line pb-6 dark:border-care-night-line">
        <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-full border border-care-line bg-care-blue-50 text-care-blue-700 dark:border-care-night-line dark:bg-care-blue-900/30 dark:text-care-blue-100">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile preview"
              width="80"
              height="80"
              className="size-full object-cover"
            />
          ) : (
            <UserRound className="size-8" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold text-care-ink dark:text-care-night-ink">
            Profile picture
          </h3>
          <p className="mt-1 text-sm text-care-muted dark:text-care-night-muted">
            Add a recognizable image for your scheduling account.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <label
              htmlFor="profile-picture"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-care-line px-3 py-2 text-xs font-bold text-care-ink transition-[background-color,border-color] hover:border-care-green-700 hover:bg-care-green-50 dark:border-care-night-line dark:text-care-night-ink dark:hover:border-care-green-600 dark:hover:bg-care-green-900/20"
            >
              <Camera className="size-4" aria-hidden="true" />
              {profileImage ? "Replace picture" : "Choose picture"}
            </label>
            <input
              id="profile-picture"
              name="profileImage"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={selectProfileImage}
              aria-describedby="profile-picture-help"
              className="sr-only"
            />
            {profileImage && (
              <button
                type="button"
                onClick={removeProfileImage}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-care-error transition-colors hover:bg-care-error-bg"
              >
                <Trash2 className="size-4" aria-hidden="true" />
                Remove picture
              </button>
            )}
          </div>
          <p
            id="profile-picture-help"
            className="mt-2 text-xs text-care-muted dark:text-care-night-muted"
          >
            JPG, PNG, or WebP. Maximum 2 MB.
          </p>
          {imageError && (
            <p
              role="alert"
              className="mt-2 text-xs font-semibold text-care-error"
            >
              {imageError}
            </p>
          )}
        </div>
      </div>
      <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
        <Field
          label="First name"
          name="firstName"
          value={form.firstName}
          onChange={update}
          required
        />
        <Field
          label="Last name"
          name="lastName"
          value={form.lastName}
          onChange={update}
          required
        />
        <Field
          label="Email address"
          name="email"
          value={form.email}
          onChange={update}
          type="email"
          required
        />
        <Field
          label="Phone number"
          name="phone"
          value={form.phone}
          onChange={update}
          type="tel"
        />
        {(role === "therapist" || role === "admin") && (
          <Field
            label="Specialization"
            name="specialization"
            value={form.specialization}
            onChange={update}
            placeholder="Add specialization…"
          />
        )}
        <div className="flex items-center gap-3 sm:col-span-2">
          <button
            type="submit"
            className="rounded-xl bg-care-green-700 px-5 py-3 text-sm font-bold text-white hover:bg-care-green-800 dark:bg-care-green-600 dark:hover:bg-care-green-700"
          >
            Save profile
          </button>
          {saved && (
            <span
              role="status"
              className="text-sm font-semibold text-care-green-700 dark:text-care-green-100"
            >
              Profile ready to sync.
            </span>
          )}
        </div>
      </form>
    </Panel>
  );
}

function AppointmentRequest({ onDone }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    note: "",
  });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
    setSent(false);
  };
  const submit = (event) => {
    event.preventDefault();
    if (!form.service || !form.date || !form.time) {
      setError("Choose a service, preferred date, and preferred time.");
      return;
    }
    setSent(true);
    showToast("Appointment request is ready to send.", "success");
  };
  if (sent)
    return (
      <div className="rounded-2xl border border-care-green-700/20 bg-care-green-50 p-5 dark:border-care-green-600/30 dark:bg-care-green-900/20">
        <p className="font-bold text-care-green-800 dark:text-care-green-100">
          Request ready to send
        </p>
        <p className="mt-1 text-sm text-care-muted dark:text-care-night-muted">
          This frontend-only request is validated and ready to connect to an
          API.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            onDone();
          }}
          className="mt-4 text-sm font-bold text-care-blue-700 underline dark:text-care-blue-500"
        >
          View request list
        </button>
      </div>
    );
  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <label className="grid gap-1.5 text-sm font-semibold">
        <span>Therapy service</span>
        <select
          name="service"
          value={form.service}
          onChange={update}
          className="care-input"
        >
          <option value="">Select a service</option>
          <option value="evaluation">Physical therapy evaluation</option>
          <option value="follow-up">Follow-up treatment</option>
        </select>
      </label>
      <Field
        label="Preferred date"
        name="date"
        value={form.date}
        onChange={update}
        type="date"
      />
      <Field
        label="Preferred time"
        name="time"
        value={form.time}
        onChange={update}
        type="time"
      />
      <Field
        label="Note for the clinic"
        name="note"
        value={form.note}
        onChange={update}
        placeholder="Optional note…"
      />
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-xl bg-care-green-700 px-5 py-3 text-sm font-bold text-white hover:bg-care-green-800 dark:bg-care-green-600 dark:hover:bg-care-green-700"
        >
          Submit appointment request
        </button>
        {error && (
          <p className="mt-2 text-xs font-semibold text-care-error">{error}</p>
        )}
      </div>
    </form>
  );
}

function AppointmentsView({ role, onSelect }) {
  const [tab, setTab] = useState("pending");
  return (
    <div className="space-y-6">
      {role === "patient" && (
        <Panel
          title="Request an appointment"
          description="Choose a service and preferred time. The clinic will respond when connected."
        >
          <AppointmentRequest onDone={() => setTab("pending")} />
        </Panel>
      )}
      <Panel
        title={role === "secretary" ? "Clinic appointments" : "Appointments"}
        description="Filter and open appointment details when records are available."
      >
        <div
          className="mb-5 flex flex-wrap gap-2"
          aria-label="Appointment status legend"
        >
          {statusOptions.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
        <div
          className="mb-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Appointment status tabs"
        >
          {["pending", "upcoming", "past"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              role="tab"
              aria-selected={tab === item}
              className={`rounded-full px-4 py-2 text-sm font-bold capitalize ${tab === item ? "bg-care-green-700 text-white dark:bg-care-green-600" : "bg-care-canvas text-care-muted dark:bg-care-night-card dark:text-care-night-muted"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <EmptyState
          title={`No ${tab} appointments`}
          description="Appointment records will appear here after the scheduling service is connected."
          actionLabel={
            role === "patient" ? "Request an appointment" : undefined
          }
          onAction={
            role === "patient" ? () => onSelect("appointments") : undefined
          }
        />
      </Panel>
      {role === "patient" && (
        <div className="grid gap-6 xl:grid-cols-2">
          <Panel
            title="Assigned therapist"
            description="Your assigned clinician will appear here."
          >
            <EmptyState
              title="No therapist assigned"
              description="A therapist profile will appear after your request is reviewed."
            />
          </Panel>
          <Panel
            title="Appointment details"
            description="Select an appointment to see its full details."
          >
            <EmptyState
              title="No appointment selected"
              description="Visit type, time, location, and preparation details will appear here."
            />
          </Panel>
        </div>
      )}
      {role === "secretary" && (
        <Panel
          title="Find an appointment"
          description="Search the connected clinic schedule by patient or appointment."
        >
          <input
            name="appointmentSearch"
            className="care-input"
            placeholder="Search by patient or appointment…"
            autoComplete="off"
            aria-label="Search appointments"
          />
          <div className="mt-5">
            <EmptyState
              title="No appointment details"
              description="Select a connected appointment to open its details."
            />
          </div>
        </Panel>
      )}
      {(role === "therapist" || role === "admin") && (
        <AppointmentWorkflow role={role} />
      )}
    </div>
  );
}

function AppointmentWorkflow({ role }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ date: "", time: "", reason: "" });
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  };
  const submitReschedule = (event) => {
    event.preventDefault();
    if (!form.date || !form.time || !form.reason) {
      setMessage(
        "Choose a date, time, and reason before requesting a reschedule.",
      );
      return;
    }
    setMessage("Reschedule request ready to sync.");
    showToast("Reschedule request is ready to sync.", "success");
  };
  return (
    <Panel
      title={role === "admin" ? "Appointment workflow" : "Appointment actions"}
      description="Controls are ready for connected appointment records."
    >
      {role === "therapist" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={submitReschedule} className="space-y-4">
            <h3 className="font-display text-sm font-bold">
              Request a reschedule
            </h3>
            <Field
              label="Preferred date"
              name="date"
              value={form.date}
              onChange={update}
              type="date"
              required
            />
            <Field
              label="Preferred time"
              name="time"
              value={form.time}
              onChange={update}
              type="time"
              required
            />
            <Field
              label="Reason"
              name="reason"
              value={form.reason}
              onChange={update}
              placeholder="Add a short reason…"
              required
            />
            <button
              type="submit"
              className="rounded-xl bg-care-green-700 px-4 py-2.5 text-sm font-bold text-white dark:bg-care-green-600"
            >
              Request reschedule
            </button>
          </form>
          <div>
            <h3 className="font-display text-sm font-bold">Attendance</h3>
            <p className="mt-1 text-sm text-care-muted dark:text-care-night-muted">
              Choose this action when a connected appointment is open.
            </p>
            <button
              type="button"
              onClick={() => {
                setMessage("No-show action ready to sync.");
                showToast("No-show action is ready to sync.");
              }}
              className="mt-5 rounded-xl border border-care-error px-4 py-2.5 text-sm font-bold text-care-error"
            >
              Mark no-show
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <label className="grid max-w-sm gap-1.5 text-sm font-semibold">
            <span>Next appointment status</span>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="care-input"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              "Review",
              "Assign therapist",
              "Confirm",
              "Reschedule",
              "Cancel",
              "Mark completed",
              "Mark no-show",
            ].map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => {
                  const message = `${action} action ready to sync for ${selectedStatus} appointments.`;
                  setMessage(message);
                  showToast(message);
                }}
                className="rounded-xl border border-care-line px-3 py-2 text-sm font-bold text-care-ink hover:border-care-green-700 dark:border-care-night-line dark:text-care-night-ink"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}
      {message && (
        <p
          role="status"
          className="mt-5 rounded-xl bg-care-green-50 p-3 text-sm font-semibold text-care-green-800 dark:bg-care-green-900/30 dark:text-care-green-100"
        >
          {message}
        </p>
      )}
    </Panel>
  );
}

function ScheduleView({ role }) {
  const { showToast } = useToast();
  const [hours, setHours] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    start: "",
    end: "",
  });
  const [saved, setSaved] = useState(false);
  const update = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setHours({ ...hours, [event.target.name]: value });
    setSaved(false);
  };
  return (
    <Panel
      title={role === "secretary" ? "Clinic schedule" : "Schedule manager"}
      description="Set availability without creating appointments or records."
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
          showToast("Availability is ready to sync.", "success");
        }}
        className="space-y-6"
      >
        <div className="grid gap-3 sm:grid-cols-5">
          {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
            (day) => (
              <label
                key={day}
                className="flex items-center gap-2 rounded-xl border border-care-line px-3 py-3 text-sm font-semibold capitalize dark:border-care-night-line"
              >
                <input
                  type="checkbox"
                  name={day}
                  checked={hours[day]}
                  onChange={update}
                  className="size-4 accent-care-green-700"
                />
                {day}
              </label>
            ),
          )}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Opening time"
            name="start"
            value={hours.start}
            onChange={update}
            type="time"
          />
          <Field
            label="Closing time"
            name="end"
            value={hours.end}
            onChange={update}
            type="time"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-care-green-700 px-5 py-3 text-sm font-bold text-white dark:bg-care-green-600"
        >
          Save availability
        </button>
        {saved && (
          <span
            role="status"
            className="ml-3 text-sm font-semibold text-care-green-700 dark:text-care-green-100"
          >
            Availability ready to sync.
          </span>
        )}
      </form>
    </Panel>
  );
}

function SessionsView({ role }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ date: "", duration: "", notes: "" });
  const [saved, setSaved] = useState(false);
  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setSaved(false);
  };
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <Panel
        title="Session history"
        description="Past session records will appear here."
      >
        <EmptyState
          title="No sessions yet"
          description={
            role === "patient"
              ? "Your completed sessions will appear here."
              : "Record a session to begin a history."
          }
        />
      </Panel>
      {role === "therapist" ? (
        <Panel
          title="Record session"
          description="Capture a treatment note when the visit is complete."
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
              showToast("Session note is ready to sync.", "success");
            }}
            className="space-y-5"
          >
            <Field
              label="Session date"
              name="date"
              value={form.date}
              onChange={update}
              type="date"
              required
            />
            <Field
              label="Duration"
              name="duration"
              value={form.duration}
              onChange={update}
              placeholder="Minutes…"
              required
            />
            <label className="grid gap-1.5 text-sm font-semibold">
              <span>Session notes</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={update}
                rows="5"
                className="care-input resize-y"
              />
            </label>
            <button
              type="submit"
              className="rounded-xl bg-care-green-700 px-5 py-3 text-sm font-bold text-white dark:bg-care-green-600"
            >
              Save session details
            </button>
            {saved && (
              <p
                role="status"
                className="text-sm font-semibold text-care-green-700 dark:text-care-green-100"
              >
                Session note ready to sync.
              </p>
            )}
          </form>
        </Panel>
      ) : (
        <Panel
          title="Session details"
          description="Select a session to view full details."
        >
          <EmptyState
            title="Select a session"
            description="Detailed treatment notes will be available when a session is connected."
          />
        </Panel>
      )}
    </div>
  );
}

function AdminView({ view }) {
  const { showToast } = useToast();
  const [actionMessage, setActionMessage] = useState("");
  const titles = {
    users: "User accounts",
    therapists: "Therapist management",
    services: "Therapy services",
    reports: "Reports",
    notifications: "Notification triggers",
  };
  const actions =
    view === "users"
      ? [
          "Add user",
          "View",
          "Edit",
          "Archive",
          "Remove",
          "Activate",
          "Deactivate",
        ]
      : view === "therapists"
        ? [
            "Add therapist",
            "Edit specialization",
            "Set working hours",
            "Activate",
            "Deactivate",
          ]
        : view === "services"
          ? ["Add service", "Edit service", "Remove service"]
          : view === "notifications"
            ? ["New trigger", "Edit trigger", "Disable trigger"]
            : [];
  if (view === "reports")
    return (
      <div className="space-y-6">
        <Panel
          title="Clinic reporting"
          description="Cards and charts remain empty until reporting data is connected."
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Patient count",
              "Completed sessions",
              "Appointment stats",
              "Therapist workload",
            ].map((label) => (
              <div
                key={label}
                className="rounded-2xl border border-dashed border-care-line p-5 dark:border-care-night-line"
              >
                <p className="text-sm font-semibold text-care-muted dark:text-care-night-muted">
                  {label}
                </p>
                <p className="mt-5 font-display text-3xl font-extrabold">—</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="Clinic summary"
          description="A connected reporting feed will populate this area."
        >
          <EmptyState title="No report data yet" />
        </Panel>
      </div>
    );
  return (
    <Panel
      title={titles[view] || "Administration"}
      description="Search, filter, and manage records from the scheduling system."
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          className="care-input"
          name="recordSearch"
          placeholder="Search records…"
          autoComplete="off"
          aria-label="Search records"
        />
        <select
          name="recordStatus"
          className="care-input sm:max-w-48"
          aria-label="Filter records"
        >
          <option>All statuses</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => {
              const message = `${action} is ready to connect to the records API.`;
              setActionMessage(message);
              showToast(message);
            }}
            className="rounded-xl border border-care-line px-3 py-2 text-sm font-bold text-care-ink hover:border-care-green-700 dark:border-care-night-line dark:text-care-night-ink"
          >
            {action}
          </button>
        ))}
      </div>
      {actionMessage && (
        <p
          role="status"
          className="mb-5 rounded-xl bg-care-green-50 p-3 text-sm font-semibold text-care-green-800 dark:bg-care-green-900/30 dark:text-care-green-100"
        >
          {actionMessage}
        </p>
      )}
      <EmptyState
        title={`No ${titles[view]?.toLowerCase() || "records"} yet`}
        description="Scheduling records will appear here when live data is available."
      />
    </Panel>
  );
}

function PatientsView() {
  return (
    <Panel
      title="Assigned patients"
      description="Patient profiles and care details will appear here."
    >
      <EmptyState
        title="No assigned patients"
        description="Assigned patient records will be available when your clinic data is connected."
      />
    </Panel>
  );
}
function NotificationsView() {
  return (
    <Panel
      title="Notifications"
      description="Confirmations, reschedules, cancellations, and reminders will appear here."
    >
      <EmptyState title="No notifications yet" />
    </Panel>
  );
}
function CalendarView() {
  return (
    <Panel
      title="Google Calendar sync"
      description="Connect your calendar when the integration is ready."
    >
      <div className="rounded-2xl border border-care-blue-700/20 bg-care-blue-50 p-6 dark:border-care-blue-500/30 dark:bg-care-blue-900/20">
        <p className="font-bold text-care-blue-700 dark:text-care-blue-100">
          Calendar integration placeholder
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
          This space is ready for OAuth connection, permission status, and sync
          controls. No calendar data is loaded.
        </p>
        <button
          type="button"
          className="mt-5 rounded-xl border border-care-blue-700 px-4 py-2.5 text-sm font-bold text-care-blue-700 dark:border-care-blue-500 dark:text-care-blue-100"
        >
          Connect Google Calendar
        </button>
      </div>
    </Panel>
  );
}

function PortalPage({ role, onNavigate, onLogout }) {
  const config = roleConfig[role] || roleConfig.patient;
  const navItems = config.nav.map(([id, label, shortLabel]) => ({
    id,
    label,
    shortLabel,
  }));
  const [activeView, setActiveView] = useState("overview");
  const content =
    activeView === "overview" ? (
      <Overview role={role} onSelect={setActiveView} />
    ) : activeView === "profile" ? (
      <ProfileView role={role} />
    ) : activeView === "appointments" ? (
      <AppointmentsView role={role} onSelect={setActiveView} />
    ) : activeView === "schedule" ? (
      <ScheduleView role={role} />
    ) : activeView === "sessions" ? (
      <SessionsView role={role} />
    ) : activeView === "patients" ? (
      <PatientsView />
    ) : activeView === "notifications" ? (
      <NotificationsView />
    ) : activeView === "calendar" ? (
      <CalendarView />
    ) : role === "admin" ? (
      <AdminView view={activeView} />
    ) : (
      <EmptyState title="No data yet" />
    );
  return (
    <PortalLayout
      role={role}
      roleLabel={config.label}
      navItems={navItems}
      activeView={activeView}
      onSelect={setActiveView}
      onExit={onLogout || (() => onNavigate("/"))}
    >
      <div className="mb-8">
        <p className="text-sm font-bold text-care-green-700 dark:text-care-green-100">
          {config.label} dashboard
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-care-ink dark:text-care-night-ink">
          {config.intro}
        </h2>
        <p className="mt-2 text-sm text-care-muted dark:text-care-night-muted">
          Your scheduling data will appear here once it is connected.
        </p>
      </div>
      <div key={activeView} className="care-dashboard-view">
        {content}
      </div>
    </PortalLayout>
  );
}

export default PortalPage;
