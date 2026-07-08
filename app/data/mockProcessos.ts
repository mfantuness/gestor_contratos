export interface FilterOption {
  id: string;
  label: string;
}

export interface ProcessItem {
  id: string;
  object: string;
  modality: string;
  currentStage: string;
  status: "em-andamento" | "concluido";
  priority: "alta" | "media" | "baixa";
  dueDate: string;
}

export interface FilterOptions {
  modalidades: FilterOption[];
  statuses: FilterOption[];
  priorities: FilterOption[];
  departments: FilterOption[];
}

export interface ProcessosData {
  title: string;
  subtitle: string;
  breadcrumb: string;
  filterOptions: FilterOptions;
  processes: ProcessItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const mockFilterOptions: FilterOptions = {
  modalidades: [
    { id: "pregao", label: "Pregão" },
    { id: "dispensa", label: "Dispensa" },
    { id: "inexigibilidade", label: "Inexigibilidade" },
    { id: "credenciamento", label: "Credenciamento" },
    { id: "adesao", label: "Adesão" },
  ],
  statuses: [
    { id: "em-andamento", label: "Em Andamento" },
    { id: "concluido", label: "Concluído" },
    { id: "cancelado", label: "Cancelado" },
  ],
  priorities: [
    { id: "alta", label: "Alta" },
    { id: "media", label: "Média" },
    { id: "baixa", label: "Baixa" },
  ],
  departments: [
    { id: "compras", label: "Compras" },
    { id: "juridico", label: "Jurídico" },
    { id: "financeiro", label: "Financeiro" },
    { id: "controle-interno", label: "Controle Interno" },
    { id: "gestao", label: "Gestão" },
  ],
};

export const processosData: ProcessosData = {
  title: "Consulta de Processos",
  subtitle: "Pesquise e acompanhe os processos",
  breadcrumb: "3. Consulta de Processos",
  filterOptions: mockFilterOptions,
  processes: [
    {
      id: "2026.000123",
      object: "Aquisição de Equip. de TI",
      modality: "Pregão",
      currentStage: "Parecer Jurídico",
      status: "em-andamento",
      priority: "alta",
      dueDate: "12/06/2026",
    },
    {
      id: "2026.000122",
      object: "Contratação de Serv. de Limpeza",
      modality: "Dispensa",
      currentStage: "Análise Financeira",
      status: "em-andamento",
      priority: "media",
      dueDate: "11/06/2026",
    },
    {
      id: "2026.000121",
      object: "Aquisição de Materiais",
      modality: "Pregão",
      currentStage: "DFD",
      status: "em-andamento",
      priority: "baixa",
      dueDate: "15/06/2026",
    },
    {
      id: "2026.000120",
      object: "Serviços de Manutenção Predial",
      modality: "Inexigibilidade",
      currentStage: "Parecer Técnico",
      status: "concluido",
      priority: "alta",
      dueDate: "08/06/2026",
    },
    {
      id: "2026.000119",
      object: "Contratação de Seguro Veicular",
      modality: "Dispensa",
      currentStage: "Controle Interno",
      status: "em-andamento",
      priority: "media",
      dueDate: "20/06/2026",
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 25,
    totalItems: 241,
    itemsPerPage: 10,
  },
};
