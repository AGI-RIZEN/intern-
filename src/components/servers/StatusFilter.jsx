import clsx from "clsx";
import { statusMeta } from "@/data/servers";

const OPTIONS = ["all", "healthy", "warning", "critical", "offline"];

export function StatusFilter({ value, onChange, counts }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {OPTIONS.map((opt) => {
        const active = value === opt;
        const meta = opt === "all" ? null : statusMeta[opt];
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={clsx(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
              active
                ? "border-brand-500 bg-brand-500/12 text-brand-600 dark:text-brand-400"
                : "border-border-subtle text-text-secondary hover:bg-surface-hover"
            )}
          >
            {meta && <span className={clsx("h-1.5 w-1.5 rounded-full", meta.dot)} />}
            {opt}
            <span className="font-mono text-text-muted">{counts[opt]}</span>
          </button>
        );
      })}
    </div>
  );
}
