import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "./context/useAuth";
import Auth from "./pages/auth/Auth";
import GoogleAccountSetup from "./pages/auth/GoogleAccountSetup";
import GoogleAuthCallback from "./pages/auth/GoogleAuthCallback";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./pages/landing/LandingPage";
import Dashboard from "./pages/patient/Dashboard";
import AppointmentsPage from "./pages/patient/AppointmentsPage";
import BookAppointmentPage from "./pages/patient/BookAppointmentPage";
import ProgressPage from "./pages/patient/ProgressPage";
import DependentsPage from "./pages/patient/DependentsPage";
import ProfilePage from "./pages/patient/ProfilePage";
import SettingsPage from "./pages/patient/SettingsPage";
import AppointmentDetailsPage from "./pages/patient/AppointmentDetailsPage";
import NotificationsPage from "./pages/patient/NotificationsPage";
import DashboardLayout from "./layouts/patient/DashboardLayout";
import StaffAuth from "./pages/staff/StaffAuth";
import StaffDashboardLayout from "./layouts/staff/StaffDashboardLayout";
import AdminDashboardPage from "./pages/staff/admin/DashboardPage";
import AdminAppointmentsPage from "./pages/staff/admin/AppointmentsPage";
import AdminPatientsPage from "./pages/staff/admin/PatientsPage";
import AdminPaymentsPage from "./pages/staff/admin/PaymentsPage";
import AdminProfilePage from "./pages/staff/admin/ProfilePage";
import AdminReportsPage from "./pages/staff/admin/ReportsPage";
import AdminServicesPage from "./pages/staff/admin/ServicesPage";
import AdminSessionsPage from "./pages/staff/admin/SessionsPage";
import AdminTherapistsPage from "./pages/staff/admin/TherapistsPage";
import AdminUsersPage from "./pages/staff/admin/UserManagementPage";
import TherapistDashboardPage from "./pages/staff/therapist/DashboardPage";
import TherapistAppointmentsPage from "./pages/staff/therapist/MyAppointmentsPage";
import TherapistAvailabilityPage from "./pages/staff/therapist/AvailabilityPage";
import TherapistPatientsPage from "./pages/staff/therapist/MyPatientsPage";
import TherapistProfilePage from "./pages/staff/therapist/ProfilePage";
import TherapistRecordsPage from "./pages/staff/therapist/SessionRecordsPage";
import TherapistAppointmentDetailsPage from "./pages/staff/therapist/AppointmentDetailsPage";
import SecretaryDashboardPage from "./pages/staff/secretary/DashboardPage";
import SecretaryPaymentsPage from "./pages/staff/secretary/PaymentsPage";
import SecretaryProfilePage from "./pages/staff/secretary/ProfilePage";
import SecretarySchedulePage from "./pages/staff/secretary/SchedulePage";
import { PublicOnlyRoute, ProtectedRoute } from "./routes/ProtectedRoute";
import RouteErrorBoundary from "./routes/RouteErrorBoundary";

const staffRoles = ["admin", "therapist", "secretary"];

function StaffDashboardRedirect() {
  const { user } = useAuth();
  return <Navigate replace to={`/staff/${user.role}`} />;
}

function StaffPaymentsPage() {
  const { user } = useAuth();
  return user.role === "admin" ? (
    <AdminPaymentsPage />
  ) : (
    <SecretaryPaymentsPage />
  );
}

function StaffAppointmentsPage() {
  const { user } = useAuth();
  return user.role === "admin" ? (
    <AdminAppointmentsPage />
  ) : (
    <TherapistAppointmentsPage />
  );
}

const patientChildren = [
  { index: true, element: <Dashboard /> },
  { path: "appointments", element: <AppointmentsPage /> },
  { path: "appointments/:id", element: <AppointmentDetailsPage /> },
  { path: "book", element: <BookAppointmentPage /> },
  { path: "progress", element: <ProgressPage /> },
  { path: "dependents", element: <DependentsPage /> },
  { path: "notifications", element: <NotificationsPage /> },
];

const adminChildren = [
  { index: true, element: <AdminDashboardPage /> },
  { path: "users", element: <AdminUsersPage /> },
  { path: "therapists", element: <AdminTherapistsPage /> },
  { path: "patients", element: <AdminPatientsPage /> },
  { path: "appointments", element: <AdminAppointmentsPage /> },
  { path: "services", element: <AdminServicesPage /> },
  { path: "sessions", element: <AdminSessionsPage /> },
  { path: "payments", element: <AdminPaymentsPage /> },
  { path: "reports", element: <AdminReportsPage /> },
  { path: "profile", element: <AdminProfilePage /> },
];

const therapistChildren = [
  { index: true, element: <TherapistDashboardPage /> },
  { path: "my-appointments", element: <TherapistAppointmentsPage /> },
  { path: "appointments/:id", element: <TherapistAppointmentDetailsPage /> },
  { path: "my-patients", element: <TherapistPatientsPage /> },
  { path: "session-records", element: <TherapistRecordsPage /> },
  { path: "availability", element: <TherapistAvailabilityPage /> },
  { path: "profile", element: <TherapistProfilePage /> },
];

const secretaryChildren = [
  { index: true, element: <SecretaryDashboardPage /> },
  { path: "schedule", element: <SecretarySchedulePage /> },
  { path: "payments", element: <SecretaryPaymentsPage /> },
  { path: "profile", element: <SecretaryProfilePage /> },
];

function createRoleRoutes(role, children) {
  return {
    element: <ProtectedRoute allowedRoles={[role]} />,
    children: [
      {
        element: <StaffDashboardLayout role={role} />,
        children,
      },
    ],
  };
}

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/google/setup", element: <GoogleAccountSetup /> },
  { path: "/auth/callback", element: <GoogleAuthCallback /> },
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "/auth", element: <Auth /> },
      { path: "/login", element: <Auth /> },
      { path: "/signup", element: <Auth /> },
      { path: "/forgot-password", element: <Auth /> },
      { path: "/staff/login", element: <StaffAuth /> },
      { path: "/staff/forgot-password", element: <StaffAuth /> },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["patient"]} />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        errorElement: <RouteErrorBoundary />,
        children: patientChildren,
      },
      {
        path: "/profile",
        element: <DashboardLayout />,
        children: [{ index: true, element: <ProfilePage /> }],
      },
      {
        path: "/settings",
        element: <DashboardLayout />,
        children: [{ index: true, element: <SettingsPage /> }],
      },
    ],
  },
  {
    path: "/staff",
    element: <ProtectedRoute allowedRoles={staffRoles} />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <StaffDashboardRedirect /> },
      { path: "dashboard", element: <StaffDashboardRedirect /> },
      {
        path: "payments",
        element: <ProtectedRoute allowedRoles={["admin", "secretary"]} />,
        children: [
          {
            element: <StaffDashboardLayout />,
            children: [{ index: true, element: <StaffPaymentsPage /> }],
          },
        ],
      },
      { path: "admin", ...createRoleRoutes("admin", adminChildren) },
      {
        path: "users",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            element: <StaffDashboardLayout role="admin" />,
            children: [{ index: true, element: <AdminUsersPage /> }],
          },
        ],
      },
      {
        path: "therapist",
        ...createRoleRoutes("therapist", therapistChildren),
      },
      {
        path: "appointments",
        element: <ProtectedRoute allowedRoles={["admin", "therapist"]} />,
        children: [
          {
            element: <StaffDashboardLayout />,
            children: [
              { index: true, element: <StaffAppointmentsPage /> },
              { path: ":id", element: <TherapistAppointmentDetailsPage /> },
            ],
          },
        ],
      },
      {
        path: "patients",
        element: <ProtectedRoute allowedRoles={["therapist"]} />,
        children: [
          {
            element: <StaffDashboardLayout role="therapist" />,
            children: [{ index: true, element: <TherapistPatientsPage /> }],
          },
        ],
      },
      {
        path: "sessions",
        element: <ProtectedRoute allowedRoles={["therapist"]} />,
        children: [
          {
            element: <StaffDashboardLayout role="therapist" />,
            children: [{ index: true, element: <TherapistRecordsPage /> }],
          },
        ],
      },
      {
        path: "availability",
        element: <ProtectedRoute allowedRoles={["therapist"]} />,
        children: [
          {
            element: <StaffDashboardLayout role="therapist" />,
            children: [{ index: true, element: <TherapistAvailabilityPage /> }],
          },
        ],
      },
      {
        path: "secretary",
        ...createRoleRoutes("secretary", secretaryChildren),
      },
      {
        path: "schedule",
        element: <ProtectedRoute allowedRoles={["secretary"]} />,
        children: [
          {
            element: <StaffDashboardLayout role="secretary" />,
            children: [{ index: true, element: <SecretarySchedulePage /> }],
          },
        ],
      },
      {
        path: "profile",
        element: <ProtectedRoute allowedRoles={["secretary"]} />,
        children: [
          {
            element: <StaffDashboardLayout role="secretary" />,
            children: [{ index: true, element: <SecretaryProfilePage /> }],
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
