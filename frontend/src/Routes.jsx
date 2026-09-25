import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const pagePaths = {
  home: "/",
  login: "/login",
  signup: "/signup",
  forgot: "/forgot",
};

function RoutedPage({ Page, withAuthLayout = false }) {
  const navigate = useNavigate();
  const onNavigate = (page) => navigate(pagePaths[page] || pagePaths.home);
  const content = <Page onNavigate={onNavigate} />;

  return withAuthLayout ? (
    <AuthLayout onNavigate={onNavigate}>{content}</AuthLayout>
  ) : (
    content
  );
}

function Routes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RoutedPage Page={LandingPage} />,
    },
    {
      path: "/login",
      element: <RoutedPage Page={LoginPage} withAuthLayout />,
    },
    {
      path: "/signup",
      element: <RoutedPage Page={SignupPage} withAuthLayout />,
    },
    {
      path: "/forgot",
      element: <RoutedPage Page={ForgotPasswordPage} withAuthLayout />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default Routes;
