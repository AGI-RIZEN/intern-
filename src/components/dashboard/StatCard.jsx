import clsx from "clsx";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Sparkline } from "@/components/common/Sparkline";
import { Card } from "@/components/common/Card";

// Static class lookups — Tailwind's scanner needs literal strings, not interpolation.
const ACCENT_ICON_BG = {
  brand: "bg-brand-500/12",
  success: "bg-success-500/12",
  warning: "bg-warning-500/12",
  critical: "bg-critical-500/12",
  info: "bg-info-500/12",
};
const ACCENT_ICON_TEXT = {
  brand: "text-brand-500",
  success: "text-success-500",
  warning: "text-warning-500",
  critical: "text-critical-500",
  info: "text-info-500",
};

export function StatCard({ label, value, unit, icon: Icon, delta, deltaLabel = "vs last 24h", trend = "up", sparkline, sparklineColor, accent = "brand" }) {
  const isPositiveGood = trend === "up" ? delta >= 0 : delta < 0;
  const TrendIcon = delta >= 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-text-secondary">{label}</p>
        {Icon && (
          <div className={clsx("flex h-8 w-8 items-center justify-center rounded-lg", ACCENT_ICON_BG[accent])}>
            <Icon className={clsx("h-4 w-4", ACCENT_ICON_TEXT[accent])} strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-mono font-tabular text-[28px] font-semibold leading-none text-text-primary">{value}</span>
        {unit && <span className="text-sm font-medium text-text-secondary">{unit}</span>}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs">
          <TrendIcon className={clsx("h-3.5 w-3.5", isPositiveGood ? "text-success-500" : "text-critical-500")} />
          <span className={clsx("font-mono font-medium", isPositiveGood ? "text-success-600 dark:text-success-400" : "text-critical-600 dark:text-critical-400")}>
            {delta >= 0 ? "+" : ""}
            {delta}
            {unit === "%" ? "%" : ""}
          </span>
          <span className="text-text-muted">{deltaLabel}</span>
        </div>
      </div>

      {sparkline && (
        <div className="mt-3 -mb-1">
          <Sparkline data={sparkline} color={sparklineColor} height={36} />
        </div>
      )}
    </Card>
  );
}
