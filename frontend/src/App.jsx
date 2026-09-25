import AuthLayout from "./components/AuthLayout";
import useAuthNavigation from "./hooks/useAuthNavigation";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const pages = {
  home: LandingPage,
  login: LoginPage,
  signup: SignupPage,
  forgot: ForgotPasswordPage,
};

function App() {
  const { page, navigate } = useAuthNavigation();
  const Page = pages[page];

  return (
    <AuthLayout onNavigate={navigate}>
      <Page onNavigate={navigate} />
    </AuthLayout>
  );
}

export default App;
