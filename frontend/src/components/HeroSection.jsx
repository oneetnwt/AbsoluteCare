import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock3,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const timeSlots = ["10:00 AM", "1:15 PM", "3:30 PM", "5:00 PM"];

function HeroSection({ onNavigate, onOpenHipaa }) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("3:30 PM");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-care-line/70 dark:border-care-night-line/80">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(35,133,106,0.14),transparent_30%),linear-gradient(135deg,transparent_55%,rgba(59,139,181,0.08))] dark:bg-[radial-gradient(circle_at_78%_20%,rgba(35,133,106,0.2),transparent_30%),linear-gradient(135deg,transparent_55%,rgba(59,139,181,0.08))]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
        <div className="max-w-xl">
          <div className="care-hero-reveal care-hero-reveal-1 mb-7 inline-flex items-center gap-2 rounded-full border border-care-green-700/20 bg-care-green-100/70 px-3.5 py-1.5 text-xs font-bold text-care-green-700 dark:border-care-green-600/30 dark:bg-care-green-900/50 dark:text-care-green-100">
            <CalendarCheck className="size-4" aria-hidden="true" />
            <span>Scheduling built around recovery</span>
          </div>
          <h1 className="care-hero-reveal care-hero-reveal-2 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-care-ink text-balance dark:text-care-night-ink sm:text-5xl lg:text-6xl">
            Simple scheduling for better care.
          </h1>
          <p className="care-hero-reveal care-hero-reveal-3 mt-7 max-w-lg text-lg leading-relaxed text-care-muted dark:text-care-night-muted sm:text-xl">
            AbsoluteCare keeps appointments, reminders, intake, and treatment
            notes clear for physical therapy teams and their patients.
          </p>
          <div className="care-hero-reveal care-hero-reveal-4 mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate("signup")}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-care-green-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-care-green-700/20 transition-[background-color,box-shadow,transform] hover:bg-care-green-800 hover:shadow-care-green-700/30 active:scale-[0.99] dark:bg-care-green-600 dark:hover:bg-care-green-700"
            >
              Create account
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("login")}
              className="inline-flex items-center justify-center rounded-lg border border-care-line bg-white/70 px-6 py-3.5 text-sm font-bold text-care-green-700 transition-[background-color,border-color] hover:border-care-green-700 hover:bg-white dark:border-care-night-line dark:bg-care-night-panel/70 dark:text-care-green-100 dark:hover:border-care-green-600"
            >
              Sign in
            </button>
          </div>
          <div className="care-hero-reveal care-hero-reveal-5 mt-9 grid gap-3 text-sm font-semibold text-care-muted dark:text-care-night-muted sm:grid-cols-3">
            <span className="flex items-center gap-2">
              <Check
                className="size-4 text-care-green-700 dark:text-care-green-100"
                aria-hidden="true"
              />{" "}
              BAA included
            </span>
            <span className="flex items-center gap-2">
              <LockKeyhole
                className="size-4 text-care-green-700 dark:text-care-green-100"
                aria-hidden="true"
              />{" "}
              AES-256 encrypted
            </span>
            <button
              type="button"
              onClick={onOpenHipaa}
              className="flex items-center gap-2 text-left text-care-green-700 hover:underline dark:text-care-green-100"
            >
              <ShieldCheck className="size-4" aria-hidden="true" /> HIPAA
              safeguards
            </button>
          </div>
        </div>

        <div className="relative lg:pl-8">
          <div
            className="absolute -left-2 top-10 hidden h-32 w-32 border-l border-t border-care-blue-500/40 lg:block"
            aria-hidden="true"
          />
          <div className="care-hero-reveal care-hero-reveal-card care-grid-paper relative rounded-lg border border-care-line bg-white p-5 shadow-2xl dark:border-care-night-line dark:bg-care-night-panel sm:p-7">
            <div className="flex items-start justify-between border-b border-care-line pb-5 dark:border-care-night-line">
              <div>
                <p className="text-xs font-bold text-care-muted dark:text-care-night-muted">
                  Thursday, October 12
                </p>
                <h2 className="mt-1 font-display text-2xl font-extrabold text-care-ink dark:text-care-night-ink">
                  Your day, in view.
                </h2>
              </div>
              <span className="rounded-full bg-care-green-100 px-3 py-1 text-xs font-bold text-care-green-800 dark:bg-care-green-900/40 dark:text-care-green-100">
                4 visits
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              <div className="border-l-4 border-care-green-700 bg-care-green-50 p-4 dark:border-care-green-600 dark:bg-care-green-900/30">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-care-green-800 dark:text-care-green-100">
                      3:30 PM
                    </p>
                    <p className="mt-1 font-display text-base font-bold text-care-ink dark:text-care-night-ink">
                      Knee rehabilitation
                    </p>
                    <p className="mt-1 text-xs text-care-muted dark:text-care-night-muted">
                      Alex Rivera · 50 minutes
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-care-green-700 dark:text-care-green-100">
                    <Check className="size-3.5" aria-hidden="true" /> Confirmed
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 border border-care-line bg-care-canvas p-4 dark:border-care-night-line dark:bg-care-night-card">
                <Clock3
                  className="size-5 shrink-0 text-care-blue-700 dark:text-care-blue-500"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-care-ink dark:text-care-night-ink">
                    5:00 PM · Initial evaluation
                  </p>
                  <p className="mt-1 text-xs text-care-muted dark:text-care-night-muted">
                    New patient intake ready
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 border-t border-care-line pt-5 dark:border-care-night-line">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold text-care-muted dark:text-care-night-muted">
                  Patient booking preview
                </p>
                <span className="flex items-center gap-1 text-xs font-bold text-care-blue-700 dark:text-care-blue-100">
                  <LockKeyhole className="size-3.5" aria-hidden="true" />{" "}
                  Private
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setSelectedTimeSlot(slot);
                      setBookingConfirmed(false);
                    }}
                    className={`rounded-md border py-2 text-xs font-bold transition-[background-color,border-color,color] ${selectedTimeSlot === slot ? "border-care-green-700 bg-care-green-700 text-white dark:border-care-green-600 dark:bg-care-green-600" : "border-care-line bg-white text-care-ink hover:border-care-green-700 dark:border-care-night-line dark:bg-care-night-card dark:text-care-night-ink"}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {bookingConfirmed ? (
                <p className="mt-4 flex items-center gap-2 text-xs font-bold text-care-green-700 dark:text-care-green-100">
                  <Check className="size-4" aria-hidden="true" /> Request saved
                  for {selectedTimeSlot}.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(true)}
                  className="mt-4 w-full rounded-md bg-care-blue-700 py-2.5 text-xs font-bold text-white transition-colors hover:bg-care-blue-500"
                >
                  Request this time
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
