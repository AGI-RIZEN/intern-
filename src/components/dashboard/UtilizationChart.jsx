import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/common/Card";
import { utilizationHistory } from "@/data/metrics";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border-subtle bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-medium text-text-secondary">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center gap-1.5 font-mono font-tabular text-text-primary">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
          {p.dataKey === "cpu" ? "CPU" : "Memory"}: {p.value}%
        </p>
      ))}
    </div>
  );
}

export function UtilizationChart() {
  return (
    <Card className="col-span-1 p-5 lg:col-span-2">
      <div className="mb-1 flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold text-text-primary">CPU &amp; Memory Utilization</h3>
          <p className="text-xs text-text-secondary">Fleet-wide average over the last 24 hours</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-500" /> CPU
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-info-500" /> Memory
          </span>
        </div>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={utilizationHistory} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="cpuFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="memFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-info-500)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-info-500)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--border-subtle)" }}
              interval={3}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              width={38}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="cpu" stroke="var(--color-brand-500)" strokeWidth={2} fill="url(#cpuFill)" />
            <Area type="monotone" dataKey="memory" stroke="var(--color-info-500)" strokeWidth={2} fill="url(#memFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
