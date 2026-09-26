import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage";
import Dashboard from "../pages/patient/Dashboard";
import DashboardLayout from "../layouts/patient/DashboardLayout";
import Auth from "../pages/auth/Auth";
import StaffAuth from "../pages/staff/StaffAuth";
import StaffDashboardLayout from "../layouts/staff/StaffDashboardLayout";
import AdminDashboardPage from "../pages/staff/admin/DashboardPage";
import AdminAppointmentsPage from "../pages/staff/admin/AppointmentsPage";
import AdminPatientsPage from "../pages/staff/admin/PatientsPage";
import AdminPaymentsPage from "../pages/staff/admin/PaymentsPage";
import AdminProfilePage from "../pages/staff/admin/ProfilePage";
import AdminReportsPage from "../pages/staff/admin/ReportsPage";
import AdminServicesPage from "../pages/staff/admin/ServicesPage";
import AdminTherapistsPage from "../pages/staff/admin/TherapistsPage";
import AdminUsersPage from "../pages/staff/admin/UserManagementPage";
import TherapistDashboardPage from "../pages/staff/therapist/DashboardPage";
import TherapistAppointmentsPage from "../pages/staff/therapist/MyAppointmentsPage";
import TherapistAvailabilityPage from "../pages/staff/therapist/AvailabilityPage";
import TherapistPatientsPage from "../pages/staff/therapist/MyPatientsPage";
import TherapistProfilePage from "../pages/staff/therapist/ProfilePage";
import TherapistRecordsPage from "../pages/staff/therapist/SessionRecordsPage";
import SecretaryDashboardPage from "../pages/staff/secretary/DashboardPage";
import SecretaryPaymentsPage from "../pages/staff/secretary/PaymentsPage";
import SecretaryProfilePage from "../pages/staff/secretary/ProfilePage";
import SecretarySchedulePage from "../pages/staff/secretary/SchedulePage";
import NotFoundPage from "../pages/NotFoundPage";
import GoogleAccountSetup from "../pages/auth/GoogleAccountSetup";
import GoogleAuthCallback from "../pages/auth/GoogleAuthCallback";

function AppRouter() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/login",
      element: <Auth />,
    },
    {
      path: "/signup",
      element: <Auth />,
    },
    {
      path: "/forgot-password",
      element: <Auth />,
    },
    {
      path: "/google/setup",
      element: <GoogleAccountSetup />,
    },
    {
      path: "/auth/callback",
      element: <GoogleAuthCallback />,
    },
    {
      path: "/staff/login",
      element: <StaffAuth />,
    },
    {
      path: "/staff/forgot-password",
      element: <StaffAuth />,
    },
    {
      path: "/staff/admin",
      element: <StaffDashboardLayout role="admin" />,
      children: [
        { index: true, element: <AdminDashboardPage /> },
        { path: "users", element: <AdminUsersPage /> },
        { path: "therapists", element: <AdminTherapistsPage /> },
        { path: "patients", element: <AdminPatientsPage /> },
        { path: "appointments", element: <AdminAppointmentsPage /> },
        { path: "services", element: <AdminServicesPage /> },
        { path: "payments", element: <AdminPaymentsPage /> },
        { path: "reports", element: <AdminReportsPage /> },
        { path: "profile", element: <AdminProfilePage /> },
      ],
    },
    {
      path: "/staff/therapist",
      element: <StaffDashboardLayout role="therapist" />,
      children: [
        { index: true, element: <TherapistDashboardPage /> },
        { path: "my-appointments", element: <TherapistAppointmentsPage /> },
        { path: "my-patients", element: <TherapistPatientsPage /> },
        { path: "session-records", element: <TherapistRecordsPage /> },
        { path: "availability", element: <TherapistAvailabilityPage /> },
        { path: "profile", element: <TherapistProfilePage /> },
      ],
    },
    {
      path: "/staff/secretary",
      element: <StaffDashboardLayout role="secretary" />,
      children: [
        { index: true, element: <SecretaryDashboardPage /> },
        { path: "schedule", element: <SecretarySchedulePage /> },
        { path: "payments", element: <SecretaryPaymentsPage /> },
        { path: "profile", element: <SecretaryProfilePage /> },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default AppRouter;
