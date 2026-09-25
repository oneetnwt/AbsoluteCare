import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext.js'

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    return { theme: 'light', toggleTheme: () => {} }
  }
  return context
}

export default useTheme
