import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { LayoutDashboard, Server, Bell, BarChart3, PanelLeftClose, PanelLeftOpen, CloudCog } from "lucide-react";
import { alerts } from "@/data/alerts";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/servers", label: "Servers", icon: Server },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

export function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {
  const activeAlerts = alerts.filter((a) => !a.acknowledged).length;

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border-subtle bg-surface transition-all duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-screen",
          collapsed ? "lg:w-[76px]" : "lg:w-64",
          mobileOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"
        )}
      >
        <div className={clsx("flex h-16 shrink-0 items-center gap-2.5 border-b border-border-subtle px-4", collapsed && "lg:justify-center lg:px-0")}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-500">
            <CloudCog className="h-4.5 w-4.5" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div className="min-w-0 font-display leading-tight">
              <p className="truncate text-[15px] font-semibold text-text-primary">Nimbus</p>
              <p className="truncate text-[11px] text-text-muted">Infra Monitor</p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  collapsed && "lg:justify-center lg:px-0",
                  isActive
                    ? "bg-brand-500/12 text-brand-600 dark:text-brand-400"
                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                )
              }
              title={collapsed ? label : undefined}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && label === "Alerts" && activeAlerts > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-critical-500/15 px-1.5 font-mono text-[11px] font-semibold text-critical-600 dark:text-critical-400">
                  {activeAlerts}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border-subtle p-3">
          <button
            onClick={onToggle}
            className={clsx(
              "hidden w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary lg:flex",
              collapsed && "justify-center px-0"
            )}
          >
            {collapsed ? <PanelLeftOpen className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
