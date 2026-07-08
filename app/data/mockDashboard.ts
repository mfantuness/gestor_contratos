export interface NavigationItem {
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
}

export interface MetricCardData {
  label: string;
  value: string;
  trend: string;
  tone: "default" | "primary" | "success" | "warning" | "error" | "info";
}

export interface ModalidadeData {
  label: string;
  value: number;
  percent: number;
  color: string;
}

export interface DepartmentSlaData {
  label: string;
  percent: number;
  tone: "default" | "primary" | "success" | "warning" | "error" | "info";
}

export interface ProcessStatusData {
  label: string;
  value: number;
  percent: number;
  tone: "default" | "primary" | "success" | "warning" | "error" | "info";
}

export interface MovementItem {
  processId: string;
  movement: string;
  origin: string;
  destination: string;
  responsible: string;
  datetime: string;
}

export interface DelayedProcessItem {
  processId: string;
  stage: string;
  delay: string;
  responsible: string;
}

export interface DetailPreviewData {
  processId: string;
  title: string;
  status: string;
  modality: string;
  priority: string;
  estimatedValue: string;
  sla: string;
}

export interface DashboardData {
  user: UserProfile;
  organization: string;
  periodLabel: string;
  navigation: NavigationItem[];
  metrics: MetricCardData[];
  modalidades: ModalidadeData[];
  slas: DepartmentSlaData[];
  statuses: ProcessStatusData[];
  movements: MovementItem[];
  delayedProcesses: DelayedProcessItem[];
  detail: DetailPreviewData;
}

export const dashboardData: DashboardData = {
  user: {
    name: "João da Silva",
    role: "Analista de Compras",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxBobhJEKrBAGQ6lD0uhSk9Y6f-4ATAz-fEtcO3qegY2LjyVGMS_AhL6MoKmV8uascgVFRyhyGEf0StpN0PtRMWyFnQHt7xwsiGcn3ox3U-gcLhOGxKR1aZm5UbeaDLli-Ou9b2KPL_nqQynzeb-cFb0GDtVWmMttcfe1ww3LiifVfl9SG7QmuFd7VoerDfDs-vAmGb1bKAUa4W6hfSi8XkFwLwiEpB1ZvXiVDzs0aRhPz3-k0u54ko3c1FcXj8T-fCVg3mT3tl2g",
  },
  organization: "CRF-PE",
  periodLabel: "01/01/2026 - 10/08/2026",
  navigation: [
    { label: "Dashboard", icon: "grid", href: "/", active: true },
    { label: "Minha Caixa", icon: "inbox", href: "/minha-caixa" },
    { label: "Processos", icon: "file-text", href: "/processos" },
  ],
  metrics: [
    { label: "Processos Abertos", value: "124", trend: "+ 12 este mês", tone: "info" },
    { label: "Em Andamento", value: "89", trend: "+ 8 este mês", tone: "success" },
    { label: "Em Atraso (SLA)", value: "12", trend: "+ 4 este mês", tone: "error" },
    { label: "Concluídos", value: "315", trend: "+ 27 este mês", tone: "primary" },
    { label: "Valor Estimado Global", value: "R$ 18.450.000,00", trend: "+ R$ 2.350.000,00 este mês", tone: "success" },
  ],
  modalidades: [
    { label: "Pregão", value: 42, percent: 40, color: "#2563eb" },
    { label: "Dispensa", value: 31, percent: 25, color: "#60a5fa" },
    { label: "Inexigibilidade", value: 12, percent: 11, color: "#fb923c" },
    { label: "Credenciamento", value: 5, percent: 5, color: "#4ade80" },
    { label: "Adesão", value: 5, percent: 5, color: "#f87171" },
  ],
  slas: [
    { label: "Compras", percent: 92, tone: "success" },
    { label: "Jurídico", percent: 78, tone: "warning" },
    { label: "Financeiro", percent: 85, tone: "info" },
    { label: "Controle Interno", percent: 90, tone: "success" },
    { label: "Gestão", percent: 88, tone: "info" },
  ],
  statuses: [
    { label: "Dentro do prazo", value: 82, percent: 73, tone: "success" },
    { label: "Em risco", value: 17, percent: 15, tone: "warning" },
    { label: "Atrasados", value: 12, percent: 12, tone: "error" },
  ],
  movements: [
    { processId: "2026.000123", movement: "Seguir", origin: "Compras", destination: "Jurídico", responsible: "João da Silva", datetime: "10/08/2026 10:23" },
    { processId: "2026.000122", movement: "Retornar", origin: "Jurídico", destination: "Compras", responsible: "Maria Santos", datetime: "10/08/2026 09:15" },
    { processId: "2026.000121", movement: "Seguir", origin: "Financeiro", destination: "Gestão", responsible: "Carlos Lima", datetime: "09/08/2026 16:42" },
  ],
  delayedProcesses: [
    { processId: "2026.000118", stage: "Parecer Jurídico", delay: "3 dias", responsible: "Maria Santos" },
    { processId: "2026.000115", stage: "Financeiro", delay: "2 dias", responsible: "Carlos Lima" },
    { processId: "2026.000110", stage: "Controle Interno", delay: "1 dia", responsible: "Ana Paula" },
  ],
  detail: {
    processId: "2026.000123",
    title: "Aquisição de Equipamentos de TI",
    status: "EM ANDAMENTO",
    modality: "Pregão Eletrônico",
    priority: "ALTA",
    estimatedValue: "R$ 250.000,00",
    sla: "12/06/2026 (2 dias)",
  },
};
