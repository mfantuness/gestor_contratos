import { ProtectedDashboard } from "@/app/components/auth/ProtectedDashboard";
import { RelatoriosView } from "@/app/components/relatorios/RelatoriosView";
import { getRelatoriosData } from "@/app/services/relatoriosService";
import { getDashboardData } from "@/app/services/dashboardService";

export default async function RelatoriosPage() {
  const [relatoriosData, dashboardData] = await Promise.all([
    getRelatoriosData(),
    getDashboardData(),
  ]);

  const updatedNavigation = dashboardData.navigation.map((item) => ({
    ...item,
    active: item.label === "Relatórios",
  }));

  return (
    <ProtectedDashboard
      data={{
        ...dashboardData,
        navigation: updatedNavigation,
      }}
    >
      <RelatoriosView data={relatoriosData} />
    </ProtectedDashboard>
  );
}
