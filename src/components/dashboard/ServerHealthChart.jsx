import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/common/Card";
import { serverHealthDistribution } from "@/data/metrics";
import { servers } from "@/data/servers";

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-border-subtle bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="flex items-center gap-1.5 font-medium text-text-primary">
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: p.payload.color }} />
        {p.name}: {p.value}
      </p>
    </div>
  );
}

export function ServerHealthChart() {
  const total = servers.length;

  return (
    <Card className="p-5">
      <h3 className="font-display text-sm font-semibold text-text-primary">Server Health</h3>
      <p className="text-xs text-text-secondary">Distribution by status</p>

      <div className="relative mt-2 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={serverHealthDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius="68%"
              outerRadius="92%"
              paddingAngle={3}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {serverHealthDistribution.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<DonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono font-tabular text-3xl font-semibold text-text-primary">{total}</span>
          <span className="text-xs text-text-secondary">servers</span>
        </div>
      </div>

      <ul className="mt-2 space-y-2">
        {serverHealthDistribution.map((item) => (
          <li key={item.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-text-secondary">
              <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span className="font-mono font-tabular font-medium text-text-primary">{item.value}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
