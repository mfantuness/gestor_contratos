import { processosData, type ProcessDetailData } from "@/app/data/mockProcessos";

export async function getProcessosData() {
  return processosData;
}

export async function getProcessDetailData(id?: string): Promise<ProcessDetailData> {
  const process = processosData.processes.find((item) => item.id === id) ?? processosData.processes[0];

  return {
    ...process,
    protocol: process.protocol ?? process.id,
    sei: process.sei ?? "000000.0000.000000-00",
    pncp: process.pncp ?? "000000000000000000000",
    processNumber: process.processNumber ?? process.id,
    justification: process.justification ?? "Justificativa não informada.",
    demandante: process.demandante ?? "Não informado",
    workflow: process.workflow ?? "Workflow padrão",
    workflowTitle: process.workflowTitle ?? process.workflow ?? "Workflow padrão",
    workflowSteps: process.workflowSteps ?? [
      {
        id: "default-1",
        title: "Início",
        subtitle: "Abertura do processo",
        status: "concluido",
        date: "01/06/2026",
      },
      {
        id: "default-2",
        title: "Análise",
        subtitle: "Validação técnica",
        status: "atual",
        date: "10/06/2026",
      },
      {
        id: "default-3",
        title: "Aprovação",
        subtitle: "Encerramento",
        status: "pendente",
      },
    ],
    movements: process.movements ?? [
      {
        id: "default-mov-1",
        date: "10/06/2026",
        time: "10:00",
        action: "Seguir",
        from: "Compras",
        to: "Jurídico",
        note: "Processo encaminhado para parecer jurídico.",
        tone: "info",
      },
    ],
    documents: process.documents ?? [
      {
        id: "default-doc-1",
        name: "Documento Base",
        type: "Documento Inicial",
        required: true,
        status: "Anexado",
        version: "1.0",
        date: "10/06/2026",
        responsible: "Sistema",
        fileType: "PDF",
      },
    ],
    opinions: process.opinions ?? [
      {
        id: "default-op-1",
        type: "Jurídico",
        title: "Parecer padrão",
        author: "Sistema",
        status: "Emitido",
        date: "10/06/2026",
        summary: "Parecer padrão gerado para o processo em análise.",
      },
    ],
    dispatches: process.dispatches ?? [
      {
        id: "default-dispatch-1",
        date: "10/06/2026 10:00",
        author: "Sistema",
        text: "Despacho padrão registrado para o processo.",
        type: "Registro",
        status: "Emitido",
      },
    ],
    signatures: process.signatures ?? [
      {
        id: "default-signature-1",
        document: "Documento padrão",
        signatory: "Sistema",
        role: "Automação",
        type: "GOV.BR",
        status: "Pendente",
        requestDate: "10/06/2026",
      },
    ],
    audits: process.audits ?? [
      {
        id: "default-audit-1",
        timestamp: "10/06/2026 10:00",
        user: "Sistema",
        entity: "PROCESSO",
        action: "INSERT",
        details: "Registro padrão de auditoria criado",
        module: "Processos",
        severity: "Baixa",
      },
    ],
    estimatedValue: process.estimatedValue ?? "R$ 0,00",
    expectedConclusionDate: process.expectedConclusionDate ?? "Não informada",
    createdAt: process.createdAt ?? "Não informada",
    lastMovement: process.lastMovement ?? "Não informada",
    responsible: process.responsible ?? "Não informado",
    department: process.department ?? "Não informado",
    statusLabel: process.statusLabel ?? "EM_ANDAMENTO",
    slaDate: process.slaDate ?? process.dueDate,
    slaRemaining: process.slaRemaining ?? "0 dias",
    responsibles: process.responsibles ?? [],
  };
}
