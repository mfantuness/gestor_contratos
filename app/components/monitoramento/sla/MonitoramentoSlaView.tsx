"use client";

import { AlertTriangle, CheckCircle2, Clock3, Download, Filter, RefreshCcw, Eye, MoreVertical, ArrowRight } from "lucide-react";
import { Button, PanelCard, Table } from "@/app/components/ui/design-system";
import type { MonitoringData, MonitoringRiskItem, MonitoringSummaryItem } from "@/app/data/mockMonitoramento";

const toneClasses: Record<MonitoringSummaryItem["tone"], string> = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-600",
  error: "bg-red-50 text-red-600",
  primary: "bg-blue-50 text-blue-700",
};

const iconMap = {
  "check-circle": <CheckCircle2 size={18} />,
  "alert-triangle": <AlertTriangle size={18} />,
  clock: <Clock3 size={18} />,
};

const initialsToneClasses: Record<MonitoringRiskItem["initialsTone"], string> = {
  primary: "bg-[#1a2b4b] text-white",
  info: "bg-sky-100 text-sky-700",
  warning: "bg-amber-100 text-amber-700",
  success: "bg-emerald-100 text-emerald-700",
  error: "bg-red-100 text-red-700",
};

export function MonitoramentoSlaView({ data }: { data: MonitoringData }) {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1a2b4b]">
            <span className="text-[#2563eb]">
              <AlertTriangle size={18} />
            </span>
            <span className="uppercase tracking-[0.2em] text-xs">Painel de Performance</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{data.sectionTitle}</h2>
          <p className="mt-1 text-sm text-slate-500">{data.sectionSubtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<Filter size={16} />}>
            Últimos 30 Dias
          </Button>
          <Button variant="secondary" icon={<RefreshCcw size={16} />} className="px-3">
            Atualizar
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data.summary.map((item) => (
          <div
            key={item.label}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                <h3 className="text-3xl font-black text-slate-900">{item.value}</h3>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${toneClasses[item.tone]}`}>
                {iconMap[item.icon]}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${toneClasses[item.tone]}`}>{item.detail}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${item.tone === "success" ? "bg-emerald-500" : item.tone === "warning" ? "bg-amber-500" : item.tone === "error" ? "bg-red-500" : "bg-blue-600"}`} style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <PanelCard title="Top 5 Processos em Risco / Atraso" subtitle="Prioridade Alta" className="mb-6" headerActions={
        <div className="flex items-center gap-2">
          <Button variant="ghost" icon={<Filter size={16} />} className="px-2 text-slate-500">
            Filtrar
          </Button>
          <Button variant="ghost" icon={<Download size={16} />} className="px-2 text-slate-500">
            Exportar
          </Button>
        </div>
      }>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <Table
            headers={["Processo", "Etapa", "Atraso", "Responsável", "Ações"]}
            rows={data.risks.map((risk) => [
              <span key={`${risk.processId}-id`} className="font-bold text-[#2563eb]">{risk.processId}</span>,
              <span key={`${risk.processId}-stage`} className="text-slate-600">{risk.stage}</span>,
              <span key={`${risk.processId}-delay`} className="inline-flex w-fit items-center gap-1 rounded bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600">
                <Clock3 size={12} />
                {risk.delay}
              </span>,
              <div key={`${risk.processId}-resp`} className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ${initialsToneClasses[risk.initialsTone]}`}>
                  {risk.initials}
                </div>
                <span className="text-slate-700">{risk.responsible}</span>
              </div>,
              <div key={`${risk.processId}-actions`} className="flex justify-end gap-2">
                <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#2563eb]">
                  <Eye size={16} />
                </button>
                <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#2563eb]">
                  <MoreVertical size={16} />
                </button>
              </div>,
            ])}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button className="flex items-center gap-2 text-sm font-semibold text-[#2563eb] transition-colors hover:text-[#1a2b4b]">
            Ver relatório completo
            <ArrowRight size={16} />
          </button>
        </div>
      </PanelCard>

    </>
  );
}