import { useState } from 'react'

function ForgotPasswordForm({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Enter a valid email address.')
    }
    setError('')
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => onNavigate('login')}
        className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-care-blue-700 hover:underline dark:text-care-blue-500"
      >
        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        <span>Back to sign in</span>
      </button>

      <div className="mb-6">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-care-blue-700/20 bg-care-blue-50/70 px-2.5 py-0.5 text-xs font-semibold text-care-blue-700 dark:border-care-blue-500/30 dark:bg-care-blue-900/30 dark:text-care-blue-100">
          <span className="size-1.5 rounded-full bg-care-blue-500" />
          Password Recovery
        </div>
        <h1
          id="auth-title"
          className="font-display text-2xl font-bold tracking-tight text-care-ink dark:text-care-night-ink sm:text-3xl"
        >
          Reset your password
        </h1>
        <p className="mt-1.5 text-sm text-care-muted dark:text-care-night-muted">
          Enter your registered clinical or patient email address to receive secure reset instructions.
        </p>
      </div>

      {submitted ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-care-green-700/20 bg-care-green-50 p-6 text-care-green-900 dark:border-care-green-600/30 dark:bg-care-green-900/20 dark:text-care-green-100"
        >
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-full bg-care-green-700 text-xs font-bold text-white">✓</span>
            <strong className="block font-display text-base font-bold">
              Check your inbox
            </strong>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-care-muted dark:text-care-night-muted">
            If an account exists for <strong className="text-care-ink dark:text-care-night-ink">{email}</strong>, you will receive password reset instructions shortly.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="mt-5 w-full rounded-xl bg-care-green-700 py-2.5 text-xs font-bold text-white transition hover:bg-care-green-800"
          >
            Return to Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4">
          <div className="grid gap-1.5">
            <label htmlFor="forgot-email" className="text-xs font-bold text-care-ink dark:text-care-night-ink">
              Registered email address
            </label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              autoComplete="email"
              placeholder="therapist@clinic.com"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'forgot-email-error' : undefined}
              className="care-input"
            />
            {error && (
              <p id="forgot-email-error" className="m-0 text-xs font-semibold text-care-error">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border-0 bg-care-green-700 py-3 text-sm font-bold text-white shadow-sm shadow-care-green-700/25 transition-all hover:bg-care-green-800 active:scale-[0.99] disabled:opacity-60 dark:bg-care-green-600 dark:hover:bg-care-green-700"
          >
            {loading ? 'Sending link…' : 'Send password reset link'}
          </button>
        </form>
      )}

      <div className="mt-8 border-t border-care-line pt-6 text-center text-xs text-care-muted dark:border-care-night-line dark:text-care-night-muted">
        <span>Remembered your password? </span>
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="font-bold text-care-blue-700 underline decoration-1 underline-offset-4 hover:text-care-blue-800 dark:text-care-blue-500"
        >
          Sign in
        </button>
      </div>
    </>
  )
}

export default ForgotPasswordForm
