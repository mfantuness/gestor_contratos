"use client";

import { useState } from "react";
import { ArrowLeftRight, ArrowUpRight, Check, ChevronDown, Circle, Clock3, FileText, History, Plus, Send } from "lucide-react";
import { Badge, Breadcrumbs, Button, PanelCard, SectionTabs } from "@/app/components/ui/design-system";
import type { ProcessDetailData } from "@/app/data/mockProcessos";
import { useRouter } from "next/navigation";

type Visao360ViewProps = {
  data: ProcessDetailData;
};

const tabs = [
  { id: "dados-gerais", label: "Dados Gerais" },
  { id: "workflow", label: "Workflow" },
  { id: "movimentacoes", label: "Movimentações" },
  { id: "documentos", label: "Documentos" },
  { id: "pareceres", label: "Pareceres" },
  { id: "despachos", label: "Despachos" },
  { id: "assinaturas", label: "Assinaturas" },
  { id: "auditoria", label: "Auditoria" },
];

export function Visao360View({ data }: Visao360ViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dados-gerais");

  const currentWorkflowStep =
    data.workflowSteps.find((step) => step.status === "atual") ??
    data.workflowSteps.find((step) => step.status === "concluido") ??
    data.workflowSteps[0];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Processos", href: "/processos" },
          { label: `Processo ${data.id}` },
        ]}
      />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-[#1a2b4b]">
              <FileText size={24} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-800">Processo {data.id}</h1>
                <Badge tone="success" className="px-2.5 py-1 text-[10px]">
                  {data.statusLabel}
                </Badge>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-500">{data.object}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" icon={<Send size={16} />}>
              Encaminhar
            </Button>
            <Button variant="primary" icon={<FileText size={16} />}>
              Emitir Parecer
            </Button>
            <Button variant="secondary" icon={<ChevronDown size={16} />}>
              Ações
            </Button>
          </div>
        </div>

        <div className="grid gap-6 border-t border-slate-100 pt-6 md:grid-cols-2 xl:grid-cols-6">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Modalidade</p>
            <p className="text-sm font-bold text-slate-800">{data.modality}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Prioridade</p>
            <p className="text-sm font-bold text-red-600">{data.priority.toUpperCase()}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Valor Estimado</p>
            <p className="text-sm font-bold text-slate-800">{data.estimatedValue}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Responsável Atual</p>
            <p className="text-sm font-bold text-slate-800">{data.responsible}</p>
            <p className="text-[11px] text-slate-500">{data.department}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Etapa Atual</p>
            <p className="text-sm font-bold text-slate-800">{data.currentStage}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Prazo (SLA)</p>
            <p className="text-sm font-bold text-slate-800">
              {data.slaDate} <span className="text-red-600">({data.slaRemaining})</span>
            </p>
          </div>
        </div>
      </div>

      <SectionTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "workflow" ? (
        <PanelCard title={`Workflow: ${data.workflowTitle}`} subtitle="Fluxo de tramitação e etapa atual do processo">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
              <Badge tone="info">Etapa atual</Badge>
              <p className="font-semibold text-slate-800">{currentWorkflowStep.title}</p>
              <span className="text-slate-500">• {currentWorkflowStep.subtitle}</span>
            </div>

            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              {data.workflowSteps.map((step, index) => {
                const stepClasses =
                  step.status === "concluido"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : step.status === "atual"
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-slate-50 text-slate-500";

                return (
                  <div key={step.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${stepClasses}`}>
                        {step.status === "concluido" ? (
                          <Check size={16} />
                        ) : step.status === "atual" ? (
                          <Clock3 size={16} />
                        ) : (
                          <Circle size={16} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-700">{step.title}</p>
                          {step.status === "atual" && <Badge tone="info" className="px-1.5 py-0.5">Atual</Badge>}
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{step.subtitle}</p>
                        <p className="mt-3 text-[11px] font-semibold text-slate-800">{step.date ?? "Pendente"}</p>
                      </div>
                    </div>
                    {index < data.workflowSteps.length - 1 && <div className="mt-4 h-0.5 rounded-full bg-slate-200" />}
                  </div>
                );
              })}
            </div>
          </div>
        </PanelCard>
      ) : activeTab === "movimentacoes" ? (
        <PanelCard title="Movimentações" subtitle="Histórico completo das ações registradas no processo">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Últimas movimentações</p>
              <p className="text-xs text-slate-500">Acompanhamento do fluxo do processo ao longo do tempo.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" icon={<Plus size={16} />}>
                Nova Movimentação
              </Button>
              <Button variant="secondary" icon={<History size={16} />}>
                Histórico Completo
              </Button>
            </div>
          </div>

          <div className="relative pl-8 space-y-8">
            <div className="absolute bottom-2 left-[15px] top-2 w-0.5 bg-[#1a2b4b]" />
            {data.movements.map((movement) => {
              const toneClasses =
                movement.tone === "error"
                  ? "border-red-400 bg-red-50 text-red-600"
                  : movement.tone === "warning"
                    ? "border-amber-400 bg-amber-50 text-amber-600"
                    : movement.tone === "success"
                      ? "border-emerald-400 bg-emerald-50 text-emerald-600"
                      : "border-[#1a2b4b] bg-blue-50 text-blue-600";

              return (
                <div key={movement.id} className="relative">
                  <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 ${toneClasses}`} />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                    <div className="w-24 flex-shrink-0">
                      <p className="text-xs font-bold text-slate-800">{movement.date}</p>
                      <p className="text-xs text-slate-500">{movement.time}</p>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge tone={movement.tone}>{movement.action}</Badge>
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${toneClasses}`}>
                          <ArrowLeftRight size={12} />
                        </div>
                        <div className="text-xs">
                          <span className="text-slate-500">De:</span>{" "}
                          <span className="font-semibold text-slate-700">{movement.from}</span>
                          <br />
                          <span className="text-slate-500">Para:</span>{" "}
                          <span className="font-semibold text-slate-700">{movement.to}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 italic">“{movement.note}”</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </PanelCard>
      ) : activeTab === "dados-gerais" ? (
        <div className="grid gap-6 xl:grid-cols-3">
          <PanelCard title="Informações do Processo">
            <div className="space-y-4 text-xs text-slate-700">
              {[
                ["Protocolo", data.protocol],
                ["SEI", data.sei],
                ["PNCP", data.pncp],
                ["Número do Processo", data.processNumber],
                ["Objeto", data.object],
                ["Justificativa", data.justification],
                ["Demandante", data.demandante],
                ["Departamento Atual", data.department],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="w-32 flex-shrink-0 font-medium text-slate-500">{label}</span>
                  <span className="flex-1 font-semibold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </PanelCard>

          <PanelCard title="Dados Complementares">
            <div className="space-y-4 text-xs text-slate-700">
              {[
                ["Modalidade", data.modality],
                ["Workflow", data.workflow],
                ["Status", data.statusLabel],
                ["Prioridade", data.priority.toUpperCase()],
                ["Valor Estimado", data.estimatedValue],
                ["Data Estimada para Conclusão", data.expectedConclusionDate],
                ["Data de Criação", data.createdAt],
                ["Última Movimentação", data.lastMovement],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="w-40 flex-shrink-0 font-medium text-slate-500">{label}</span>
                  <span className="flex-1 font-semibold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </PanelCard>

          <PanelCard title="Responsáveis">
            <div className="space-y-4 text-xs text-slate-700">
              {data.responsibles.map((item) => (
                <div key={item.name} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <p className="text-slate-500">{item.role}</p>
                    </div>
                    <Badge tone="info">{item.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </PanelCard>
        </div>
      ) : (
        <PanelCard title={tabs.find((tab) => tab.id === activeTab)?.label ?? "Detalhes"} subtitle="Esta seção será detalhada em breve.">
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            Conteúdo da seção em desenvolvimento.
          </div>
        </PanelCard>
      )}

      <div className="flex items-center justify-end">
        <Button variant="ghost" icon={<ArrowUpRight size={16} />} onClick={() => router.push("/processos")}>
          Voltar para Lista
        </Button>
      </div>
    </div>
  );
}
