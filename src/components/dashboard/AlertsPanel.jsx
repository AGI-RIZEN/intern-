import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/common/Card";
import { StatusDot } from "@/components/common/StatusDot";
import { alerts, severityMeta } from "@/data/alerts";

export function AlertsPanel() {
  const topAlerts = alerts.slice(0, 4);

  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold text-text-primary">Recent Alerts</h3>
          <p className="text-xs text-text-secondary">Latest events across the fleet</p>
        </div>
        <Link
          to="/alerts"
          className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ul className="divide-y divide-border-subtle">
        {topAlerts.map((alert) => {
          const meta = severityMeta[alert.severity];
          return (
            <li key={alert.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              <span className="mt-1.5">
                <StatusDot colorClass={meta.dot} pulse={alert.severity === "critical" && !alert.acknowledged} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-primary">{alert.title}</p>
                <p className="truncate text-xs text-text-secondary">
                  {alert.server} · {alert.region}
                </p>
              </div>
              <span className="shrink-0 whitespace-nowrap text-xs text-text-muted">{alert.time}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
