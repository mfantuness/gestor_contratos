import { ProtectedDashboard } from "@/app/components/auth/ProtectedDashboard";
import { MinhaCaixaView } from "@/app/components/minhacaixa/MinhaCaixaView";
import { getMinhaCaixaData } from "@/app/services/minhaCaixaService";
import { getDashboardData } from "@/app/services/dashboardService";

export default async function MinhaCaixaPage() {
  const [minhaCaixaData, dashboardData] = await Promise.all([
    getMinhaCaixaData(),
    getDashboardData(),
  ]);

  // Update navigation to mark Minha Caixa as active
  const updatedNavigation = dashboardData.navigation.map((item) => ({
    ...item,
    active: item.label === "Minha Caixa",
  }));

  return (
    <ProtectedDashboard
      data={{
        ...dashboardData,
        navigation: updatedNavigation,
      }}
    >
      <MinhaCaixaView data={minhaCaixaData} />
    </ProtectedDashboard>
  );
}
