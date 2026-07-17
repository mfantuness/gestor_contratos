"use client";

import { useState } from "react";
import { ArrowLeftRight, ArrowUpRight, Check, ChevronDown, Circle, Clock3, Download, FileText, History, Plus, Send, Eye, PenSquare } from "lucide-react";
import { Badge, Breadcrumbs, Button, Modal, PanelCard, SearchField, SectionTabs, Select, Table } from "@/app/components/ui/design-system";
import type { ProcessAuditEntry, ProcessDetailData, ProcessDispatch, ProcessDocument, ProcessOpinion, ProcessSignature } from "@/app/data/mockProcessos";
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
  const [documentFilter, setDocumentFilter] = useState<"all" | "required" | "attached" | "type">("all");
  const [selectedDocument, setSelectedDocument] = useState<ProcessDocument | null>(null);
  const [selectedOpinion, setSelectedOpinion] = useState<ProcessOpinion | null>(null);
  const [selectedSignature, setSelectedSignature] = useState<ProcessSignature | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<ProcessAuditEntry | null>(null);
  const [notice, setNotice] = useState("");
  const [auditFilter, setAuditFilter] = useState<"all" | "processo" | "documento" | "assinatura">("all");
  const [auditSearch, setAuditSearch] = useState("");

  const currentWorkflowStep =
    data.workflowSteps.find((step) => step.status === "atual") ??
    data.workflowSteps.find((step) => step.status === "concluido") ??
    data.workflowSteps[0];

  const filteredDocuments = data.documents.filter((document) => {
    if (documentFilter === "required") return document.required;
    if (documentFilter === "attached") return document.status === "Anexado";
    if (documentFilter === "type") return document.type === "Documento Inicial";
    return true;
  });

  const handlePreview = (document: ProcessDocument) => {
    setSelectedDocument(document);
  };

  const handleDownload = (document: ProcessDocument) => {
    setNotice(`Documento ${document.name} preparado para download.`);
  };

  const handleOpinionAction = (opinion: ProcessOpinion, action: "view" | "edit") => {
    setSelectedOpinion(opinion);
    setNotice(action === "view" ? `Visualizando ${opinion.title}.` : `Editando ${opinion.title}.`);
  };

  const handleDispatchAction = (dispatch: ProcessDispatch) => {
    setNotice(`Despacho de ${dispatch.author} selecionado para revisão.`);
  };

  const handleSignatureAction = (signature: ProcessSignature) => {
    setSelectedSignature(signature);
    setNotice(signature.status === "Pendente" ? `Assinatura de ${signature.document} iniciada em modo simulado.` : `Visualização de ${signature.document} iniciada.`);
  };

  const handleAuditAction = (audit: ProcessAuditEntry) => {
    setSelectedAudit(audit);
    setNotice(`Detalhes de ${audit.entity} exibidos em modo simulado.`);
  };

  const filteredAudits = data.audits.filter((audit) => {
    const matchesFilter =
      auditFilter === "all" ||
      (auditFilter === "processo" && audit.entity === "PROCESSO") ||
      (auditFilter === "documento" && audit.entity === "DOCUMENTO") ||
      (auditFilter === "assinatura" && audit.entity === "ASSINATURA");

    const normalizedSearch = auditSearch.toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      audit.user.toLowerCase().includes(normalizedSearch) ||
      audit.details.toLowerCase().includes(normalizedSearch) ||
      audit.entity.toLowerCase().includes(normalizedSearch) ||
      audit.action.toLowerCase().includes(normalizedSearch);

    return matchesFilter && matchesSearch;
  });

  const documentRows = filteredDocuments.map((document) => [
    <div key={`${document.id}-name`}>
      <div className="font-semibold text-slate-800">{document.name}</div>
      <div className="mt-1 text-[11px] text-slate-500">{document.type}</div>
    </div>,
    document.required ? <span className="text-green-600">Sim</span> : <span className="text-slate-500">Opcional</span>,
    <Badge tone={document.status === "Anexado" ? "success" : document.status === "Em revisão" ? "warning" : "error"}>
      {document.status}
    </Badge>,
    <span className="text-slate-600">{document.version}</span>,
    <span className="text-slate-600">{document.date}</span>,
    <div key={`${document.id}-actions`} className="flex justify-center gap-2">
      <button type="button" onClick={() => handlePreview(document)} className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
        <Eye size={12} /> Visualizar
      </button>
      <button type="button" onClick={() => handleDownload(document)} className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
        <Download size={12} /> Baixar
      </button>
    </div>,
  ]);

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
      ) : activeTab === "documentos" ? (
        <PanelCard title="Documentos" subtitle="Lista dos documentos vinculados ao processo e seu respectivo status">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" icon={<Plus size={16} />}>
                Anexar Documento
              </Button>
              <Button variant="secondary" icon={<FileText size={16} />}>
                Documentos Obrigatórios
              </Button>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            {[
              { id: "all", label: "Todos" },
              { id: "required", label: "Obrigatórios" },
              { id: "attached", label: "Anexados" },
              { id: "type", label: "Por Tipo" },
            ].map((filter, index) => {
              const isActive = documentFilter === filter.id;
              return (
                <button
                  key={`${filter.id}-${index}`}
                  type="button"
                  onClick={() => setDocumentFilter(filter.id as typeof documentFilter)}
                  className={isActive ? "rounded-full border border-[#1a2b4b] bg-[#1a2b4b] px-3 py-1.5 text-xs font-semibold text-white" : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 hover:border-slate-300"}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {notice ? <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</div> : null}

          <div className="overflow-x-auto">
            <Table
              headers={["Tipo de Documento", "Obrigatório", "Status", "Versão", "Data", "Ações"]}
              rows={documentRows}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" className="text-sm font-semibold text-[#1a2b4b] hover:underline">
              Ver todos os documentos
            </button>
          </div>
        </PanelCard>
      ) : activeTab === "pareceres" ? (
        <PanelCard title="Pareceres" subtitle="Histórico e situação dos pareceres vinculados ao processo">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" icon={<Plus size={16} />}>
                Novo Parecer
              </Button>
              <Button variant="secondary" icon={<PenSquare size={16} />}>
                Emitir Parecer
              </Button>
            </div>
          </div>

          {notice ? <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</div> : null}

          <div className="overflow-x-auto">
            <Table
              headers={["Tipo", "Título", "Autor", "Status", "Data", "Ações"]}
              rows={data.opinions.map((opinion) => [
                <span key={`${opinion.id}-type`} className="font-semibold text-slate-800">{opinion.type}</span>,
                <div key={`${opinion.id}-title`}>
                  <div className="font-semibold text-slate-800">{opinion.title}</div>
                  <div className="mt-1 text-[11px] text-slate-500">{opinion.summary}</div>
                </div>,
                opinion.author,
                <Badge tone={opinion.status === "Emitido" ? "success" : opinion.status === "Em revisão" ? "warning" : "default"}>
                  {opinion.status}
                </Badge>,
                opinion.date,
                <div key={`${opinion.id}-actions`} className="flex justify-center gap-2">
                  <button type="button" onClick={() => handleOpinionAction(opinion, "view")} className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
                    <Eye size={12} /> Visualizar
                  </button>
                  <button type="button" onClick={() => handleOpinionAction(opinion, "edit")} className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
                    <PenSquare size={12} /> Editar
                  </button>
                </div>,
              ])}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" className="text-sm font-semibold text-[#1a2b4b] hover:underline">
              Ver todos os pareceres
            </button>
          </div>
        </PanelCard>
      ) : activeTab === "despachos" ? (
        <PanelCard title="Despachos" subtitle="Registro cronológico dos despachos emitidos no processo">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" icon={<Plus size={16} />} onClick={() => setNotice("Novo despacho criado em modo simulado.")}>
                Nova Despacho
              </Button>
              <Button variant="secondary" onClick={() => setNotice("Visualização completa dos despachos em modo simulado.")}>
                Ver todos
              </Button>
            </div>
          </div>

          {notice ? <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</div> : null}

          <div className="overflow-x-auto">
            <Table
              headers={["Data", "Autor", "Despacho", "Situação", "Ações"]}
              rows={data.dispatches.map((dispatch) => [
                dispatch.date,
                dispatch.author,
                <div key={`${dispatch.id}-text`}>
                  <div className="font-semibold text-slate-800">{dispatch.type ?? "Despacho"}</div>
                  <div className="mt-1 text-[11px] text-slate-500">{dispatch.text}</div>
                </div>,
                <Badge tone={dispatch.status === "Concluído" ? "success" : dispatch.status === "Pendente" ? "warning" : "default"}>
                  {dispatch.status ?? "Emitido"}
                </Badge>,
                <button key={`${dispatch.id}-action`} type="button" onClick={() => handleDispatchAction(dispatch)} className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
                  <Eye size={12} /> Visualizar
                </button>,
              ])}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" className="text-sm font-semibold text-[#1a2b4b] hover:underline">
              Ver todos os despachos
            </button>
          </div>
        </PanelCard>
      ) : activeTab === "assinaturas" ? (
        <PanelCard title="Assinaturas" subtitle="Fluxo de assinatura e status dos documentos vinculados ao processo">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" icon={<Plus size={16} />} onClick={() => setNotice("Solicitação de assinatura criada em modo simulado.")}>
                Solicitar Assinatura
              </Button>
            </div>
          </div>

          {notice ? <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</div> : null}

          <div className="overflow-x-auto">
            <Table
              headers={["Documento", "Signatário", "Tipo", "Status", "Data"]}
              rows={data.signatures.map((signature) => [
                <div key={`${signature.id}-document`}>
                  <div className="font-semibold text-slate-800">{signature.document}</div>
                  <div className="mt-1 text-[11px] text-slate-500">{signature.role}</div>
                </div>,
                signature.signatory,
                signature.type,
                <div key={`${signature.id}-status`} className="flex flex-col items-center gap-2">
                  <Badge tone={signature.status === "Assinado" ? "success" : signature.status === "Em revisão" ? "warning" : "default"}>
                    {signature.status}
                  </Badge>
                  <button type="button" onClick={() => handleSignatureAction(signature)} className="text-[11px] font-semibold text-[#1a2b4b] hover:underline">
                    {signature.status === "Pendente" ? "Assinar" : "Visualizar"}
                  </button>
                </div>,
                signature.signatureDate ?? signature.requestDate,
              ])}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" className="text-sm font-semibold text-[#1a2b4b] hover:underline">
              Ver todas as assinaturas
            </button>
          </div>
        </PanelCard>
      ) : activeTab === "auditoria" ? (
        <PanelCard title="Auditoria" subtitle="Registro cronológico das alterações e ações do processo">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:gap-4">
            <div className="grid flex-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Entidade</label>
                <Select value={auditFilter} onChange={(event) => setAuditFilter(event.target.value as typeof auditFilter)} className="w-full">
                  <option value="all">Todas</option>
                  <option value="processo">Processo</option>
                  <option value="documento">Documento</option>
                  <option value="assinatura">Assinatura</option>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Ação</label>
                <Select defaultValue="all" className="w-full">
                  <option value="all">Todas</option>
                  <option value="update">Atualização</option>
                  <option value="insert">Inclusão</option>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Usuário</label>
                <SearchField placeholder="Usuário" value={auditSearch} onChange={(event) => setAuditSearch(event.target.value)} className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Período</label>
                <Select defaultValue="all" className="w-full">
                  <option value="all">Últimos 30 dias</option>
                  <option value="week">Última semana</option>
                  <option value="month">Último mês</option>
                </Select>
              </div>
            </div>
            <Button
              variant="primary"
              className="h-[38px] self-end px-6"
              onClick={() => setNotice("Filtro de auditoria aplicado em modo simulado.")}
            >
              Pesquisar
            </Button>
          </div>

          {notice ? <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</div> : null}

          <div className="overflow-x-auto">
            <Table
              headers={["Data/Hora", "Usuário", "Entidade", "Ação", "Detalhes", "Ações"]}
              rows={filteredAudits.map((audit) => [
                audit.timestamp,
                audit.user,
                audit.entity,
                audit.action,
                <div key={`${audit.id}-details`}>
                  <div className="font-semibold text-slate-800">{audit.module ?? "Sistema"}</div>
                  <div className="mt-1 text-[11px] text-slate-500">{audit.details}</div>
                </div>,
                <button key={`${audit.id}-action`} type="button" onClick={() => handleAuditAction(audit)} className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50">
                  <Eye size={12} /> Detalhes
                </button>,
              ])}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" className="text-sm font-semibold text-[#1a2b4b] hover:underline">
              Ver log completo
            </button>
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
              ].map(([label, value], index) => (
                <div key={`${label}-${index}`} className="flex gap-4">
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
              ].map(([label, value], index) => (
                <div key={`${label}-${index}`} className="flex gap-4">
                  <span className="w-40 flex-shrink-0 font-medium text-slate-500">{label}</span>
                  <span className="flex-1 font-semibold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </PanelCard>

          <PanelCard title="Responsáveis">
            <div className="space-y-4 text-xs text-slate-700">
              {data.responsibles.map((item, index) => (
                <div key={`${item.name}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
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

      <Modal isOpen={Boolean(selectedDocument)} title={selectedDocument?.name ?? "Documento"}>
        {selectedDocument ? (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-800">Tipo:</span> {selectedDocument.type}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Responsável:</span> {selectedDocument.responsible}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Status:</span> {selectedDocument.status}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Versão:</span> {selectedDocument.version}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Data:</span> {selectedDocument.date}
            </p>
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
              Este conteúdo é uma visualização simulada do documento vinculado ao processo.
            </p>
          </div>
        ) : null}
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setSelectedDocument(null)}>
            Fechar
          </Button>
          {selectedDocument ? (
            <Button variant="primary" onClick={() => handleDownload(selectedDocument)}>
              Baixar documento
            </Button>
          ) : null}
        </div>
      </Modal>

      <Modal isOpen={Boolean(selectedOpinion)} title={selectedOpinion?.title ?? "Parecer"}>
        {selectedOpinion ? (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-800">Tipo:</span> {selectedOpinion.type}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Autor:</span> {selectedOpinion.author}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Status:</span> {selectedOpinion.status}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Data:</span> {selectedOpinion.date}
            </p>
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
              {selectedOpinion.summary}
            </p>
          </div>
        ) : null}
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setSelectedOpinion(null)}>
            Fechar
          </Button>
          {selectedOpinion ? (
            <Button variant="primary" onClick={() => setNotice(`Parecer ${selectedOpinion.title} atualizado em modo simulado.`)}>
              Emitir / editar
            </Button>
          ) : null}
        </div>
      </Modal>

      <Modal isOpen={Boolean(selectedSignature)} title={selectedSignature?.document ?? "Assinatura"}>
        {selectedSignature ? (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-800">Signatário:</span> {selectedSignature.signatory}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Cargo:</span> {selectedSignature.role}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Tipo:</span> {selectedSignature.type}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Status:</span> {selectedSignature.status}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Data de solicitação:</span> {selectedSignature.requestDate}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Data de assinatura:</span> {selectedSignature.signatureDate ?? "-"}
            </p>
          </div>
        ) : null}
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setSelectedSignature(null)}>
            Fechar
          </Button>
          {selectedSignature ? (
            <Button variant="primary" onClick={() => setNotice(selectedSignature.status === "Pendente" ? `Assinatura de ${selectedSignature.document} solicitada com sucesso.` : `Visualização de ${selectedSignature.document} concluída.`)}>
              {selectedSignature.status === "Pendente" ? "Assinar documento" : "Visualizar documento"}
            </Button>
          ) : null}
        </div>
      </Modal>

      <Modal isOpen={Boolean(selectedAudit)} title={selectedAudit?.entity ?? "Auditoria"}>
        {selectedAudit ? (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-800">Data/Hora:</span> {selectedAudit.timestamp}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Usuário:</span> {selectedAudit.user}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Ação:</span> {selectedAudit.action}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Módulo:</span> {selectedAudit.module ?? "Sistema"}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Severidade:</span> {selectedAudit.severity ?? "Baixa"}
            </p>
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
              {selectedAudit.details}
            </p>
          </div>
        ) : null}
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" onClick={() => setSelectedAudit(null)}>
            Fechar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
