import { ProtectedDashboard } from "@/app/components/auth/ProtectedDashboard";
import { MonitoramentoSlaView } from "@/app/components/monitoramento/sla/MonitoramentoSlaView";
import { getMonitoramentoData } from "@/app/services/monitoramentoService";
import { getDashboardData } from "@/app/services/dashboardService";

export default async function SlaPage() {
  const [monitoramentoData, dashboardData] = await Promise.all([
    getMonitoramentoData(),
    getDashboardData(),
  ]);

  const updatedNavigation = dashboardData.navigation.map((item) => ({
    ...item,
    active: item.label === "SLA",
  }));

  return (
    <ProtectedDashboard
      data={{
        ...dashboardData,
        navigation: updatedNavigation,
      }}
    >
      <MonitoramentoSlaView data={monitoramentoData} />
    </ProtectedDashboard>
  );
}
