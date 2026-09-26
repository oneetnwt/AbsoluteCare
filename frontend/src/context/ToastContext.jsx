import { useCallback, useState } from "react";
import { CircleCheck, Info, X } from "lucide-react";
import { ToastContext } from "./ToastContext.js";

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, tone = "info") => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, message, tone }]);
      window.setTimeout(() => dismissToast(id), 4200);
    },
    [dismissToast],
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 bottom-4 z-60 flex flex-col items-end gap-2 sm:left-auto sm:w-96"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex w-full items-start gap-3 rounded-lg border border-care-line bg-white p-4 text-sm text-care-ink shadow-xl dark:border-care-night-line dark:bg-care-night-panel dark:text-care-night-ink"
            role="status"
          >
            {toast.tone === "success" ? (
              <CircleCheck
                className="mt-0.5 size-5 shrink-0 text-care-green-700 dark:text-care-green-100"
                aria-hidden="true"
              />
            ) : (
              <Info
                className="mt-0.5 size-5 shrink-0 text-care-blue-700 dark:text-care-blue-100"
                aria-hidden="true"
              />
            )}
            <p className="min-w-0 flex-1 leading-relaxed">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="grid size-6 shrink-0 place-items-center rounded-md text-care-muted transition-colors hover:bg-care-canvas hover:text-care-ink dark:text-care-night-muted dark:hover:bg-care-night-card dark:hover:text-care-night-ink"
              aria-label="Dismiss notification"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export { ToastProvider };
