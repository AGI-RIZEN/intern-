export const weeklyIncidents = [
  { day: "Mon", incidents: 2, resolved: 2 },
  { day: "Tue", incidents: 1, resolved: 1 },
  { day: "Wed", incidents: 4, resolved: 3 },
  { day: "Thu", incidents: 3, resolved: 3 },
  { day: "Fri", incidents: 5, resolved: 4 },
  { day: "Sat", incidents: 1, resolved: 1 },
  { day: "Sun", incidents: 2, resolved: 2 },
];

export const uptimeByRegion = [
  { region: "us-east-1", uptime: 99.98 },
  { region: "us-west-2", uptime: 99.91 },
  { region: "eu-west-1", uptime: 99.95 },
  { region: "ap-south-1", uptime: 99.72 },
];

export const costByProvider = [
  { name: "AWS", value: 62, color: "var(--color-brand-500)" },
  { name: "GCP", value: 24, color: "var(--color-info-500)" },
  { name: "Azure", value: 14, color: "var(--color-warning-500)" },
];

export const monthlySummary = {
  totalIncidents: 18,
  mttrMinutes: 34,
  uptimePercent: 99.91,
  costTrendPercent: -4.2,
};
