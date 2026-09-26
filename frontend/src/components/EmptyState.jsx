import { FileText } from "lucide-react";

function EmptyState({
  title = "No data yet",
  description = "Your scheduling data will appear here when it is available.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-care-line bg-care-canvas/60 px-6 py-10 text-center dark:border-care-night-line dark:bg-care-night-card/40">
      <div className="grid size-11 place-items-center rounded-2xl bg-care-blue-50 text-care-blue-700 dark:bg-care-blue-900/30 dark:text-care-blue-100">
        <FileText className="size-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-care-ink dark:text-care-night-ink">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-care-muted dark:text-care-night-muted">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl bg-care-green-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-care-green-800 dark:bg-care-green-600 dark:hover:bg-care-green-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
