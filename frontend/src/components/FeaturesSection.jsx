import { useState } from "react";
import {
  BellRing,
  CalendarClock,
  Check,
  ClipboardCheck,
  FileText,
  LockKeyhole,
  MessageSquareText,
  NotebookPen,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const features = [
  {
    id: "schedule",
    icon: CalendarClock,
    title: "A schedule people can trust",
    description:
      "Set clinic hours, treatment buffers, and availability once. Patients see the right options without a call to the front desk.",
    points: [
      "Self-serve booking",
      "Calendar-aware availability",
      "Reschedule controls",
    ],
  },
  {
    id: "intake",
    icon: ClipboardCheck,
    title: "Ready before the visit",
    description:
      "Collect the details your team needs before the patient arrives, so the appointment starts with context instead of paperwork.",
    points: [
      "Digital intake forms",
      "Insurance and consent capture",
      "Private patient records",
    ],
  },
  {
    id: "follow-up",
    icon: BellRing,
    title: "Follow-up that stays human",
    description:
      "Keep reminders, confirmations, home instructions, and next steps in a clear flow that respects the relationship.",
    points: ["Helpful reminders", "Protected care updates", "Clear next steps"],
  },
];

function FeaturesSection() {
  const [activeId, setActiveId] = useState("schedule");
  const activeFeature =
    features.find((feature) => feature.id === activeId) || features[0];
  const ActiveIcon = activeFeature.icon;

  return (
    <section
      id="features"
      className="bg-white py-20 dark:bg-care-night lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="max-w-md">
            <p className="text-sm font-bold text-care-green-700 dark:text-care-green-100">
              The work around the work
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight text-care-ink text-balance dark:text-care-night-ink sm:text-5xl">
              A lighter day for every person in the room.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-care-muted dark:text-care-night-muted">
              The small moments add up: one fewer call, one complete intake, one
              patient who knows what happens next.
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-care-line pt-5 text-sm font-semibold text-care-muted dark:border-care-night-line dark:text-care-night-muted">
              <UsersRound
                className="size-5 text-care-blue-700 dark:text-care-blue-500"
                aria-hidden="true"
              />{" "}
              Built for clinics and the people they serve
            </div>
          </div>
          <div>
            <div className="grid gap-2 border-b border-care-line pb-3 dark:border-care-night-line sm:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setActiveId(feature.id)}
                    className={`flex items-center gap-3 border-b-2 px-2 py-3 text-left text-sm font-bold transition-[border-color,color] ${activeId === feature.id ? "border-care-green-700 text-care-green-700 dark:border-care-green-600 dark:text-care-green-100" : "border-transparent text-care-muted hover:text-care-ink dark:text-care-night-muted dark:hover:text-care-night-ink"}`}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span>{feature.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_0.8fr]">
              <div>
                <div className="grid size-12 place-items-center rounded-lg bg-care-green-100 text-care-green-700 dark:bg-care-green-900/40 dark:text-care-green-100">
                  <ActiveIcon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-care-ink dark:text-care-night-ink">
                  {activeFeature.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-care-muted dark:text-care-night-muted">
                  {activeFeature.description}
                </p>
                <ul className="mt-6 grid gap-3">
                  {activeFeature.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm font-semibold text-care-ink dark:text-care-night-ink"
                    >
                      <Check
                        className="size-4 text-care-green-700 dark:text-care-green-100"
                        aria-hidden="true"
                      />{" "}
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-care-line bg-care-canvas p-5 dark:border-care-night-line dark:bg-care-night-panel">
                <div className="flex items-center justify-between border-b border-care-line pb-4 dark:border-care-night-line">
                  <span className="flex items-center gap-2 text-xs font-bold text-care-muted dark:text-care-night-muted">
                    <LockKeyhole className="size-4" aria-hidden="true" />{" "}
                    Protected records
                  </span>
                  <ShieldCheck
                    className="size-4 text-care-green-700 dark:text-care-green-100"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex gap-3">
                    <MessageSquareText
                      className="size-5 shrink-0 text-care-blue-700 dark:text-care-blue-500"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-bold text-care-ink dark:text-care-night-ink">
                        Clear patient updates
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-care-muted dark:text-care-night-muted">
                        One place for the details that keep care moving.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FileText
                      className="size-5 shrink-0 text-care-blue-700 dark:text-care-blue-500"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-bold text-care-ink dark:text-care-night-ink">
                        Notes with context
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-care-muted dark:text-care-night-muted">
                        Relevant information is ready when the visit begins.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="how-it-works"
          className="mt-24 border-t border-care-line pt-16 dark:border-care-night-line"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-care-blue-700 dark:text-care-blue-500">
              How it works
            </p>
            <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-care-ink text-balance dark:text-care-night-ink sm:text-4xl">
              From first booking to next steps, the handoff stays clear.
            </h3>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: CalendarClock,
                title: "Shape availability",
                text: "Set hours and buffers that reflect how your clinic actually works.",
              },
              {
                icon: NotebookPen,
                title: "Collect context",
                text: "Patients complete the essentials before the appointment starts.",
              },
              {
                icon: ClipboardCheck,
                title: "Keep care moving",
                text: "Reminders and notes make the next action easy to find.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="border-l-2 border-care-green-700 pl-5 dark:border-care-green-600"
              >
                <Icon
                  className="size-6 text-care-green-700 dark:text-care-green-100"
                  aria-hidden="true"
                />
                <h4 className="mt-4 font-display text-lg font-bold text-care-ink dark:text-care-night-ink">
                  {title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
