import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import clsx from "clsx";
import { Check, AlertTriangle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/common/Card";
import { StatusDot } from "@/components/common/StatusDot";
import { EmptyState } from "@/components/common/EmptyState";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { alerts as initialAlerts, severityMeta } from "@/data/alerts";

const SEVERITY_OPTIONS = ["all", "critical", "warning", "info"];

export default function Alerts() {
  const { onOpenMobile } = useOutletContext();
  const [alerts, setAlerts] = useState(initialAlerts);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("all");
  const debouncedSearch = useDebouncedValue(search, 150);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return alerts.filter((a) => {
      const matchesSeverity = severity === "all" || a.severity === severity;
      const matchesSearch =
        !q || a.title.toLowerCase().includes(q) || a.server.toLowerCase().includes(q) || a.region.toLowerCase().includes(q);
      return matchesSeverity && matchesSearch;
    });
  }, [alerts, debouncedSearch, severity]);

  function toggleAck(id) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a)));
  }

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="flex flex-1 flex-col">
      <Header
        title="Alerts"
        subtitle={`${unacknowledgedCount} unacknowledged of ${alerts.length} total`}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search alerts, servers..."
        onOpenMobile={onOpenMobile}
      />

      <main className="flex-1 space-y-4 p-4 sm:p-6">
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            {SEVERITY_OPTIONS.map((opt) => {
              const active = severity === opt;
              const meta = opt === "all" ? null : severityMeta[opt];
              const count = opt === "all" ? alerts.length : alerts.filter((a) => a.severity === opt).length;
              return (
                <button
                  key={opt}
                  onClick={() => setSeverity(opt)}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                    active
                      ? "border-brand-500 bg-brand-500/12 text-brand-600 dark:text-brand-400"
                      : "border-border-subtle text-text-secondary hover:bg-surface-hover"
                  )}
                >
                  {meta && <span className={clsx("h-1.5 w-1.5 rounded-full", meta.dot)} />}
                  {opt}
                  <span className="font-mono text-text-muted">{count}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          {filtered.length === 0 ? (
            <EmptyState
              icon={AlertTriangle}
              title="No alerts match your filters"
              message="Try a different severity or search term."
            />
          ) : (
            <ul className="divide-y divide-border-subtle">
              {filtered.map((alert) => {
                const meta = severityMeta[alert.severity];
                return (
                  <li key={alert.id} className={clsx("flex items-start gap-4 p-4 sm:p-5", alert.acknowledged && "opacity-70")}>
                    <span className="mt-1.5">
                      <StatusDot colorClass={meta.dot} size="lg" pulse={alert.severity === "critical" && !alert.acknowledged} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-text-primary">{alert.title}</p>
                        <span className={clsx("rounded-full px-2 py-0.5 text-[11px] font-medium capitalize", meta.bg, meta.text)}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-text-secondary">{alert.message}</p>
                      <p className="mt-2 text-xs text-text-muted">
                        {alert.server} · {alert.region} · {alert.time}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleAck(alert.id)}
                      className={clsx(
                        "flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                        alert.acknowledged
                          ? "border-border-subtle text-text-secondary hover:bg-surface-hover"
                          : "border-brand-500 bg-brand-500/12 text-brand-600 hover:bg-brand-500/20 dark:text-brand-400"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{alert.acknowledged ? "Acknowledged" : "Acknowledge"}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </main>
    </div>
  );
}
