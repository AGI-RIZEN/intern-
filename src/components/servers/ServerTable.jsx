import { useMemo, useState } from "react";
import clsx from "clsx";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { ProgressBar } from "@/components/common/ProgressBar";
import { EmptyState } from "@/components/common/EmptyState";
import { statusMeta } from "@/data/servers";

const COLUMNS = [
  { key: "name", label: "Server" },
  { key: "region", label: "Region" },
  { key: "status", label: "Status" },
  { key: "cpu", label: "CPU" },
  { key: "memory", label: "Memory" },
  { key: "disk", label: "Disk" },
  { key: "uptime", label: "Uptime" },
];

function SortIcon({ active, direction }) {
  if (!active) return <ArrowUpDown className="h-3.5 w-3.5 text-text-muted" />;
  return direction === "asc" ? (
    <ArrowUp className="h-3.5 w-3.5 text-brand-500" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5 text-brand-500" />
  );
}

export function ServerTable({ servers, pageSize = 8 }) {
  const [sortKey, setSortKey] = useState("status");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);

  const statusRank = { critical: 0, warning: 1, healthy: 2, offline: 3 };

  const sorted = useMemo(() => {
    const copy = [...servers];
    copy.sort((a, b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (sortKey === "status") {
        av = statusRank[a.status];
        bv = statusRank[b.status];
      }
      if (typeof av === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return copy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servers, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice(page * pageSize, page * pageSize + pageSize);

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  }

  if (servers.length === 0) {
    return <EmptyState title="No servers match your filters" message="Adjust the search term or status filter to see more results." />;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs text-text-secondary">
              {COLUMNS.map((col) => (
                <th key={col.key} className="whitespace-nowrap px-4 py-3 font-medium first:pl-0">
                  <button
                    onClick={() => toggleSort(col.key)}
                    className="flex items-center gap-1.5 transition-colors hover:text-text-primary"
                  >
                    {col.label}
                    <SortIcon active={sortKey === col.key} direction={sortDir} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((server) => {
              const meta = statusMeta[server.status];
              return (
                <tr
                  key={server.id}
                  className="border-b border-border-subtle transition-colors last:border-0 hover:bg-surface-hover"
                >
                  <td className="whitespace-nowrap px-4 py-3 pl-0">
                    <p className="font-medium text-text-primary">{server.name}</p>
                    <p className="font-mono text-xs text-text-muted">{server.ip}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-text-secondary">{server.region}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Badge
                      label={meta.label}
                      dotClass={meta.dot}
                      textClass={meta.text}
                      bgClass={meta.bg}
                      pulse={server.status === "critical"}
                    />
                  </td>
                  <td className="w-32 px-4 py-3">
                    <ProgressBar value={server.cpu} showValue={false} />
                    <span className="mt-1 block font-mono text-xs text-text-secondary">{server.cpu}%</span>
                  </td>
                  <td className="w-32 px-4 py-3">
                    <ProgressBar value={server.memory} showValue={false} />
                    <span className="mt-1 block font-mono text-xs text-text-secondary">{server.memory}%</span>
                  </td>
                  <td className="w-32 px-4 py-3">
                    <ProgressBar value={server.disk} showValue={false} />
                    <span className="mt-1 block font-mono text-xs text-text-secondary">{server.disk}%</span>
                  </td>
                  <td className={clsx("whitespace-nowrap px-4 py-3 font-mono text-xs text-text-secondary")}>{server.uptime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-xs text-text-secondary">
          <span>
            Showing <span className="font-mono">{page * pageSize + 1}</span>–
            <span className="font-mono">{Math.min(sorted.length, (page + 1) * pageSize)}</span> of{" "}
            <span className="font-mono">{sorted.length}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-md border border-border-subtle px-2.5 py-1 font-medium text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="rounded-md border border-border-subtle px-2.5 py-1 font-medium text-text-secondary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
