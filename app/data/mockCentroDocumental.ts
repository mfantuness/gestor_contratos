export interface DocumentoItem {
  name: string;
  category: string;
  owner: string;
  status: "Em análise" | "Aprovado" | "Pendente";
  updatedAt: string;
}

export interface CentroDocumentalData {
  sectionTitle: string;
  sectionSubtitle: string;
  summary: Array<{
    label: string;
    value: string;
    tone: "primary" | "success" | "warning" | "info";
  }>;
  documents: DocumentoItem[];
}

export const centroDocumentalData: CentroDocumentalData = {
  sectionTitle: "Centro Documental",
  sectionSubtitle: "Visão consolidada dos documentos e pendências do processo",
  summary: [
    { label: "Documentos cadastrados", value: "24", tone: "primary" },
    { label: "Aprovados", value: "18", tone: "success" },
    { label: "Pendentes", value: "6", tone: "warning" },
  ],
  documents: [
    {
      name: "Termo de Referência",
      category: "Obrigatório",
      owner: "Ana Paula",
      status: "Aprovado",
      updatedAt: "10/08/2026",
    },
    {
      name: "Parecer Jurídico",
      category: "Obrigatório",
      owner: "Renato Costa",
      status: "Em análise",
      updatedAt: "09/08/2026",
    },
    {
      name: "Minuta de Contrato",
      category: "Obrigatório",
      owner: "Marina Torres",
      status: "Pendente",
      updatedAt: "08/08/2026",
    },
    {
      name: "Matriz de Risco",
      category: "Opcional",
      owner: "João Pereira",
      status: "Aprovado",
      updatedAt: "07/08/2026",
    },
    {
      name: "Pesquisa de Preço",
      category: "Obrigatório",
      owner: "Cláudio Souza",
      status: "Aprovado",
      updatedAt: "06/08/2026",
    },
  ],
};
