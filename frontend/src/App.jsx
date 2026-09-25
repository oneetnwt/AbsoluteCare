import ThemeProvider from './context/ThemeProvider.jsx'
import useAuthNavigation from './hooks/useAuthNavigation'
import AuthLayout from './components/AuthLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

function App() {
  const { page, navigate } = useAuthNavigation()

  return (
    <ThemeProvider>
      {page === 'home' ? (
        <LandingPage onNavigate={navigate} />
      ) : (
        <AuthLayout onNavigate={navigate}>
          {page === 'login' && <LoginPage onNavigate={navigate} />}
          {page === 'signup' && <SignupPage onNavigate={navigate} />}
          {page === 'forgot' && <ForgotPasswordPage onNavigate={navigate} />}
        </AuthLayout>
      )}
    </ThemeProvider>
  )
}

export default App
