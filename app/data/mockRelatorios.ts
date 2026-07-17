export interface RelatorioItem {
  title: string;
  subtitle: string;
  icon: "processos" | "sla" | "movimentacoes" | "pareceres" | "documentos" | "contratos";
  tone: "primary" | "warning" | "info" | "success" | "secondary";
}

export interface RelatoriosData {
  sectionTitle: string;
  sectionSubtitle: string;
  items: RelatorioItem[];
}

export const relatoriosData: RelatoriosData = {
  sectionTitle: "Relatórios",
  sectionSubtitle: "Acesso rápido aos principais relatórios do fluxo de contratação",
  items: [
    {
      title: "Relatório de Processos",
      subtitle: "Visão geral dos processos",
      icon: "processos",
      tone: "primary",
    },
    {
      title: "Relatório de SLA",
      subtitle: "Acompanhamento de prazos",
      icon: "sla",
      tone: "warning",
    },
    {
      title: "Relatório de Movimentações",
      subtitle: "Histórico de tramitações",
      icon: "movimentacoes",
      tone: "info",
    },
    {
      title: "Relatório de Pareceres",
      subtitle: "Pareceres emitidos",
      icon: "pareceres",
      tone: "success",
    },
    {
      title: "Relatório de Documentos",
      subtitle: "Documentos por tipo",
      icon: "documentos",
      tone: "secondary",
    },
    {
      title: "Relatório de Contratos",
      subtitle: "Contratos gerados",
      icon: "contratos",
      tone: "primary",
    },
  ],
};
