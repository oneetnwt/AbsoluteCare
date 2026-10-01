import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RouteErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText || `Request failed with status ${error.status}.`
    : error instanceof Error
      ? error.message
      : "This page could not be loaded.";

  return (
    <main className="route-error-page">
      <section className="route-error-panel">
        <span className="staff-page-eyebrow">AbsoluteCare</span>
        <h1>That page needs another look.</h1>
        <p>{message}</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload page
        </button>
      </section>
    </main>
  );
}
