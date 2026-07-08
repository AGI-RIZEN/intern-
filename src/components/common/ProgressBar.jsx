import clsx from "clsx";

function levelColor(value) {
  if (value >= 90) return "bg-critical-500";
  if (value >= 70) return "bg-warning-500";
  return "bg-brand-500";
}

export function ProgressBar({ value, label, showValue = true, className }) {
  const color = levelColor(value);
  return (
    <div className={clsx("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label && <span className="text-text-secondary">{label}</span>}
          {showValue && <span className="font-mono font-tabular text-text-primary">{value}%</span>}
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
        <div
          className={clsx("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
