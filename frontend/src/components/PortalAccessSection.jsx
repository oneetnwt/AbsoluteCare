const portals = [
  {
    role: "patient",
    label: "Patient portal",
    description:
      "Request visits, review care details, and manage your profile.",
  },
  {
    role: "therapist",
    label: "Therapist portal",
    description:
      "Shape availability, appointments, patients, and session notes.",
  },
  {
    role: "admin",
    label: "Admin portal",
    description: "Manage clinic access, services, appointments, and reports.",
  },
  {
    role: "secretary",
    label: "Secretary portal",
    description: "Keep the front desk schedule easy to find and update.",
  },
];

function PortalAccessSection({ onNavigate }) {
  return (
    <section
      className="border-y border-care-line bg-care-canvas py-16 dark:border-care-night-line dark:bg-care-night-panel/50"
      aria-labelledby="portal-access-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-care-green-700 dark:text-care-green-100">
            Four connected workspaces
          </p>
          <h2
            id="portal-access-title"
            className="mt-2 font-display text-3xl font-extrabold tracking-tight text-care-ink dark:text-care-night-ink sm:text-4xl"
          >
            The right view for every part of care.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-care-muted dark:text-care-night-muted">
            Choose a workspace to preview the frontend-only flow. Each starts
            empty and is ready for live clinic data.
          </p>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portals.map((portal) => (
            <article
              key={portal.role}
              className="care-card flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-care-green-100 text-sm font-extrabold text-care-green-800 dark:bg-care-green-900/40 dark:text-care-green-100">
                  {portal.label.slice(0, 1)}
                </span>
                <span className="text-xs font-semibold text-care-muted dark:text-care-night-muted">
                  {portal.role}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-care-ink dark:text-care-night-ink">
                {portal.label}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
                {portal.description}
              </p>
              <button
                type="button"
                onClick={() => onNavigate(`/login/${portal.role}`)}
                className="mt-5 text-left text-sm font-bold text-care-blue-700 underline decoration-1 underline-offset-4 dark:text-care-blue-500"
              >
                Open portal
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortalAccessSection;
