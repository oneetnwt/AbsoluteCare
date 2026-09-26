import { useCallback, useEffect, useState } from "react";
import { getApiErrorMessage } from "../services/api/authApi";
import { getCurrentPatient } from "../services/api/patientApi";

const initialState = {
  profile: null,
  appointments: [],
  sessionHistory: [],
  dependents: [],
  upcomingAppointment: null,
  sessionsCompleted: 0,
  treatmentPlan: null,
  announcement: null,
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
    return normalizeProfile(response.data);
  }, []);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const profile = await requestProfile();
      setState((currentState) => ({ ...currentState, profile }));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [requestProfile]);

  useEffect(() => {
    let active = true;

    requestProfile()
      .then((profile) => {
        if (active) setState((currentState) => ({ ...currentState, profile }));
      })
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
