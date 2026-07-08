"use client";

import { Download, FilePlus, Share2, MessageSquare, CheckSquare, Plus } from "lucide-react";
import { StatCard, QuickActionCard, Table, Button, Badge } from "@/app/components/ui/design-system";
import type { MinhaCaixaData, ProcessTableItem } from "@/app/data/mockMinhaCaixa";

type MinhaCaixaViewProps = {
  data: MinhaCaixaData;
};

const iconMap: Record<string, React.ReactNode> = {
  "file-plus": <FilePlus size={24} />,
  "share-2": <Share2 size={24} />,
  "message-square": <MessageSquare size={24} />,
  "check-square": <CheckSquare size={24} />,
  plus: <Plus size={24} />,
};

export function MinhaCaixaView({ data }: MinhaCaixaViewProps) {
  const getPriorityTone = (priority: string) => {
    switch (priority) {
      case "alta":
        return "error";
      case "média":
        return "warning";
      case "baixa":
        return "success";
      default:
        return "default";
    }
  };

  const getSLAColor = (slaStatus: string) => {
    switch (slaStatus) {
      case "critical":
        return "text-red-500";
      case "warning":
        return "text-orange-500";
      default:
        return "text-slate-700";
    }
  };

  const processTable = {
    headers: ["Processo", "Objeto", "Etapa Atual", "Prazo (SLA)", "Prioridade"],
    rows: data.processes.map((process: ProcessTableItem) => [
      <span key={`${process.processId}-id`} className="font-bold text-blue-600">
        {process.processId}
      </span>,
      <span key={`${process.processId}-obj`} className="text-slate-700">
        {process.object}
      </span>,
      <span key={`${process.processId}-stage`} className="text-blue-600">
        {process.currentStage}
      </span>,
      <span key={`${process.processId}-sla`} className={getSLAColor(process.slaStatus)}>
        {process.sla}
      </span>,
      <Badge key={`${process.processId}-priority`} tone={getPriorityTone(process.priority)}>
        {process.priority.toUpperCase()}
      </Badge>,
    ]),
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{data.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{data.subtitle}</p>
        </div>
        <Button variant="secondary" icon={<Download size={16} />}>
          Exportar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} tone={stat.tone} />
        ))}
      </div>

      {/* Process Table */}
      <div className="mb-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <Table headers={processTable.headers} rows={processTable.rows} />
        <div className="border-t border-slate-200 px-6 py-4 text-right">
          <a className="text-sm font-semibold text-blue-600 hover:underline" href="#">
            Ver todos
          </a>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-6 text-lg font-bold text-slate-800">Ações Rápidas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {data.quickActions.map((action) => (
            <QuickActionCard key={action.id} icon={iconMap[action.icon]} label={action.label} />
          ))}
        </div>
      </div>
    </>
  );
}
