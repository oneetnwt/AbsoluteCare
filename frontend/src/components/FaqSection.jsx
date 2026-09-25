import { useState } from 'react'

const faqs = [
  {
    question: 'Is client information and therapy scheduling data confidential & HIPAA-compliant?',
    answer: 'Yes. MindfulSchedule is built from the ground up for strict HIPAA compliance. All client records, appointment history, and messages are protected using AES-256 encryption at rest and TLS 1.3 in transit. We sign a standard Business Associate Agreement (BAA) with all registered practices.',
  },
  {
    question: 'How do Business Associate Agreements (BAA) work on MindfulSchedule?',
    answer: 'When you create a therapist or group practice account on Starter or Team plans, you can instantly generate and sign an executed digital BAA in your dashboard. Our infrastructure is audited for SOC-2 Type II readiness and technical safeguard compliance.',
  },
  {
    question: 'Can clients book appointments directly without calling or emailing the practice?',
    answer: 'Absolutely. You receive a private, customizable booking link to share with clients or embed on your practice website. Clients choose an available slot based on your rules, fill out pre-session details, and receive automated confirmations without back-and-forth phone tag.',
  },
  {
    question: 'What happens if a client needs to cancel or reschedule?',
    answer: 'You define your practice cancellation policy (e.g. 24h or 48h advance notice). Clients can request a reschedule directly from their reminder text or email, automatically freeing up your calendar for other clients.',
  },
  {
    question: 'Does MindfulSchedule store sensitive session notes or clinical records?',
    answer: 'Session notes taken inside MindfulSchedule are stored in encrypted clinical vaults with minimum-necessary access controls. Only authorized practitioners assigned to the client can access notes, and comprehensive audit logs record all view events.',
  },
  {
    question: 'Can I import my existing practice calendar or client list?',
    answer: 'Yes. MindfulSchedule supports CSV client imports and bi-directional calendar sync with major calendar providers. Our onboarding team is available to assist group practices with zero-downtime migration.',
  },
]

function FaqSection({ onOpenHipaa }) {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section id="faq" className="py-20 lg:py-28 border-t border-care-line dark:border-care-night-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Heading Column */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-care-blue-700 dark:text-care-blue-500">
              Questions Answered Plainly
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-care-ink dark:text-care-night-ink sm:text-4xl">
              Your privacy & confidentiality matter.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-care-muted dark:text-care-night-muted">
              We believe trust should be easy to find, transparent, and built into every single session click.
            </p>

            <div className="mt-8 rounded-2xl border border-care-line bg-white p-6 shadow-sm dark:border-care-night-line dark:bg-care-night-card">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-care-green-100 text-care-green-700 dark:bg-care-green-900 dark:text-care-green-100 font-bold text-lg">
                  🛡️
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-care-ink dark:text-care-night-ink">
                    Have specific compliance questions?
                  </h3>
                  <p className="text-xs text-care-muted dark:text-care-night-muted">
                    Review our full HIPAA safeguard specifications.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenHipaa}
                className="mt-4 w-full rounded-xl bg-care-green-700 py-2.5 text-xs font-bold text-white transition hover:bg-care-green-800"
              >
                View HIPAA Security Guarantee
              </button>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl border transition ${
                      isOpen
                        ? 'border-care-green-700 bg-white shadow-md dark:border-care-green-600 dark:bg-care-night-card'
                        : 'border-care-line bg-white/70 hover:border-care-green-700/50 dark:border-care-night-line dark:bg-care-night-panel'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-lg font-bold text-care-ink dark:text-care-night-ink pr-4">
                        {faq.question}
                      </span>
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full text-lg font-bold transition-transform ${
                          isOpen
                            ? 'rotate-45 bg-care-green-700 text-white dark:bg-care-green-600'
                            : 'bg-care-canvas text-care-green-700 dark:bg-care-night dark:text-care-green-100'
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 text-sm leading-relaxed text-care-muted dark:text-care-night-muted border-t border-care-line/40 dark:border-care-night-line/40 mt-1">
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
