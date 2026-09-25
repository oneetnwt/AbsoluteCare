import { useEffect } from 'react'

function HipaaModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hipaa-modal-title"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-care-line bg-white p-6 shadow-2xl dark:border-care-night-line dark:bg-care-night-panel dark:text-care-night-ink sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-care-canvas text-care-muted transition hover:bg-care-line hover:text-care-ink dark:bg-care-night-card dark:text-care-night-muted dark:hover:bg-care-night-line dark:hover:text-care-night-ink"
          aria-label="Close HIPAA compliance details"
        >
          ✕
        </button>

        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-care-green-100 text-care-green-700 dark:bg-care-green-900/60 dark:text-care-green-100">
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-care-green-700 dark:text-care-green-100">
              HIPAA & Security Assurance
            </span>
            <h2 id="hipaa-modal-title" className="font-display text-2xl font-bold tracking-tight">
              Built for Confidential Therapy Practice
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
          MindfulSchedule is engineered specifically to meet and exceed HIPAA (Health Insurance Portability and Accountability Act) physical, administrative, and technical safeguard requirements.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-care-line bg-care-canvas/50 p-4 dark:border-care-night-line dark:bg-care-night-card">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-care-ink dark:text-care-night-ink">
              <span className="text-care-green-700 dark:text-care-green-100">✓</span> Business Associate Agreement (BAA)
            </h3>
            <p className="mt-1.5 text-xs text-care-muted dark:text-care-night-muted">
              We execute standard BAA agreements with all covered entities and group practices on Starter and Team plans.
            </p>
          </div>

          <div className="rounded-xl border border-care-line bg-care-canvas/50 p-4 dark:border-care-night-line dark:bg-care-night-card">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-care-ink dark:text-care-night-ink">
              <span className="text-care-green-700 dark:text-care-green-100">✓</span> AES-256 Data Encryption
            </h3>
            <p className="mt-1.5 text-xs text-care-muted dark:text-care-night-muted">
              All client records, messages, and session details are encrypted at rest with AES-256 and in transit via TLS 1.3.
            </p>
          </div>

          <div className="rounded-xl border border-care-line bg-care-canvas/50 p-4 dark:border-care-night-line dark:bg-care-night-card">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-care-ink dark:text-care-night-ink">
              <span className="text-care-green-700 dark:text-care-green-100">✓</span> Granular Role Access
            </h3>
            <p className="mt-1.5 text-xs text-care-muted dark:text-care-night-muted">
              Strict role isolation between therapists, administrative secretaries, and clients ensuring minimum necessary access.
            </p>
          </div>

          <div className="rounded-xl border border-care-line bg-care-canvas/50 p-4 dark:border-care-night-line dark:bg-care-night-card">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-care-ink dark:text-care-night-ink">
              <span className="text-care-green-700 dark:text-care-green-100">✓</span> Immutable Audit Logging
            </h3>
            <p className="mt-1.5 text-xs text-care-muted dark:text-care-night-muted">
              Comprehensive access logs record every viewing, booking, and message event for complete compliance tracking.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-care-line pt-5 dark:border-care-night-line">
          <div className="flex items-center gap-2 text-xs font-semibold text-care-muted dark:text-care-night-muted">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SOC-2 Type II Certified & HIPAA Compliant Infrastructure</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-care-green-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-care-green-800"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  )
}

export default HipaaModal
