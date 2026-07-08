import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/common/Card";
import { StatusFilter } from "@/components/servers/StatusFilter";
import { ServerTable } from "@/components/servers/ServerTable";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { servers } from "@/data/servers";

export default function Servers() {
  const { onOpenMobile } = useOutletContext();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const debouncedSearch = useDebouncedValue(search, 150);

  const counts = useMemo(() => {
    const c = { all: servers.length, healthy: 0, warning: 0, critical: 0, offline: 0 };
    servers.forEach((s) => (c[s.status] += 1));
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return servers.filter((s) => {
      const matchesStatus = status === "all" || s.status === status;
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.ip.includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [debouncedSearch, status]);

  return (
    <div className="flex flex-1 flex-col">
      <Header
        title="Servers"
        subtitle={`${servers.length} instances across ${new Set(servers.map((s) => s.region)).size} regions`}
        search={search}
        onSearchChange={setSearch}
        onOpenMobile={onOpenMobile}
      />

      <main className="flex-1 space-y-4 p-4 sm:p-6">
        <div className="md:hidden">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search servers, regions..."
            className="w-full rounded-lg border border-border-subtle bg-canvas px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          />
        </div>

        <Card className="p-4">
          <StatusFilter value={status} onChange={setStatus} counts={counts} />
        </Card>

        <Card className="p-4 sm:p-5">
          <ServerTable servers={filtered} />
        </Card>
      </main>
    </div>
  );
}
