import { AlertTriangle, RefreshCw } from "lucide-react";

export function LoadingRows({ rows = 5 }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      <span className="sr-only">Turateganya... ibyanditswe birimo gupakurwa.</span>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-14 animate-pulse rounded-xl bg-slate-100"
          style={{ animationDelay: `${index * 80}ms` }}
        />
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50/70 px-6 py-10 text-center"
    >
      <AlertTriangle className="text-rose-500" size={28} aria-hidden="true" />
      <p className="font-medium text-rose-800">
        Ibyanditswe ntibishoboye gupakurwa.
      </p>
      {message ? <p className="text-sm text-rose-600">{message}</p> : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
        >
          <RefreshCw size={15} aria-hidden="true" />
          Gerageza ukundi
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, hint }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
      <p className="text-lg font-medium text-slate-700">{title}</p>
      {hint ? <p className="mt-1 text-sm text-slate-500">{hint}</p> : null}
    </div>
  );
}
