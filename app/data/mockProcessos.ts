export interface FilterOption {
  id: string;
  label: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  subtitle: string;
  status: "concluido" | "atual" | "pendente";
  date?: string;
}

export interface ProcessMovement {
  id: string;
  date: string;
  time: string;
  action: string;
  from: string;
  to: string;
  note: string;
  tone: "info" | "success" | "warning" | "error";
}

export interface ProcessItem {
  id: string;
  object: string;
  modality: string;
  currentStage: string;
  status: "em-andamento" | "concluido";
  priority: "alta" | "media" | "baixa";
  dueDate: string;
  protocol?: string;
  sei?: string;
  pncp?: string;
  processNumber?: string;
  justification?: string;
  demandante?: string;
  workflow?: string;
  workflowTitle?: string;
  workflowSteps?: WorkflowStep[];
  movements?: ProcessMovement[];
  estimatedValue?: string;
  expectedConclusionDate?: string;
  createdAt?: string;
  lastMovement?: string;
  responsible?: string;
  department?: string;
  statusLabel?: string;
  slaDate?: string;
  slaRemaining?: string;
  responsibles?: Array<{ name: string; role: string; type: string }>;
}

export interface FilterOptions {
  modalidades: FilterOption[];
  statuses: FilterOption[];
  priorities: FilterOption[];
  departments: FilterOption[];
}

export interface ProcessDetailData extends ProcessItem {
  protocol: string;
  sei: string;
  pncp: string;
  processNumber: string;
  justification: string;
  demandante: string;
  workflow: string;
  workflowTitle: string;
  workflowSteps: WorkflowStep[];
  movements: ProcessMovement[];
  estimatedValue: string;
  expectedConclusionDate: string;
  createdAt: string;
  lastMovement: string;
  responsible: string;
  department: string;
  statusLabel: string;
  slaDate: string;
  slaRemaining: string;
  responsibles: Array<{ name: string; role: string; type: string }>;
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

const workflowStepsBase: WorkflowStep[] = [
  {
    id: "dfd",
    title: "DFD",
    subtitle: "Documentação inicial",
    status: "concluido",
    date: "02/06/2026",
  },
  {
    id: "etp",
    title: "ETP",
    subtitle: "Estudo técnico preliminar",
    status: "concluido",
    date: "03/06/2026",
  },
  {
    id: "tr",
    title: "TR",
    subtitle: "Tramitação interna",
    status: "concluido",
    date: "04/06/2026",
  },
  {
    id: "pesquisa",
    title: "Pesquisa de Preço",
    subtitle: "Cotação e análise",
    status: "concluido",
    date: "05/06/2026",
  },
  {
    id: "parecer",
    title: "Parecer Jurídico",
    subtitle: "Análise legal",
    status: "atual",
    date: "10/06/2026",
  },
  {
    id: "financeiro",
    title: "Financeiro",
    subtitle: "Validação orçamentária",
    status: "pendente",
  },
  {
    id: "homologacao",
    title: "Homologação",
    subtitle: "Aprovação final",
    status: "pendente",
  },
];

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
      protocol: "2026.000123",
      sei: "000133.2026.000001-11",
      pncp: "123456780001234567890",
      processNumber: "123/2026",
      justification: "Necessidade de modernização dos equipamentos para melhoria dos serviços prestados.",
      demandante: "João da Silva",
      workflow: "Contratação de Bens e Serviços",
      workflowTitle: "Contratação de Bens e Serviços",
      workflowSteps: workflowStepsBase,
      movements: [
        {
          id: "mov-1",
          date: "10/06/2026",
          time: "10:33",
          action: "Seguir",
          from: "Compras (João da Silva)",
          to: "Jurídico (Maria Santos)",
          note: "Encaminho para análise jurídica.",
          tone: "info",
        },
        {
          id: "mov-2",
          date: "08/06/2026",
          time: "09:15",
          action: "Retornar",
          from: "Jurídico (Maria Santos)",
          to: "Compras (João da Silva)",
          note: "Necessária complementação do ETP.",
          tone: "warning",
        },
        {
          id: "mov-3",
          date: "08/06/2026",
          time: "15:42",
          action: "Seguir",
          from: "Compras (João da Silva)",
          to: "Jurídico (Maria Santos)",
          note: "Encaminho para análise.",
          tone: "success",
        },
        {
          id: "mov-4",
          date: "07/06/2026",
          time: "11:30",
          action: "Seguir",
          from: "Demandante (João da Silva)",
          to: "Compras (João da Silva)",
          note: "Início do processo.",
          tone: "info",
        },
      ],
      estimatedValue: "R$ 250.000,00",
      expectedConclusionDate: "30/08/2026",
      createdAt: "02/05/2026 10:15",
      lastMovement: "10/06/2026 16:23",
      responsible: "João da Silva",
      department: "Compras",
      statusLabel: "EM_ANDAMENTO",
      slaDate: "12/06/2026",
      slaRemaining: "2 dias",
      responsibles: [
        { name: "João da Silva", role: "Analista de Compras", type: "Responsável" },
        { name: "Maria Oliveira", role: "Assessoria Jurídica", type: "Aprovador" },
      ],
    },
    {
      id: "2026.000122",
      object: "Contratação de Serv. de Limpeza",
      modality: "Dispensa",
      currentStage: "Análise Financeira",
      status: "em-andamento",
      priority: "media",
      dueDate: "11/06/2026",
      protocol: "2026.000122",
      sei: "000133.2026.000001-10",
      pncp: "123456780001234567891",
      processNumber: "122/2026",
      justification: "Manutenção da limpeza institucional do órgão.",
      demandante: "Ana Costa",
      workflow: "Serviços de Limpeza",
      workflowTitle: "Serviços de Limpeza",
      workflowSteps: workflowStepsBase.map((step, index) => ({
        ...step,
        id: `${step.id}-${index}`,
        status: index === 4 ? "atual" : index < 4 ? "concluido" : "pendente",
      })),
      estimatedValue: "R$ 85.000,00",
      expectedConclusionDate: "20/06/2026",
      createdAt: "03/05/2026 09:20",
      lastMovement: "11/06/2026 14:10",
      responsible: "Ana Costa",
      department: "Financeiro",
      statusLabel: "EM_ANDAMENTO",
      slaDate: "11/06/2026",
      slaRemaining: "1 dia",
      responsibles: [
        { name: "Ana Costa", role: "Analista Financeira", type: "Responsável" },
        { name: "Carlos Mendes", role: "Setor Administrativo", type: "Aprovador" },
      ],
    },
    {
      id: "2026.000121",
      object: "Aquisição de Materiais",
      modality: "Pregão",
      currentStage: "DFD",
      status: "em-andamento",
      priority: "baixa",
      dueDate: "15/06/2026",
      protocol: "2026.000121",
      sei: "000133.2026.000001-09",
      pncp: "123456780001234567892",
      processNumber: "121/2026",
      justification: "Reposição de materiais de consumo do setor administrativo.",
      demandante: "Bruno Lima",
      workflow: "Aquisição de Materiais",
      workflowTitle: "Aquisição de Materiais",
      workflowSteps: workflowStepsBase.map((step, index) => ({
        ...step,
        id: `${step.id}-${index + 10}`,
        status: index === 2 ? "atual" : index < 2 ? "concluido" : "pendente",
      })),
      estimatedValue: "R$ 45.000,00",
      expectedConclusionDate: "18/06/2026",
      createdAt: "04/05/2026 11:30",
      lastMovement: "13/06/2026 10:50",
      responsible: "Bruno Lima",
      department: "Compras",
      statusLabel: "EM_ANDAMENTO",
      slaDate: "15/06/2026",
      slaRemaining: "3 dias",
      responsibles: [
        { name: "Bruno Lima", role: "Analista de Compras", type: "Responsável" },
        { name: "Lúcia Torres", role: "Gestão de Estoque", type: "Aprovador" },
      ],
    },
    {
      id: "2026.000120",
      object: "Serviços de Manutenção Predial",
      modality: "Inexigibilidade",
      currentStage: "Parecer Técnico",
      status: "concluido",
      priority: "alta",
      dueDate: "08/06/2026",
      protocol: "2026.000120",
      sei: "000133.2026.000001-08",
      pncp: "123456780001234567893",
      processNumber: "120/2026",
      justification: "Manutenção predial preventiva e corretiva da sede administrativa.",
      demandante: "Paula Reis",
      workflow: "Manutenção Predial",
      workflowTitle: "Manutenção Predial",
      workflowSteps: workflowStepsBase.map((step, index) => ({
        ...step,
        id: `${step.id}-${index + 20}`,
        status: index === 0 ? "concluido" : index === 1 ? "atual" : "pendente",
      })),
      estimatedValue: "R$ 120.000,00",
      expectedConclusionDate: "15/06/2026",
      createdAt: "05/05/2026 08:40",
      lastMovement: "08/06/2026 17:15",
      responsible: "Paula Reis",
      department: "Controle Interno",
      statusLabel: "CONCLUÍDO",
      slaDate: "08/06/2026",
      slaRemaining: "0 dias",
      responsibles: [
        { name: "Paula Reis", role: "Gestão de Obras", type: "Responsável" },
        { name: "Renato Souza", role: "Controle Interno", type: "Aprovador" },
      ],
    },
    {
      id: "2026.000119",
      object: "Contratação de Seguro Veicular",
      modality: "Dispensa",
      currentStage: "Controle Interno",
      status: "em-andamento",
      priority: "media",
      dueDate: "20/06/2026",
      protocol: "2026.000119",
      sei: "000133.2026.000001-07",
      pncp: "123456780001234567894",
      processNumber: "119/2026",
      justification: "Renovação do seguro veicular da frota institucional.",
      demandante: "Pedro Nunes",
      workflow: "Seguros",
      workflowTitle: "Seguros",
      workflowSteps: workflowStepsBase.map((step, index) => ({
        ...step,
        id: `${step.id}-${index + 30}`,
        status: index < 3 ? "concluido" : index === 3 ? "atual" : "pendente",
      })),
      estimatedValue: "R$ 70.000,00",
      expectedConclusionDate: "25/06/2026",
      createdAt: "06/05/2026 15:00",
      lastMovement: "12/06/2026 11:45",
      responsible: "Pedro Nunes",
      department: "Gestão",
      statusLabel: "EM_ANDAMENTO",
      slaDate: "20/06/2026",
      slaRemaining: "4 dias",
      responsibles: [
        { name: "Pedro Nunes", role: "Gestão Administrativa", type: "Responsável" },
        { name: "Sofia Mendes", role: "Financeiro", type: "Aprovador" },
      ],
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 25,
    totalItems: 241,
    itemsPerPage: 10,
  },
};
