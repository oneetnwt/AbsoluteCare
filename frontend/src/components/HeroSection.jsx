import { useState } from "react";

function HeroSection({ onNavigate, onOpenHipaa }) {
  const [activeRoleTab, setActiveRoleTab] = useState("therapist"); // 'therapist' | 'patient'
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("3:30 PM");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const timeSlots = ["10:00 AM", "1:15 PM", "3:30 PM", "5:00 PM"];

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Soft background ambient gradient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-150 w-250 -translate-x-1/2 rounded-full bg-radial from-care-green-100/60 via-care-blue-100/20 to-transparent blur-3xl dark:from-care-green-900/30 dark:via-care-night-panel/20"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Top Pill / Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-care-green-700/20 bg-care-green-100/70 px-3.5 py-1.5 text-xs font-bold text-care-green-700 dark:border-care-green-600/30 dark:bg-care-green-900/50 dark:text-care-green-100">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Built for the rhythm of recovery</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-care-ink dark:text-care-night-ink sm:text-5xl lg:text-6xl">
              Make room for{" "}
              <span className="text-care-green-700 dark:text-care-green-100 underline decoration-care-blue-500/40 decoration-wavy underline-offset-8">
                better care
              </span>
              .
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg leading-relaxed text-care-muted dark:text-care-night-muted sm:text-xl">
              AbsoluteCare gives physical therapy teams a clear view of every
              appointment, while patients book, confirm, and keep moving without
              phone tag.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onNavigate("signup")}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border-0 bg-care-green-700 px-7 py-4 text-base font-bold text-white shadow-xl shadow-care-green-700/25 transition hover:bg-care-green-800 hover:shadow-care-green-700/35 active:scale-[0.99] dark:bg-care-green-600 dark:hover:bg-care-green-700"
              >
                <span>Get started</span>
                <svg
                  className="size-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-care-line bg-white/80 px-6 py-4 text-base font-bold text-care-green-700 shadow-sm transition hover:border-care-green-700 hover:bg-white dark:border-care-night-line dark:bg-care-night-panel dark:text-care-green-100 dark:hover:border-care-green-600"
              >
                <span>I have an account</span>
              </button>
            </div>

            {/* Trust Marks */}
            <div className="mt-10 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-semibold text-care-muted dark:text-care-night-muted">
              <div className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-care-green-100 text-care-green-700 dark:bg-care-green-900 dark:text-care-green-100 font-bold text-[10px]">
                  ✓
                </span>
                <span>BAA Included</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-care-green-100 text-care-green-700 dark:bg-care-green-900 dark:text-care-green-100 font-bold text-[10px]">
                  ✓
                </span>
                <span>AES-256 Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenHipaa}
                  className="flex items-center gap-1.5 text-care-green-700 hover:underline dark:text-care-green-100"
                >
                  <span className="grid size-5 place-items-center rounded-full bg-care-blue-100 text-care-blue-700 font-bold text-[10px]">
                    🛡
                  </span>
                  <span>HIPAA Compliant</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero Preview Card */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="care-grid-paper relative rounded-3xl border border-care-line bg-white/95 p-6 shadow-2xl backdrop-blur-md dark:border-care-night-line dark:bg-care-night-panel sm:p-8">
              {/* Role Switcher Pill */}
              <div className="mb-6 flex items-center justify-between border-b border-care-line pb-4 dark:border-care-night-line">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-care-green-700 dark:bg-care-green-100" />
                  <span className="text-xs font-bold uppercase tracking-wider text-care-muted dark:text-care-night-muted">
                    Today at a glance
                  </span>
                </div>
                <div className="flex rounded-lg border border-care-line bg-care-canvas p-1 dark:border-care-night-line dark:bg-care-night">
                  <button
                    type="button"
                    onClick={() => setActiveRoleTab("therapist")}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                      activeRoleTab === "therapist"
                        ? "bg-care-green-700 text-white shadow-sm dark:bg-care-green-600"
                        : "text-care-muted hover:text-care-ink dark:text-care-night-muted"
                    }`}
                  >
                    Therapist View
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveRoleTab("client")}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                      activeRoleTab === "client"
                        ? "bg-care-green-700 text-white shadow-sm dark:bg-care-green-600"
                        : "text-care-muted hover:text-care-ink dark:text-care-night-muted"
                    }`}
                  >
                    Patient View
                  </button>
                </div>
              </div>

              {/* Dynamic Interactive Card Content */}
              {activeRoleTab === "therapist" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-care-green-900 p-4 text-white shadow-md">
                    <div>
                      <p className="text-xs text-care-green-100">
                        Dr. Maya Lin, PsyD
                      </p>
                      <h3 className="font-display text-lg font-bold">
                        Today’s Practice Overview
                      </h3>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-care-green-100">
                      4 Sessions Today
                    </span>
                  </div>

                  <div className="rounded-2xl border border-care-line bg-care-canvas p-4 dark:border-care-night-line dark:bg-care-night-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-full bg-care-green-100 font-display font-bold text-care-green-700 dark:bg-care-green-900 dark:text-care-green-100">
                          AR
                        </div>
                        <div>
                          <p className="text-sm font-bold text-care-ink dark:text-care-night-ink">
                            Alex Rivera
                          </p>
                          <p className="text-xs text-care-muted dark:text-care-night-muted">
                            Knee rehabilitation • 50 min
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                        Confirmed
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-care-line pt-3 text-xs dark:border-care-night-line">
                      <span className="font-semibold text-care-muted dark:text-care-night-muted">
                        Time: Today, 3:30 PM
                      </span>
                      <span className="flex items-center gap-1 text-care-blue-700 font-bold dark:text-care-blue-500">
                        <svg
                          className="size-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="m15 10-5 5-2-2" />
                        </svg>
                        HIPAA Telehealth Ready
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-dashed border-care-line p-3 text-xs text-care-muted dark:border-care-night-line dark:text-care-night-muted">
                    <span>⚡ Automated intake details captured</span>
                    <span className="font-bold text-care-green-700 dark:text-care-green-100">
                      Intake ready
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-care-blue-700 p-4 text-white shadow-md">
                    <div>
                      <p className="text-xs text-sky-100">
                        Book session with Dr. Maya Lin
                      </p>
                      <h3 className="font-display text-lg font-bold">
                        Select Available Time
                      </h3>
                    </div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                      Self-Serve
                    </span>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-care-muted dark:text-care-night-muted">
                      Available Slots for Thursday, Oct 12:
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setSelectedTimeSlot(slot);
                            setBookingConfirmed(false);
                          }}
                          className={`rounded-lg border py-2 text-xs font-bold transition ${
                            selectedTimeSlot === slot
                              ? "border-care-green-700 bg-care-green-700 text-white shadow-sm dark:border-care-green-600 dark:bg-care-green-600"
                              : "border-care-line bg-white text-care-ink hover:border-care-green-700 dark:border-care-night-line dark:bg-care-night-card dark:text-care-night-ink"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-care-line bg-care-canvas p-4 text-center dark:border-care-night-line dark:bg-care-night-card">
                    {bookingConfirmed ? (
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-care-green-700 dark:text-care-green-100">
                          ✓ Appointment Request Sent!
                        </p>
                        <p className="text-xs text-care-muted dark:text-care-night-muted">
                          Calendar invite & HIPAA intake link sent to your
                          email.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-care-muted dark:text-care-night-muted">
                          Selected Slot:{" "}
                          <strong className="text-care-ink dark:text-care-night-ink">
                            {selectedTimeSlot}
                          </strong>
                        </p>
                        <button
                          type="button"
                          onClick={() => setBookingConfirmed(true)}
                          className="w-full rounded-lg bg-care-green-700 py-2.5 text-xs font-bold text-white transition hover:bg-care-green-800"
                        >
                          Confirm Booking Slot
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom HIPAA Shield Assurance */}
              <div className="mt-5 flex items-center justify-between border-t border-care-line pt-4 text-xs font-semibold text-care-muted dark:border-care-night-line dark:text-care-night-muted">
                <span className="flex items-center gap-1.5">
                  <span className="grid size-4 place-items-center rounded-full bg-care-green-100 text-care-green-700 dark:bg-care-green-900 dark:text-care-green-100 font-bold text-[9px]">
                    ✓
                  </span>
                  End-to-End Encrypted Session
                </span>
                <span className="text-care-green-700 dark:text-care-green-100">
                  Zero phone tag
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
