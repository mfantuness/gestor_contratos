import { Filter } from "lucide-react";
import { Button, Select } from "@/app/components/ui/design-system";

type AppHeaderProps = {
  title: string;
  subtitle: string;
  periodLabel: string;
};

export function AppHeader({ title, subtitle, periodLabel }: AppHeaderProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h2 className="text-xl font-bold text-[#1a2b4b]">{title}</h2>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Período</span>
          <Select className="border-none bg-transparent p-0 text-xs font-semibold focus:ring-0">
            <option>{periodLabel}</option>
          </Select>
        </div>
        <Button variant="secondary" icon={<Filter size={16} />}>
          Filtrar
        </Button>
      </div>
    </div>
  );
}