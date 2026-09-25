import { Navigate, useLocation, useNavigate } from "react-router-dom";
import PortalPage from "../pages/PortalPage";
import { clearStoredUser, getStoredUser } from "../auth/authStorage";

const supportedRoles = new Set([
  "user",
  "patient",
  "therapist",
  "admin",
  "secretary",
]);

function ProtectedRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const role = user.role === "user" ? "patient" : user.role;
  if (!supportedRoles.has(user.role) || !supportedRoles.has(role)) {
    return <Navigate to="/login" replace />;
  }

  const logout = () => {
    clearStoredUser();
    navigate("/");
  };

  return <PortalPage role={role} onNavigate={navigate} onLogout={logout} />;
}

export default ProtectedRoute;
