import { useState } from 'react'

function PasswordField({
  id,
  label = 'Password',
  value,
  onChange,
  error,
  autoComplete = 'current-password',
  placeholder = '••••••••',
  showStrength = false,
}) {
  const [showPassword, setShowPassword] = useState(false)

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  // Calculate password strength
  const getStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' }
    let score = 0
    if (pwd.length >= 8) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-care-error' }
    if (score === 2 || score === 3) return { score: 2, label: 'Moderate', color: 'bg-amber-500' }
    return { score: 3, label: 'Strong', color: 'bg-care-green-700' }
  }

  const strength = showStrength ? getStrength(value) : null

  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-bold text-care-ink dark:text-care-night-ink">
          {label}
        </label>
        {strength && strength.score > 0 && (
          <span className="text-[11px] font-semibold text-care-muted dark:text-care-night-muted">
            Strength: <span className="font-bold">{strength.label}</span>
          </span>
        )}
      </div>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="care-input pr-16"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-care-muted hover:text-care-ink dark:text-care-night-muted dark:hover:text-care-night-ink"
          aria-label={showPassword ? `Hide ${label}` : `Show ${label}`}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      {/* Password Strength Meter */}
      {showStrength && value && (
        <div className="mt-1 flex gap-1.5">
          <div className={`h-1 flex-1 rounded-full transition-colors ${strength.score >= 1 ? strength.color : 'bg-care-line dark:bg-care-night-line'}`} />
          <div className={`h-1 flex-1 rounded-full transition-colors ${strength.score >= 2 ? strength.color : 'bg-care-line dark:bg-care-night-line'}`} />
          <div className={`h-1 flex-1 rounded-full transition-colors ${strength.score >= 3 ? strength.color : 'bg-care-line dark:bg-care-night-line'}`} />
        </div>
      )}

      {error && (
        <p id={`${id}-error`} className="m-0 text-xs font-semibold text-care-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default PasswordField
