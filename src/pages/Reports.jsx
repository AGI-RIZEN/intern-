import { useOutletContext } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingDown, TrendingUp, Clock, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/common/Card";
import { ProgressBar } from "@/components/common/ProgressBar";
import { weeklyIncidents, uptimeByRegion, costByProvider, monthlySummary } from "@/data/reports";

function SummaryTile({ icon: Icon, label, value, sub, positive }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-secondary">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/12">
          <Icon className="h-4 w-4 text-brand-500" />
        </div>
      </div>
      <p className="mt-3 font-mono font-tabular text-2xl font-semibold text-text-primary">{value}</p>
      {sub && (
        <p className={`mt-1 flex items-center gap-1 text-xs ${positive ? "text-success-600 dark:text-success-400" : "text-text-secondary"}`}>
          {sub}
        </p>
      )}
    </Card>
  );
}

export default function Reports() {
  const { onOpenMobile } = useOutletContext();

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Reports" subtitle="Monthly operational summary and trends" onOpenMobile={onOpenMobile} />

      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryTile icon={ShieldCheck} label="Total Incidents" value={monthlySummary.totalIncidents} sub="this month" />
          <SummaryTile icon={Clock} label="Avg. MTTR" value={`${monthlySummary.mttrMinutes}m`} sub="mean time to resolve" />
          <SummaryTile icon={TrendingUp} label="Fleet Uptime" value={`${monthlySummary.uptimePercent}%`} sub="30-day average" positive />
          <SummaryTile
            icon={TrendingDown}
            label="Cost Trend"
            value={`${monthlySummary.costTrendPercent}%`}
            sub="vs previous month"
            positive
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-text-primary">Incidents This Week</h3>
            <p className="text-xs text-text-secondary">Reported vs resolved, daily</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyIncidents} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={{ stroke: "var(--border-subtle)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} tickLine={false} axisLine={false} width={30} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: "var(--bg-surface-hover)" }}
                    contentStyle={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="incidents" name="Reported" fill="var(--color-critical-500)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="resolved" name="Resolved" fill="var(--color-success-500)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-sm font-semibold text-text-primary">Cost by Provider</h3>
            <p className="text-xs text-text-secondary">Share of monthly cloud spend</p>
            <div className="mt-2 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={costByProvider} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="90%" paddingAngle={3} stroke="none">
                    {costByProvider.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-2">
              {costByProvider.map((item) => (
                <li key={item.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-text-secondary">
                    <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                    {item.name}
                  </span>
                  <span className="font-mono font-tabular font-medium text-text-primary">{item.value}%</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="p-5">
          <h3 className="font-display text-sm font-semibold text-text-primary">Uptime by Region</h3>
          <p className="text-xs text-text-secondary">Rolling 30-day availability</p>
          <div className="mt-4 space-y-4">
            {uptimeByRegion.map((r) => (
              <div key={r.region}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-text-primary">{r.region}</span>
                  <span className="font-mono font-tabular text-text-secondary">{r.uptime}%</span>
                </div>
                <ProgressBar value={r.uptime} showValue={false} />
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
