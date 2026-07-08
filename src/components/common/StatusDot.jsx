import clsx from "clsx";

/**
 * Small status indicator dot. Critical states get a soft pulsing glow so
 * incident-worthy rows draw the eye without shouting in color alone.
 */
export function StatusDot({ colorClass, pulse = false, size = "sm" }) {
  const dims = size === "lg" ? "h-2.5 w-2.5" : "h-2 w-2";
  return (
    <span className="relative inline-flex items-center justify-center">
      {pulse && (
        <span
          className={clsx("absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping", colorClass)}
          style={{ animationDuration: "1.8s" }}
        />
      )}
      <span className={clsx("relative inline-flex rounded-full", dims, colorClass)} />
    </span>
  );
}
