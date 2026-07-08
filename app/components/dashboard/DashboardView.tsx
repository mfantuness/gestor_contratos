import { AppHeader } from "@/app/components/layout/AppHeader";
import { MetricCard, PanelCard, ProgressBar, Table, Button, Badge } from "@/app/components/ui/design-system";
import { DonutChart, StatusDonutChart } from "@/app/components/charts/ChartCard";
import { FileText, Send, CheckCircle, MoreVertical } from "lucide-react";
import type { DashboardData } from "@/app/data/mockDashboard";

type DashboardViewProps = {
  data: DashboardData;
};

export function DashboardView({ data }: DashboardViewProps) {
  return (
    <>
      <AppHeader title="Dashboard Executivo" subtitle="Visão geral do fluxo de contratação" periodLabel={data.periodLabel} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} trend={metric.trend} tone={metric.tone} />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <DonutChart title="Processos por Modalidade" items={data.modalidades} total={124} />
        <PanelCard title="SLA por Departamento" className="p-0">
          <div className="space-y-4 p-5">
            {data.slas.map((sla) => (
              <ProgressBar key={sla.label} label={sla.label} value={sla.percent} tone={sla.tone} />
            ))}
          </div>
        </PanelCard>
        <StatusDonutChart title="Situação dos Processos" items={data.statuses} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PanelCard title="Últimas Movimentações">
          <Table
            headers={["Processo", "Movimento", "Origem", "Destino", "Responsável", "Data/Hora"]}
            rows={data.movements.map((movement) => [
              <span key={movement.processId} className="font-bold text-blue-600">{movement.processId}</span>,
              <span key={`${movement.processId}-mov`} className="uppercase">{movement.movement}</span>,
              <span key={`${movement.processId}-origin`}>{movement.origin}</span>,
              <span key={`${movement.processId}-dest`}>{movement.destination}</span>,
              <span key={`${movement.processId}-resp`}>{movement.responsible}</span>,
              <span key={`${movement.processId}-dt`} className="text-slate-400">{movement.datetime}</span>,
            ])}
          />
        </PanelCard>

        <PanelCard title="Processos em Atraso (SLA)">
          <Table
            headers={["Processo", "Etapa", "Atraso", "Responsável"]}
            rows={data.delayedProcesses.map((process) => [
              <span key={process.processId} className="font-bold text-slate-700">{process.processId}</span>,
              <span key={`${process.processId}-stage`}>{process.stage}</span>,
              <span key={`${process.processId}-delay`} className="font-bold text-[#ef4444]">{process.delay}</span>,
              <span key={`${process.processId}-resp`}>{process.responsible}</span>,
            ])}
          />
        </PanelCard>
      </div>

      <section className="mt-10 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <FileText size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-800">Processo {data.detail.processId}</h4>
                <Badge tone="success">{data.detail.status}</Badge>
              </div>
              <p className="text-xs text-slate-500">{data.detail.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button icon={<Send size={16} />}>Encaminhar</Button>
            <Button icon={<CheckCircle size={16} />}>Emitir Parecer</Button>
            <Button variant="secondary" icon={<MoreVertical size={16} />}>Ações</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 bg-white p-6 md:grid-cols-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Modalidade</p>
            <p className="truncate text-xs font-semibold">{data.detail.modality}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Prioridade</p>
            <p className="text-xs font-bold text-[#ef4444]">{data.detail.priority}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Valor Estimado</p>
            <p className="truncate text-xs font-semibold">{data.detail.estimatedValue}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Prazo (SLA)</p>
            <p className="truncate text-xs font-bold text-[#ef4444]">{data.detail.sla}</p>
          </div>
        </div>
      </section>
    </>
  );
}
