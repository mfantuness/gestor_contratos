import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Search } from "lucide-react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Variant = "primary" | "secondary" | "ghost";
type Tone = "default" | "primary" | "success" | "warning" | "error" | "info";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  tone?: Tone;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  tone = "default",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-1.5 rounded px-4 py-2 text-xs font-semibold transition-colors";
  const variants: Record<Variant, string> = {
    primary: "bg-[#1a2b4b] text-white hover:bg-[#14243e]",
    secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };
  const tones: Record<Tone, string> = {
    default: "",
    primary: "bg-[#1a2b4b] text-white hover:bg-[#14243e]",
    success: "bg-[#22c55e] text-white hover:bg-[#16a34a]",
    warning: "bg-[#f59e0b] text-white hover:bg-[#d97706]",
    error: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
    info: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
  };

  return (
    <button className={cn(base, variants[variant], tones[tone], className)} {...props}>
      {icon}
      {children}
    </button>
  );
}

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#1a2b4b] focus:ring-1 focus:ring-[#1a2b4b]",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: ComponentPropsWithoutRef<"select">) {
  return (
    <select
      className={cn(
        "rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#1a2b4b] focus:ring-1 focus:ring-[#1a2b4b]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function SearchField({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <label className={cn("flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-2", className)}>
      <Search size={16} className="text-slate-400" />
      <input
        className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
        type="search"
        {...props}
      />
    </label>
  );
}

export function Badge({ children, tone = "default", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  const toneClasses: Record<Tone, string> = {
    default: "bg-slate-100 text-slate-700",
    primary: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
    info: "bg-sky-100 text-sky-700",
  };

  return <span className={cn("rounded px-2 py-0.5 text-[9px] font-bold uppercase", toneClasses[tone], className)}>{children}</span>;
}

export function StatusBadge({ label, tone = "default" }: { label: string; tone?: Tone }) {
  return <Badge tone={tone}>{label}</Badge>;
}

export function PanelCard({
  title,
  subtitle,
  children,
  className,
  headerActions,
  bodyClassName,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]", className)}>
      {(title || subtitle || headerActions) && (
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div>
            {title && <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          {headerActions}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function MetricCard({ label, value, trend, tone = "default", className }: { label: string; value: string; trend: string; tone?: Tone; className?: string }) {
  const borderClasses: Record<Tone, string> = {
    default: "border-slate-300",
    primary: "border-[#1a2b4b]",
    success: "border-[#22c55e]",
    warning: "border-[#f59e0b]",
    error: "border-[#ef4444]",
    info: "border-[#3b82f6]",
  };
  const trendClasses: Record<Tone, string> = {
    default: "text-slate-600",
    primary: "text-[#1a2b4b]",
    success: "text-[#22c55e]",
    warning: "text-[#f59e0b]",
    error: "text-[#ef4444]",
    info: "text-[#3b82f6]",
  };

  return (
    <div className={cn("rounded-lg border-l-4 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)]", borderClasses[tone], className)}>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="flex flex-col gap-1">
        <span className="text-xl font-black text-slate-800 leading-tight">{value}</span>
        <span className={cn("text-[10px] font-bold", trendClasses[tone])}>{trend}</span>
      </div>
    </div>
  );
}

export function ProgressBar({ label, value, tone = "success" }: { label: string; value: number; tone?: Tone }) {
  const colorClasses: Record<Tone, string> = {
    default: "bg-slate-500",
    primary: "bg-[#1a2b4b]",
    success: "bg-[#22c55e]",
    warning: "bg-[#f59e0b]",
    error: "bg-[#ef4444]",
    info: "bg-[#3b82f6]",
  };

  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px]">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-bold text-slate-600">{value}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full", colorClasses[tone])} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="mb-4 flex items-center gap-2 text-xs text-slate-500">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          {index > 0 && <span>/</span>}
          {item.href ? (
            <a className="hover:text-[#1a2b4b]" href={item.href}>
              {item.label}
            </a>
          ) : (
            <span className="font-semibold text-slate-700">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export function SectionTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: {
  tabs: Array<{ id: string; label: string }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("border-b border-slate-200", className)}>
      <nav className="flex flex-wrap gap-4 overflow-x-auto text-xs font-semibold text-slate-500">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "cursor-pointer border-b-2 pb-3 transition-colors",
                isActive ? "border-[#1a2b4b] text-[#1a2b4b]" : "border-transparent hover:border-slate-300",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function Timeline({ items }: { items: Array<{ title: string; description: string; status?: string }> }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#1a2b4b]" />
            {index < items.length - 1 && <div className="mt-1 h-full w-px bg-slate-200" />}
          </div>
          <div className="pb-3">
            <p className="text-sm font-semibold text-slate-800">{item.title}</p>
            <p className="text-xs text-slate-500">{item.description}</p>
            {item.status && <p className="mt-1 text-[11px] font-semibold text-[#1a2b4b]">{item.status}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FormField({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {children}
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function Modal({
  isOpen,
  title,
  children,
  footer,
}: {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="border-t border-slate-200 px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export function Table({ headers, rows }: { headers: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {headers.map((header) => (
              <th key={header} className="px-5 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-[11px]">
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="hover:bg-slate-50">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="px-5 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
      <span>Página {currentPage} de {totalPages}</span>
      <div className="flex gap-2">
        <button className="rounded border border-slate-300 bg-white px-3 py-1.5">Anterior</button>
        <button className="rounded border border-slate-300 bg-white px-3 py-1.5">Próximo</button>
      </div>
    </div>
  );
}

export function StatCard({ label, value, tone = "primary" }: { label: string; value: number; tone?: "primary" | "error" | "warning" | "success" }) {
  const labelClasses: Record<string, string> = {
    primary: "text-blue-600",
    error: "text-red-600",
    warning: "text-orange-500",
    success: "text-green-600",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <p className={cn("mb-3 text-sm font-semibold", labelClasses[tone])}>{label}</p>
      <p className="text-4xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export function QuickActionCard({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-colors hover:bg-slate-50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100">
        {icon}
      </div>
      <span className="text-xs font-semibold text-slate-800">{label}</span>
    </button>
  );
}
