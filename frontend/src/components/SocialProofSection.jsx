const partnerPractices = [
  { name: 'HARBOR WELLNESS', location: 'Boston, MA' },
  { name: 'NORTHSTAR THERAPY', location: 'Seattle, WA' },
  { name: 'KINDRED CARE', location: 'Austin, TX' },
  { name: 'THE OPEN DOOR', location: 'Chicago, IL' },
  { name: 'HAVEN MIND PRACTICE', location: 'Denver, CO' },
]

const testimonials = [
  {
    quote: 'My clients arrive knowing exactly what to expect, and I get to start sessions feeling fully present instead of managing calendar chaos.',
    author: 'Dr. Priya Shah',
    title: 'Licensed Clinical Psychologist',
    practice: 'Harbor Wellness',
    avatar: 'PS',
    highlight: 'Saved 6+ hours weekly on scheduling',
  },
  {
    quote: 'The simplest change was the biggest one for our group practice: everyone can see available times and book instantly without phone tag.',
    author: 'Evan Brooks',
    title: 'LMFT, Clinical Director',
    practice: 'Northstar Therapy',
    avatar: 'EB',
    highlight: '98% on-time session start rate',
  },
  {
    quote: 'As a client, I used to dread calling offices to check availability. MindfulSchedule made finding and booking my weekly session feel warm and effortless.',
    author: 'Clara Vance',
    title: 'Client',
    practice: 'Kindred Care Patient',
    avatar: 'CV',
    highlight: 'Zero booking stress',
  },
]

function SocialProofSection() {
  return (
    <section className="border-y border-care-line bg-white/60 py-16 dark:border-care-night-line dark:bg-care-night-panel/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Practice Partner Banner */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-care-muted dark:text-care-night-muted">
            Trusted by thoughtful care teams and independent practitioners nationwide
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 lg:gap-14 opacity-80">
            {partnerPractices.map((p) => (
              <div key={p.name} className="flex flex-col items-center">
                <span className="font-display text-base font-extrabold tracking-wider text-care-ink/80 dark:text-care-night-ink/80">
                  {p.name}
                </span>
                <span className="text-[10px] font-medium text-care-muted dark:text-care-night-muted">
                  {p.location}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Compliance Badges Banner */}
        <div className="mt-12 rounded-2xl border border-care-line/80 bg-care-canvas/80 p-5 dark:border-care-night-line dark:bg-care-night-card">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-center">
            <div className="flex flex-col items-center p-2">
              <span className="text-xl">🛡️</span>
              <span className="mt-1 font-display text-sm font-bold text-care-ink dark:text-care-night-ink">HIPAA Compliant</span>
              <span className="text-xs text-care-muted dark:text-care-night-muted">Standard BAA agreement</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-xl">🔒</span>
              <span className="mt-1 font-display text-sm font-bold text-care-ink dark:text-care-night-ink">256-Bit SSL</span>
              <span className="text-xs text-care-muted dark:text-care-night-muted">Bank-grade encryption</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-xl">📜</span>
              <span className="mt-1 font-display text-sm font-bold text-care-ink dark:text-care-night-ink">SOC-2 Readiness</span>
              <span className="text-xs text-care-muted dark:text-care-night-muted">Strict privacy audit</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-xl">💬</span>
              <span className="mt-1 font-display text-sm font-bold text-care-ink dark:text-care-night-ink">99.4% Client Satisfaction</span>
              <span className="text-xs text-care-muted dark:text-care-night-muted">Based on 10k+ sessions</span>
            </div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-14">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-care-green-700 dark:text-care-green-100">
              Practitioner & Client Experiences
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-care-ink dark:text-care-night-ink sm:text-4xl">
              Less administrative clutter. More presence.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="flex flex-col justify-between rounded-2xl border border-care-line bg-white p-7 shadow-sm transition hover:shadow-md dark:border-care-night-line dark:bg-care-night-card"
              >
                <div>
                  <div className="mb-4 inline-flex items-center rounded-full bg-care-green-100 px-3 py-1 text-xs font-bold text-care-green-700 dark:bg-care-green-900/60 dark:text-care-green-100">
                    ★ {t.highlight}
                  </div>
                  <blockquote className="text-base leading-relaxed text-care-ink/90 dark:text-care-night-ink/90">
                    “{t.quote}”
                  </blockquote>
                </div>

                <div className="mt-6 flex items-center gap-3.5 border-t border-care-line pt-5 dark:border-care-night-line">
                  <div className="grid size-11 place-items-center rounded-full bg-care-green-700 font-display text-sm font-bold text-white dark:bg-care-green-600">
                    {t.avatar}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-care-ink dark:text-care-night-ink">
                      {t.author}
                    </h3>
                    <p className="text-xs text-care-muted dark:text-care-night-muted">
                      {t.title} • <span className="font-semibold">{t.practice}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialProofSection
