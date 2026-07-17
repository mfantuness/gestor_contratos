"use client";

import { FileText, Clock3, ArrowRightLeft, MessageSquareText, FolderKanban, CircleCheckBig, FilePlus2 } from "lucide-react";
import { Button } from "@/app/components/ui/design-system";
import type { RelatoriosData } from "@/app/data/mockRelatorios";

const iconMap = {
  processos: <FileText size={24} />,
  sla: <Clock3 size={24} />,
  movimentacoes: <ArrowRightLeft size={24} />,
  pareceres: <MessageSquareText size={24} />,
  documentos: <FolderKanban size={24} />,
  contratos: <CircleCheckBig size={24} />,
};

const toneMap = {
  primary: "border-[#1a2b4b] text-[#1a2b4b]",
  warning: "border-amber-300 text-amber-600",
  info: "border-sky-300 text-sky-600",
  success: "border-emerald-300 text-emerald-600",
  secondary: "border-slate-300 text-slate-600",
};

export function RelatoriosView({ data }: { data: RelatoriosData }) {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1a2b4b]">{data.sectionTitle}</h2>
        <p className="mt-1 text-sm text-slate-500">{data.sectionSubtitle}</p>
      </div>

      <section className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.items.map((item) => (
            <button
              key={item.title}
              className="flex items-start gap-4 rounded-lg border border-slate-200 p-5 text-left transition-colors hover:border-[#1a2b4b]/40 hover:bg-slate-50"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg border ${toneMap[item.tone]}`}>
                {iconMap[item.icon]}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{item.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <FilePlus2 size={18} className="text-[#1a2b4b]" />
            <span>Geração de relatórios em formato PDF e Excel</span>
          </div>
          <Button variant="secondary">Gerar Relatório</Button>
        </div>
      </section>
    </>
  );
}
