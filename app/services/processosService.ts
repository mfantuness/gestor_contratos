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
