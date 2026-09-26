import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import ThemeProvider from "./context/ThemeProvider.jsx";
import AuthLayout from "./components/AuthLayout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GoogleAccountSetupPage from "./pages/GoogleAccountSetupPage";
import GoogleAuthCallbackPage from "./pages/GoogleAuthCallbackPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext.jsx";
import { isAuthenticated } from "./auth/authStorage";

const pagePaths = {
  home: "/",
  login: "/login",
  signup: "/signup",
  forgot: "/forgot",
};

function RoutedPage({ Page, withAuthLayout = false }) {
  const navigate = useNavigate();
  const onNavigate = (page) =>
    navigate(page.startsWith("/") ? page : pagePaths[page] || pagePaths.home);
  const content = <Page onNavigate={onNavigate} />;

  return withAuthLayout ? (
    <AuthLayout onNavigate={onNavigate}>{content}</AuthLayout>
  ) : (
    content
  );
}

function PublicOnlyRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}

function Routes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicOnlyRoute>
          <RoutedPage Page={LandingPage} />
        </PublicOnlyRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicOnlyRoute>
          <RoutedPage Page={LoginPage} withAuthLayout />
        </PublicOnlyRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicOnlyRoute>
          <RoutedPage Page={SignupPage} withAuthLayout />
        </PublicOnlyRoute>
      ),
    },
    {
      path: "/forgot",
      element: (
        <PublicOnlyRoute>
          <RoutedPage Page={ForgotPasswordPage} withAuthLayout />
        </PublicOnlyRoute>
      ),
    },
    {
      path: "/auth/callback",
      element: <RoutedPage Page={GoogleAuthCallbackPage} withAuthLayout />,
    },
    {
      path: "/google/setup",
      element: <RoutedPage Page={GoogleAccountSetupPage} withAuthLayout />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute />,
    },
    {
      path: "*",
      element: (
        <PublicOnlyRoute>
          <RoutedPage Page={LandingPage} />
        </PublicOnlyRoute>
      ),
    },
  ]);

  return (
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={routes} />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default Routes;
