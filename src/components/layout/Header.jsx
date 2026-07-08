import { Search, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function Header({ title, subtitle, search, onSearchChange, searchPlaceholder = "Search servers, regions...", onOpenMobile }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border-subtle bg-surface/85 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onOpenMobile}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-hover lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-lg font-semibold leading-tight text-text-primary">{title}</h1>
        {subtitle && <p className="truncate text-xs text-text-secondary">{subtitle}</p>}
      </div>

      {typeof search === "string" && (
        <div className="relative hidden w-72 shrink-0 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-border-subtle bg-canvas py-2 pl-9 pr-8 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          />
          {search && (
            <button
              onClick={() => onSearchChange?.("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      <button
        onClick={toggleTheme}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
        aria-label="Toggle theme"
        title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
      </button>

      <div className="flex shrink-0 items-center gap-2.5 border-l border-border-subtle pl-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/15 font-display text-xs font-semibold text-brand-600 dark:text-brand-400">
          OA
        </div>
        <div className="hidden leading-tight sm:block">
          <p className="text-sm font-medium text-text-primary">Ops Admin</p>
          <p className="text-xs text-text-secondary">SRE Team</p>
        </div>
      </div>
    </header>
  );
}
