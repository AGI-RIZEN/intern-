// 24-hour fleet-wide utilization series (sampled hourly) driving the charts.
export const utilizationHistory = [
  { time: "00:00", cpu: 32, memory: 48 },
  { time: "01:00", cpu: 29, memory: 47 },
  { time: "02:00", cpu: 27, memory: 46 },
  { time: "03:00", cpu: 25, memory: 45 },
  { time: "04:00", cpu: 24, memory: 44 },
  { time: "05:00", cpu: 26, memory: 45 },
  { time: "06:00", cpu: 31, memory: 49 },
  { time: "07:00", cpu: 40, memory: 53 },
  { time: "08:00", cpu: 52, memory: 58 },
  { time: "09:00", cpu: 63, memory: 64 },
  { time: "10:00", cpu: 71, memory: 69 },
  { time: "11:00", cpu: 76, memory: 73 },
  { time: "12:00", cpu: 74, memory: 74 },
  { time: "13:00", cpu: 69, memory: 71 },
  { time: "14:00", cpu: 66, memory: 70 },
  { time: "15:00", cpu: 68, memory: 71 },
  { time: "16:00", cpu: 70, memory: 72 },
  { time: "17:00", cpu: 64, memory: 68 },
  { time: "18:00", cpu: 58, memory: 65 },
  { time: "19:00", cpu: 53, memory: 62 },
  { time: "20:00", cpu: 49, memory: 60 },
  { time: "21:00", cpu: 46, memory: 59 },
  { time: "22:00", cpu: 44, memory: 58 },
  { time: "23:00", cpu: 51, memory: 62 },
];

export const networkHistory = [
  { time: "00:00", inbound: 1.1, outbound: 0.8 },
  { time: "02:00", inbound: 0.9, outbound: 0.6 },
  { time: "04:00", inbound: 0.7, outbound: 0.5 },
  { time: "06:00", inbound: 1.3, outbound: 0.9 },
  { time: "08:00", inbound: 2.4, outbound: 1.6 },
  { time: "10:00", inbound: 3.1, outbound: 2.2 },
  { time: "12:00", inbound: 3.4, outbound: 2.5 },
  { time: "14:00", inbound: 3.0, outbound: 2.1 },
  { time: "16:00", inbound: 2.8, outbound: 2.0 },
  { time: "18:00", inbound: 2.2, outbound: 1.5 },
  { time: "20:00", inbound: 1.7, outbound: 1.1 },
  { time: "22:00", inbound: 1.4, outbound: 0.9 },
];

// Per-card sparkline samples (last ~12 samples), independent of the main chart.
export const sparklines = {
  activeServers: [10, 10, 11, 11, 11, 12, 12, 12, 11, 12, 12, 12],
  cpu: [44, 46, 49, 55, 61, 68, 71, 66, 60, 56, 53, 51],
  memory: [55, 56, 58, 60, 63, 66, 68, 67, 65, 64, 63, 62],
  disk: [55, 55, 56, 56, 57, 57, 58, 58, 57, 57, 57, 57],
  network: [1.6, 1.8, 2.1, 2.6, 3.0, 3.4, 3.3, 3.0, 2.7, 2.4, 2.0, 1.7],
  alerts: [2, 2, 3, 3, 2, 3, 4, 4, 3, 4, 4, 4],
};

export const serverHealthDistribution = [
  { name: "Healthy", value: 7, color: "var(--color-success-500)" },
  { name: "Warning", value: 2, color: "var(--color-warning-500)" },
  { name: "Critical", value: 2, color: "var(--color-critical-500)" },
  { name: "Offline", value: 1, color: "var(--text-muted)" },
];
