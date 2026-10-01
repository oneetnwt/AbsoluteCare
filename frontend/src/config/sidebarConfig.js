import {
  Activity,
  BarChart3,
  CalendarCheck2,
  CalendarDays,
  CalendarPlus,
  ClipboardList,
  CircleDollarSign,
  LayoutDashboard,
  Stethoscope,
  Settings2,
  UserRound,
  UsersRound,
} from "lucide-react";
import { getStaffRoute, getStaffRole } from "./staffDashboardConfig";

const patientItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
    end: true,
  },
  {
    key: "appointments",
    label: "My appointments",
    icon: CalendarDays,
    to: "/dashboard/appointments",
  },
  {
    key: "book",
    label: "Book appointment",
    icon: CalendarPlus,
    to: "/dashboard/book",
  },
  {
    key: "progress",
    label: "Therapy progress",
    icon: Activity,
    to: "/dashboard/progress",
  },
  {
    key: "dependents",
    label: "My dependents",
    icon: UsersRound,
    to: "/dashboard/dependents",
  },
];

const staffIcons = {
  dashboard: LayoutDashboard,
  users: UsersRound,
  therapists: Stethoscope,
  patients: UserRound,
  appointments: CalendarDays,
  services: ClipboardList,
  payments: CircleDollarSign,
  reports: BarChart3,
  records: ClipboardList,
  availability: Activity,
  profile: Settings2,
};

export function getSidebarConfig(role, badgeCounts = {}) {
  if (role === "patient") {
    return {
      label: "Patient",
      subtitle: "Patient portal",
      navLabel: "Your care",
      helpTitle: "Need a hand?",
      helpText: "Call 0917 715 2780",
      logoutPath: "/login",
      items: patientItems,
    };
  }

  const roleConfig = getStaffRole(role);
  return {
    label: roleConfig.label,
    roleLabel: `${roleConfig.label} access`,
    subtitle: "Staff portal",
    navLabel: "Workspace",
    helpTitle: "Need help?",
    helpText: "Contact clinic admin",
    logoutPath: "/staff/login",
    items: roleConfig.navigation.map(([label, key]) => ({
      key,
      label,
      icon: staffIcons[key] || CalendarCheck2,
      to: getStaffRoute(role, key),
      end: key === "dashboard",
      badge: badgeCounts[key],
    })),
  };
}
