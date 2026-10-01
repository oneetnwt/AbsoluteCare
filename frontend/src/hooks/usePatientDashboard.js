import { useCallback, useEffect, useState } from "react";
import { getApiErrorMessage } from "../services/api/authApi";
import {
  getAppointments,
  getCurrentPatient,
  getSessions,
  getUnreadNotificationCount,
} from "../services/api/patientApi";

const initialState = {
  profile: null,
  appointments: [],
  sessionHistory: [],
  dependents: [],
  upcomingAppointment: null,
  sessionsCompleted: 0,
  treatmentPlan: null,
  announcement: null,
  pendingCount: 0,
  unreadNotificationCount: 0,
};

function normalizeProfile(user) {
  if (!user) return null;

  const firstName = user.firstname || user.firstName || "";
  const lastName = user.lastname || user.lastName || "";
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  return {
    ...user,
    firstName,
    lastName,
    initials: initials || "AC",
  };
}

export function usePatientDashboard() {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const requestProfile = useCallback(async () => {
    const response = await getCurrentPatient();
    return normalizeProfile(response.data?.user || response.data);
  }, []);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [
        profile,
        pendingResponse,
        upcomingResponse,
        sessionsResponse,
        unreadResponse,
      ] = await Promise.all([
        requestProfile(),
        getAppointments("pending"),
        getAppointments("upcoming"),
        getSessions(),
        getUnreadNotificationCount(),
      ]);
      const appointments = upcomingResponse.data?.appointments || [];
      const sessionHistory = sessionsResponse.data?.sessions || [];
      setState((currentState) => ({
        ...currentState,
        profile,
        appointments,
        sessionHistory,
        upcomingAppointment: appointments[0] || null,
        sessionsCompleted: sessionHistory.length,
        pendingCount: pendingResponse.data?.total || 0,
        unreadNotificationCount: unreadResponse.data?.count || 0,
      }));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [requestProfile]);

  useEffect(() => {
    let active = true;

    Promise.all([
      requestProfile(),
      getAppointments("pending"),
      getAppointments("upcoming"),
      getSessions(),
      getUnreadNotificationCount(),
    ])
      .then(
        ([
          profile,
          pendingResponse,
          upcomingResponse,
          sessionsResponse,
          unreadResponse,
        ]) => {
          if (!active) return;
          const appointments = upcomingResponse.data?.appointments || [];
          const sessionHistory = sessionsResponse.data?.sessions || [];
          setState((currentState) => ({
            ...currentState,
            profile,
            appointments,
            sessionHistory,
            upcomingAppointment: appointments[0] || null,
            sessionsCompleted: sessionHistory.length,
            pendingCount: pendingResponse.data?.total || 0,
            unreadNotificationCount: unreadResponse.data?.count || 0,
          }));
        },
      )
      .catch((requestError) => {
        if (active) setError(getApiErrorMessage(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [requestProfile]);

  return { ...state, loading, error, retry: loadDashboard };
}
