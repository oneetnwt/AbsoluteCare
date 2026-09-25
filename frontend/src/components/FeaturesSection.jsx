import { useState } from "react";

const features = [
  {
    id: "booking",
    icon: "🗓️",
    title: "Easy self-serve booking",
    tagline: "Keep the front desk moving",
    description:
      "Give patients a live view of availability and let them choose the right visit without a phone call. Set appointment lengths, buffers, and clinic hours once.",
    highlights: [
      "Real-time calendar sync",
      "Custom treatment buffers",
      "Patient self-scheduling",
      "Timezone auto-conversion",
    ],
    preview: {
      type: "booking",
      title: "Therapist schedule buffer",
      detail: "50-minute treatment + 10-minute documentation buffer",
    },
  },
  {
    id: "messaging",
    icon: "🔐",
    title: "Secure patient updates",
    tagline: "Keep recovery plans in context",
    description:
      "Share appointment details, home exercise reminders, and care instructions in a protected channel that keeps sensitive information out of ordinary email.",
    highlights: [
      "Protected care messages",
      "Intake file sharing",
      "Read receipts & status",
      "No PHI in email",
    ],
    preview: {
      type: "messaging",
      title: "Encrypted Care Conversation",
      detail: "Protected Health Information (PHI) encrypted end-to-end",
    },
  },
  {
    id: "reminders",
    icon: "🔔",
    title: "Helpful appointment reminders",
    tagline: "Make every visit easier to keep",
    description:
      "Send clear SMS and email reminders before each visit. Patients can confirm or request a new time in one tap, while your team keeps the schedule accurate.",
    highlights: [
      "SMS and email templates",
      "One-tap confirmation",
      "Reschedule policy controls",
      "Time-zone aware timing",
    ],
    preview: {
      type: "reminders",
      title: "Automated SMS Nudge",
      detail:
        "“Hi Alex, your physical therapy visit is tomorrow at 3:30 PM. Reply 1 to confirm.”",
    },
  },
  {
    id: "insurance",
    icon: "📋",
    title: "Ready-to-go intake",
    tagline: "Start treatment with context",
    description:
      "Collect insurance details, medical history, and consent forms before the first visit so your therapist can spend more time assessing movement and less time on paperwork.",
    highlights: [
      "Insurance card capture",
      "Custom intake forms",
      "Digital consent signatures",
      "Medical history intake",
    ],
    preview: {
      type: "insurance",
      title: "Pre-Session Intake Status",
      detail: "Consent Form ✓ | Insurance Card Uploaded ✓ | Medical History ✓",
    },
  },
  {
    id: "telehealth",
    icon: "🎥",
    title: "Progress notes in flow",
    tagline: "Capture the work while it is fresh",
    description:
      "Open each visit with the relevant patient context and finish with structured treatment notes, goals, and next steps in the same workspace.",
    highlights: [
      "Treatment note templates",
      "Goal tracking",
      "Session duration tracker",
      "Private clinician workspace",
    ],
    preview: {
      type: "telehealth",
      title: "Encrypted Telehealth Room",
      detail: "No software download needed • Secure Peer-to-Peer Video",
    },
  },
];

function FeaturesSection() {
  const [activeFeatureId, setActiveFeatureId] = useState("booking");
  const activeFeature =
    features.find((f) => f.id === activeFeatureId) || features[0];

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-care-green-700 dark:text-care-green-100">
            Everything In One Thoughtful Place
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-care-ink dark:text-care-night-ink sm:text-4xl lg:text-5xl">
            The practical side of care, made lighter.
          </h2>
          <p className="mt-4 text-lg text-care-muted dark:text-care-night-muted">
            One calm system for the people who schedule care and the people who
            receive it.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="mt-12 flex items-center justify-start gap-2 overflow-x-auto pb-4 pt-1 sm:justify-center">
          {features.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFeatureId(f.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                activeFeatureId === f.id
                  ? "bg-care-green-700 text-white shadow-md dark:bg-care-green-600"
                  : "border border-care-line bg-white/70 text-care-muted hover:border-care-green-700 hover:text-care-ink dark:border-care-night-line dark:bg-care-night-panel dark:text-care-night-muted dark:hover:text-care-night-ink"
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.title}</span>
            </button>
          ))}
        </div>

        {/* Active Feature Display Card */}
        <div className="mt-8 rounded-3xl border border-care-line bg-white p-8 shadow-xl dark:border-care-night-line dark:bg-care-night-panel lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Feature Info */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-care-blue-700 dark:text-care-blue-500">
                {activeFeature.tagline}
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold text-care-ink dark:text-care-night-ink">
                {activeFeature.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-care-muted dark:text-care-night-muted">
                {activeFeature.description}
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activeFeature.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-semibold text-care-ink dark:text-care-night-ink"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-care-green-100 text-xs font-bold text-care-green-700 dark:bg-care-green-900 dark:text-care-green-100">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature Mock Interactive Illustration */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-care-line bg-care-canvas p-6 shadow-inner dark:border-care-night-line dark:bg-care-night-card">
                <div className="flex items-center justify-between border-b border-care-line pb-4 dark:border-care-night-line">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-care-green-700 dark:bg-care-green-100" />
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-care-muted dark:text-care-night-muted">
                      {activeFeature.preview.title}
                    </span>
                  </div>
                  <span className="rounded-full bg-care-green-100 px-2.5 py-0.5 text-[11px] font-bold text-care-green-700 dark:bg-care-green-900 dark:text-care-green-100">
                    Active Module
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-care-line bg-white p-5 shadow-sm dark:border-care-night-line dark:bg-care-night-panel">
                    <p className="text-xs font-semibold text-care-muted dark:text-care-night-muted">
                      Feature Context
                    </p>
                    <p className="mt-1 font-display text-base font-bold text-care-ink dark:text-care-night-ink">
                      {activeFeature.preview.detail}
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-care-green-900/10 p-4 text-xs font-semibold text-care-green-800 dark:bg-care-green-900/40 dark:text-care-green-100">
                    <span>🛡️ HIPAA Technical Safeguard Compliant</span>
                    <span>Audit Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Steps */}
        <div id="how-it-works" className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-care-green-700 dark:text-care-green-100">
              Simple 3-Step Setup
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-care-ink dark:text-care-night-ink sm:text-3xl">
              How AbsoluteCare fits into your day
            </h3>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-care-line bg-white p-6 dark:border-care-night-line dark:bg-care-night-card">
              <span className="grid size-10 place-items-center rounded-xl bg-care-green-100 font-display text-lg font-bold text-care-green-700 dark:bg-care-green-900 dark:text-care-green-100">
                1
              </span>
              <h4 className="mt-4 font-display text-lg font-bold text-care-ink dark:text-care-night-ink">
                Set Your Practice Hours
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
                Connect your calendar, set your available booking windows, and
                define custom buffer times between appointments.
              </p>
            </div>

            <div className="rounded-2xl border border-care-line bg-white p-6 dark:border-care-night-line dark:bg-care-night-card">
              <span className="grid size-10 place-items-center rounded-xl bg-care-blue-100 font-display text-lg font-bold text-care-blue-700 dark:bg-care-blue-900/60 dark:text-care-blue-500">
                2
              </span>
              <h4 className="mt-4 font-display text-lg font-bold text-care-ink dark:text-care-night-ink">
                Share Your Booking Link
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
                Send your booking link or add it to your website. Patients
                choose a slot, complete intake details, and confirm.
              </p>
            </div>

            <div className="rounded-2xl border border-care-line bg-white p-6 dark:border-care-night-line dark:bg-care-night-card">
              <span className="grid size-10 place-items-center rounded-xl bg-care-green-100 font-display text-lg font-bold text-care-green-700 dark:bg-care-green-900 dark:text-care-green-100">
                3
              </span>
              <h4 className="mt-4 font-display text-lg font-bold text-care-ink dark:text-care-night-ink">
                Focus Fully On Care
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
                Reminders handle attendance, intake details arrive pre-visit,
                and your team can focus on treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
