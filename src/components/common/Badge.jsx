import clsx from "clsx";
import { StatusDot } from "./StatusDot";

export function Badge({ label, dotClass, textClass, bgClass, pulse = false, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        bgClass,
        textClass,
        className
      )}
    >
      <StatusDot colorClass={dotClass} pulse={pulse} />
      {label}
    </span>
  );
}
