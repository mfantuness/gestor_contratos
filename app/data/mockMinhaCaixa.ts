export interface StatCardData {
  label: string;
  value: number;
  tone: "primary" | "error" | "warning" | "success";
}

export interface ProcessTableItem {
  processId: string;
  object: string;
  currentStage: string;
  sla: string;
  slaStatus: "critical" | "warning" | "normal";
  priority: "alta" | "média" | "baixa";
}

export interface QuickActionData {
  id: string;
  label: string;
  icon: string;
}

export interface MinhaCaixaData {
  title: string;
  subtitle: string;
  stats: StatCardData[];
  processes: ProcessTableItem[];
  quickActions: QuickActionData[];
}

export const minhaCaixaData: MinhaCaixaData = {
  title: "2. Minha Caixa de Trabalho",
  subtitle: "Processos que estão sob minha responsabilidade",
  stats: [
    { label: "Para Análise", value: 8, tone: "primary" },
    { label: "Em Atraso", value: 2, tone: "error" },
    { label: "Próximos a Vencer", value: 5, tone: "warning" },
    { label: "Concluído (mês)", value: 14, tone: "success" },
  ],
  processes: [
    {
      processId: "2026.000123",
      object: "Aquisição de Equipamentos de TI",
      currentStage: "Parecer Jurídico",
      sla: "12/06/2026 (2 dias)",
      slaStatus: "critical",
      priority: "alta",
    },
    {
      processId: "2026.000124",
      object: "Contratação de Serviços de Limpeza",
      currentStage: "Análise Financeira",
      sla: "11/06/2026 (1 dia)",
      slaStatus: "critical",
      priority: "média",
    },
    {
      processId: "2026.000125",
      object: "Aquisição de Materiais de Escritório",
      currentStage: "DFD",
      sla: "15/06/2026 (5 dias)",
      slaStatus: "normal",
      priority: "baixa",
    },
    {
      processId: "2026.000126",
      object: "Serviços de Manutenção Predial",
      currentStage: "Parecer Técnico",
      sla: "18/06/2026 (8 dias)",
      slaStatus: "normal",
      priority: "alta",
    },
    {
      processId: "2026.000127",
      object: "Contratação de Seguro Veicular",
      currentStage: "Controle Interno",
      sla: "20/06/2026 (10 dias)",
      slaStatus: "normal",
      priority: "média",
    },
  ],
  quickActions: [
    { id: "open-process", label: "Abrir Processo", icon: "file-plus" },
    { id: "forward", label: "Encaminhar", icon: "share-2" },
    { id: "emit-opinion", label: "Emitir Parecer", icon: "message-square" },
    { id: "dispatch", label: "Despachar", icon: "check-square" },
    { id: "attach-document", label: "Anexar Documento", icon: "plus" },
  ],
};
