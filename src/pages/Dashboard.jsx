import { useOutletContext, useNavigate } from "react-router-dom";
import { Server, Cpu, MemoryStick, HardDrive, Network, BellRing } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { UtilizationChart } from "@/components/dashboard/UtilizationChart";
import { ServerHealthChart } from "@/components/dashboard/ServerHealthChart";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { sparklines } from "@/data/metrics";
import { servers } from "@/data/servers";
import { alerts } from "@/data/alerts";

export default function Dashboard() {
  const { onOpenMobile } = useOutletContext();
  const navigate = useNavigate();

  const activeServers = servers.filter((s) => s.status !== "offline").length;
  const avgCpu = Math.round(servers.reduce((sum, s) => sum + s.cpu, 0) / servers.length);
  const avgMemory = Math.round(servers.reduce((sum, s) => sum + s.memory, 0) / servers.length);
  const avgDisk = Math.round(servers.reduce((sum, s) => sum + s.disk, 0) / servers.length);
  const activeAlerts = alerts.filter((a) => !a.acknowledged).length;
  const criticalAlerts = alerts.filter((a) => a.severity === "critical" && !a.acknowledged).length;

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Dashboard" subtitle="Real-time overview of your cloud infrastructure" onOpenMobile={onOpenMobile} />

      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Active Servers"
            value={activeServers}
            icon={Server}
            accent="brand"
            delta={2}
            trend="up"
            deltaLabel="added vs last 24h"
            sparkline={sparklines.activeServers}
            sparklineColor="var(--color-brand-500)"
          />
          <StatCard
            label="Avg CPU Usage"
            value={avgCpu}
            unit="%"
            icon={Cpu}
            accent="info"
            delta={4.2}
            trend="down"
            sparkline={sparklines.cpu}
            sparklineColor="var(--color-info-500)"
          />
          <StatCard
            label="Avg Memory Usage"
            value={avgMemory}
            unit="%"
            icon={MemoryStick}
            accent="warning"
            delta={1.8}
            trend="down"
            sparkline={sparklines.memory}
            sparklineColor="var(--color-warning-500)"
          />
          <StatCard
            label="Avg Disk Usage"
            value={avgDisk}
            unit="%"
            icon={HardDrive}
            accent="brand"
            delta={-0.6}
            trend="down"
            sparkline={sparklines.disk}
            sparklineColor="var(--color-brand-500)"
          />
          <StatCard
            label="Network Traffic"
            value="3.2"
            unit="TB/day"
            icon={Network}
            accent="info"
            delta={12}
            trend="down"
            sparkline={sparklines.network}
            sparklineColor="var(--color-info-500)"
          />
          <button onClick={() => navigate("/alerts")} className="text-left">
            <StatCard
              label="Active Alerts"
              value={activeAlerts}
              icon={BellRing}
              accent="critical"
              delta={criticalAlerts}
              trend="down"
              deltaLabel="critical"
              sparkline={sparklines.alerts}
              sparklineColor="var(--color-critical-500)"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <UtilizationChart />
          <ServerHealthChart />
        </div>

        <AlertsPanel />
      </main>
    </div>
  );
}
