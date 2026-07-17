import type { DashboardData } from "@/app/data/mockDashboard";

export interface MonitoringRiskItem {
  processId: string;
  stage: string;
  delay: string;
  responsible: string;
  initials: string;
  initialsTone: "primary" | "info" | "warning" | "success" | "error";
}

export interface MonitoringSummaryItem {
  label: string;
  value: string;
  detail: string;
  tone: "success" | "warning" | "error" | "primary";
  progress: number;
  icon: "check-circle" | "alert-triangle" | "clock";
}

export interface MonitoringData extends DashboardData {
  sectionTitle: string;
  sectionSubtitle: string;
  tabs: Array<{ id: string; label: string }>;
  summary: MonitoringSummaryItem[];
  risks: MonitoringRiskItem[];
  historicalSeries: { label: string; value: number }[];
  target: {
    title: string;
    description: string;
    currentValue: string;
    label: string;
  };
}

export const monitoringData: MonitoringData = {
  user: {
    name: "João da Silva",
    role: "Analista Pleno",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxBobhJEKrBAGQ6lD0uhSk9Y6f-4ATAz-fEtcO3qegY2LjyVGMS_AhL6MoKmV8uascgVFRyhyGEf0StpN0PtRMWyFnQHt7xwsiGcn3ox3U-gcLhOGxKR1aZm5UbeaDLli-Ou9b2KPL_nqQynzeb-cFb0GDtVWmMttcfe1ww3LiifVfl9SG7QmuFd7VoerDfDs-vAmGb1bKAUa4W6hfSi8XkFwLwiEpB1ZvXiVDzs0aRhPz3-k0u54ko3c1FcXj8T-fCVg3mT3tl2g",
  },
  organization: "CRF-PE",
  periodLabel: "Últimos 30 dias",
  navigation: [
    { label: "Dashboard", icon: "grid", href: "/", active: false },
    { label: "Minha Caixa", icon: "inbox", href: "/minha-caixa" },
    { label: "Processos", icon: "file-text", href: "/processos" },
    { label: "Monitoramento", icon: "bar-chart-3", href: "/monitoramento", active: true },
  ],
  metrics: [],
  modalidades: [],
  slas: [],
  statuses: [],
  movements: [],
  delayedProcesses: [],
  detail: {
    processId: "",
    title: "",
    status: "",
    modality: "",
    priority: "",
    estimatedValue: "",
    sla: "",
  },
  sectionTitle: "11. Monitoramento de SLA",
  sectionSubtitle: "Painel de performance e acompanhamento dos indicadores operacionais",
  tabs: [
    { id: "dashboard", label: "Dashboard" },
    { id: "sla", label: "SLA" },
    { id: "operacional", label: "Operacional" },
  ],
  summary: [
    {
      label: "Dentro do Prazo",
      value: "82",
      detail: "77% do total",
      tone: "success",
      progress: 77,
      icon: "check-circle",
    },
    {
      label: "Em Risco",
      value: "17",
      detail: "15% do total",
      tone: "warning",
      progress: 15,
      icon: "alert-triangle",
    },
    {
      label: "Vencidos",
      value: "12",
      detail: "12% do total",
      tone: "error",
      progress: 12,
      icon: "clock",
    },
  ],
  risks: [
    {
      processId: "2026.000123",
      stage: "Parecer Jurídico",
      delay: "3 dias",
      responsible: "Maria Santos",
      initials: "MS",
      initialsTone: "primary",
    },
    {
      processId: "2026.000112",
      stage: "Financeiro",
      delay: "2 dias",
      responsible: "Carlos Lima",
      initials: "CL",
      initialsTone: "info",
    },
    {
      processId: "2026.000110",
      stage: "Controle Interno",
      delay: "1 dia",
      responsible: "Ana Paula",
      initials: "AP",
      initialsTone: "warning",
    },
    {
      processId: "2026.000107",
      stage: "Homologação",
      delay: "1 dia",
      responsible: "Fernanda Costa",
      initials: "FC",
      initialsTone: "success",
    },
    {
      processId: "2026.000105",
      stage: "Jurídico",
      delay: "1 dia",
      responsible: "Roberto Nunes",
      initials: "RN",
      initialsTone: "error",
    },
  ],
  historicalSeries: [
    { label: "Semana 01", value: 68 },
    { label: "Semana 02", value: 71 },
    { label: "Semana 03", value: 75 },
    { label: "Semana 04", value: 78 },
    { label: "Semana 05", value: 82 },
    { label: "Semana 06", value: 84 },
    { label: "Semana 07", value: 87 },
  ],
  target: {
    title: "Meta Institucional",
    description: "A meta global para este trimestre é manter o SLA acima de 90% em todas as diretorias operacionais.",
    currentValue: "82%",
    label: "Status Atual",
  },
};
