import useTheme from '../hooks/useTheme'

function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 rounded-full border border-care-line bg-white/80 px-3 py-1.5 text-xs font-semibold text-care-ink transition hover:border-care-green-700 hover:bg-white dark:border-care-night-line dark:bg-care-night-panel dark:text-care-night-ink dark:hover:border-care-green-600 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <>
          <svg className="size-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          <span>Light mode</span>
        </>
      ) : (
        <>
          <svg className="size-4 text-care-green-700 dark:text-care-green-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <span>Dark mode</span>
        </>
      )}
    </button>
  )
}

export default ThemeToggle
