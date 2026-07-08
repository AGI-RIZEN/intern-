// Static dataset simulating a fleet of monitored cloud instances.
// In a real deployment this would be replaced by a live metrics API.

export const servers = [
  { id: "srv-001", name: "api-gateway-01", region: "us-east-1", provider: "AWS", type: "c6g.xlarge", status: "healthy", cpu: 42, memory: 58, disk: 61, uptime: "142d 6h", ip: "10.0.4.11" },
  { id: "srv-002", name: "api-gateway-02", region: "us-east-1", provider: "AWS", type: "c6g.xlarge", status: "healthy", cpu: 38, memory: 55, disk: 60, uptime: "142d 6h", ip: "10.0.4.12" },
  { id: "srv-003", name: "auth-service-01", region: "us-east-1", provider: "AWS", type: "m6i.large", status: "warning", cpu: 76, memory: 81, disk: 55, uptime: "88d 2h", ip: "10.0.4.20" },
  { id: "srv-004", name: "orders-db-primary", region: "us-west-2", provider: "AWS", type: "r6g.2xlarge", status: "critical", cpu: 91, memory: 94, disk: 88, uptime: "301d 14h", ip: "10.1.2.5" },
  { id: "srv-005", name: "orders-db-replica", region: "us-west-2", provider: "AWS", type: "r6g.2xlarge", status: "healthy", cpu: 33, memory: 47, disk: 74, uptime: "301d 14h", ip: "10.1.2.6" },
  { id: "srv-006", name: "cache-redis-01", region: "eu-west-1", provider: "GCP", type: "n2-highmem-4", status: "healthy", cpu: 21, memory: 63, disk: 30, uptime: "210d 1h", ip: "10.2.0.9" },
  { id: "srv-007", name: "cache-redis-02", region: "eu-west-1", provider: "GCP", type: "n2-highmem-4", status: "healthy", cpu: 19, memory: 60, disk: 29, uptime: "210d 1h", ip: "10.2.0.10" },
  { id: "srv-008", name: "worker-queue-01", region: "eu-west-1", provider: "GCP", type: "n2-standard-8", status: "warning", cpu: 68, memory: 72, disk: 47, uptime: "56d 19h", ip: "10.2.1.4" },
  { id: "srv-009", name: "cdn-edge-ap-01", region: "ap-south-1", provider: "Azure", type: "D4s v5", status: "healthy", cpu: 27, memory: 41, disk: 22, uptime: "175d 9h", ip: "10.3.0.2" },
  { id: "srv-010", name: "analytics-etl-01", region: "ap-south-1", provider: "Azure", type: "D8s v5", status: "critical", cpu: 95, memory: 88, disk: 92, uptime: "12d 3h", ip: "10.3.1.7" },
  { id: "srv-011", name: "search-indexer-01", region: "us-east-1", provider: "AWS", type: "m6i.xlarge", status: "healthy", cpu: 44, memory: 52, disk: 66, uptime: "97d 11h", ip: "10.0.5.3" },
  { id: "srv-012", name: "notif-service-01", region: "us-west-2", provider: "AWS", type: "t3.large", status: "offline", cpu: 0, memory: 0, disk: 40, uptime: "0h", ip: "10.1.3.9" },
];

export const statusMeta = {
  healthy: { label: "Healthy", dot: "bg-success-500", text: "text-success-600 dark:text-success-400", bg: "bg-success-500/10", ring: "ring-success-500/20" },
  warning: { label: "Warning", dot: "bg-warning-500", text: "text-warning-600 dark:text-warning-400", bg: "bg-warning-500/10", ring: "ring-warning-500/20" },
  critical: { label: "Critical", dot: "bg-critical-500", text: "text-critical-600 dark:text-critical-400", bg: "bg-critical-500/10", ring: "ring-critical-500/20" },
  offline: { label: "Offline", dot: "bg-text-muted", text: "text-text-muted", bg: "bg-text-muted/10", ring: "ring-text-muted/20" },
};

export const regions = [...new Set(servers.map((s) => s.region))];
export const providers = [...new Set(servers.map((s) => s.provider))];
