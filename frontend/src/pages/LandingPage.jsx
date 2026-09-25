function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-svh bg-care-canvas text-care-ink">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <button
          className="flex items-center gap-3 border-0 bg-transparent p-0 font-display text-[1.05rem] font-extrabold tracking-[-0.02em]"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span
            className="grid size-8.5 place-items-center rounded-[10px] bg-care-green-700 text-xl text-white"
            aria-hidden="true"
          >
            +
          </span>
          AbsoluteCare
        </button>
        <nav
          className="hidden items-center gap-8 text-sm font-semibold text-care-muted md:flex"
          aria-label="Main navigation"
        >
          <a
            className="transition hover:text-care-green-700"
            href="#how-it-works"
          >
            How it works
          </a>
          <a className="transition hover:text-care-green-700" href="#care">
            Your care
          </a>
          <a className="transition hover:text-care-green-700" href="#support">
            Support
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            className="hidden border-0 bg-transparent px-2 py-2 text-sm font-bold text-care-green-700 sm:block"
            type="button"
            onClick={() => onNavigate("login")}
          >
            Log in
          </button>
          <button
            className="rounded-lg border-0 bg-care-green-700 px-4 py-2.5 text-sm font-bold text-white shadow-[0_7px_15px_rgba(27,107,84,0.16)] transition hover:bg-care-green-800"
            type="button"
            onClick={() => onNavigate("signup")}
          >
            Get started
          </button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-20">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-care-green-700">
              Physical therapist scheduling, made simple
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.7rem,7vw,5.6rem)] font-extrabold leading-[0.98] tracking-[-0.06em]">
              Simplify Physical Therapy Scheduling with{" "}
              <span className="text-care-green-700">AbsoluteCare.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-care-muted">
              AbsoluteCare is a physical therapist scheduling system designed to
              make appointment management easier, more organized, and more
              efficient for physical therapy clinics.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                className="rounded-lg border-0 bg-care-green-700 px-6 py-3.5 font-bold text-white shadow-[0_10px_22px_rgba(27,107,84,0.2)] transition hover:-translate-y-px hover:bg-care-green-800"
                type="button"
                onClick={() => onNavigate("signup")}
              >
                Organize your clinic <span aria-hidden="true">→</span>
              </button>
              <button
                className="rounded-lg border border-care-line bg-white px-6 py-3.5 font-bold text-care-green-700 transition hover:border-care-blue-500"
                type="button"
                onClick={() => onNavigate("login")}
              >
                I have an account
              </button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-care-muted">
              <span className="flex items-center gap-2">
                <span className="text-care-green-700" aria-hidden="true">
                  ✓
                </span>{" "}
                Centralized scheduling
              </span>
              <span className="flex items-center gap-2">
                <span className="text-care-green-700" aria-hidden="true">
                  ✓
                </span>{" "}
                Fewer scheduling conflicts
              </span>
            </div>
          </div>
          <div className="relative min-h-105 overflow-hidden rounded-[28px] bg-care-green-900 p-5 shadow-[0_24px_70px_rgba(23,87,70,0.18)] sm:p-8">
            <div
              className="absolute -right-24 -top-24 size-72 rounded-full border border-[rgba(180,227,207,0.2)]"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-32 -left-20 size-80 rounded-full border border-[rgba(180,227,207,0.2)]"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between text-sm text-[#c4ddd3]">
                <span className="font-display font-bold text-white">
                  Your clinic overview
                </span>
                <span className="rounded-full bg-[rgba(188,229,211,0.16)] px-3 py-1 text-xs text-[#bce5d3]">
                  This week
                </span>
              </div>
              <div className="mx-auto w-full max-w-sm rounded-2xl border border-[rgba(255,255,255,0.12)] bg-white p-5 text-care-ink shadow-xl sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-care-muted">
                      Next appointment
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">
                      Upcoming appointment
                    </h2>
                  </div>
                  <span
                    className="grid size-10 place-items-center rounded-xl bg-care-green-100 text-care-green-700"
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-care-line pt-4">
                  <span className="grid size-10 place-items-center rounded-full bg-[#d8edf0] font-display font-bold text-care-blue-700">
                    JM
                  </span>
                  <div>
                    <p className="font-bold">Jordan Miller, PT</p>
                    <p className="text-sm text-care-muted">
                      Tuesday · 10:30 AM
                    </p>
                  </div>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-care-green-100">
                  <div className="h-full w-3/4 rounded-full bg-care-green-700" />
                </div>
                <p className="mt-2 text-xs font-semibold text-care-muted">
                  Schedule overview · 75% organized
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#c4ddd3]">
                <span className="grid size-9 place-items-center rounded-full bg-[#bce5d3] font-bold text-care-green-900">
                  ✓
                </span>
                <span>Better scheduling. Better organization.</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-y border-care-line bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-care-blue-700">
                Efficient physical therapy scheduling
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">
                One platform for your clinic’s daily workflow.
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="border-t-2 border-care-green-700 pt-5">
                <span className="font-display text-3xl font-bold text-care-green-700">
                  01
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">
                  Manage appointments
                </h3>
                <p className="mt-2 leading-7 text-care-muted">
                  Organize physical therapy appointments in one centralized
                  system.
                </p>
              </div>
              <div className="border-t-2 border-care-blue-500 pt-5">
                <span className="font-display text-3xl font-bold text-care-blue-700">
                  02
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">
                  Schedule therapists
                </h3>
                <p className="mt-2 leading-7 text-care-muted">
                  Monitor therapist availability, working hours, and scheduled
                  sessions.
                </p>
              </div>
              <div className="border-t-2 border-care-green-700 pt-5">
                <span className="font-display text-3xl font-bold text-care-green-700">
                  03
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">
                  Improve clinic workflow
                </h3>
                <p className="mt-2 leading-7 text-care-muted">
                  Reduce repetitive manual scheduling tasks and improve
                  coordination.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="care"
          className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-care-green-700">
                Built for physical therapy clinics
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">
                Manage schedules and patient appointments with more clarity.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-care-green-100 p-6">
                <span
                  className="text-2xl text-care-green-700"
                  aria-hidden="true"
                >
                  ◷
                </span>
                <h3 className="mt-8 font-display text-lg font-bold">
                  Organized patient appointments
                </h3>
                <p className="mt-2 text-sm leading-6 text-care-muted">
                  Keep upcoming bookings and therapy sessions structured and
                  easy to review.
                </p>
              </div>
              <div className="rounded-2xl bg-care-blue-100 p-6">
                <span
                  className="text-2xl text-care-blue-700"
                  aria-hidden="true"
                >
                  ⌁
                </span>
                <h3 className="mt-8 font-display text-lg font-bold">
                  Centralized management
                </h3>
                <p className="mt-2 text-sm leading-6 text-care-muted">
                  Coordinate therapist schedules and appointment information
                  through one platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="support" className="bg-care-green-900 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-6 py-14 lg:flex-row lg:items-center lg:px-10">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#a6d6c0]">
                Better scheduling. Better organization. Better care.
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">
                Spend less time managing schedules and more time focusing on
                patient care.
              </h2>
            </div>
            <button
              className="rounded-lg border-0 bg-[#bce5d3] px-6 py-3.5 font-bold text-care-green-900 transition hover:bg-white"
              type="button"
              onClick={() => onNavigate("signup")}
            >
              Get started <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-7 text-sm text-care-muted sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span className="font-display font-bold text-care-ink">
          AbsoluteCare
        </span>
        <span>Physical therapy scheduling, organized for better care.</span>
      </footer>
    </div>
  );
}

export default LandingPage;
