import { SearchX } from "lucide-react";

export function EmptyState({ title = "No results", message = "Try a different search or filter.", icon: Icon = SearchX }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-hover">
        <Icon className="h-5 w-5 text-text-muted" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="mt-1 text-sm text-text-secondary">{message}</p>
      </div>
    </div>
  );
}
