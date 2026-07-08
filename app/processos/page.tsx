import { ProtectedDashboard } from "@/app/components/auth/ProtectedDashboard";
import { ProcessosView } from "@/app/components/processos/ProcessosView";
import { getProcessosData } from "@/app/services/processosService";
import { getDashboardData } from "@/app/services/dashboardService";

export default async function ProcessosPage() {
  const [processosData, dashboardData] = await Promise.all([
    getProcessosData(),
    getDashboardData(),
  ]);

  // Update navigation to mark Processos as active
  const updatedNavigation = dashboardData.navigation.map((item) => ({
    ...item,
    active: item.label === "Processos",
  }));

  return (
    <ProtectedDashboard
      data={{
        ...dashboardData,
        navigation: updatedNavigation,
      }}
    >
      <ProcessosView data={processosData} />
    </ProtectedDashboard>
  );
}
