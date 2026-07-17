import { ProtectedDashboard } from "@/app/components/auth/ProtectedDashboard";
import { CentroDocumentalView } from "@/app/components/monitoramento/centro-documental/CentroDocumentalView";
import { getCentroDocumentalData } from "@/app/services/centroDocumentalService";
import { getDashboardData } from "@/app/services/dashboardService";

export default async function CentroDocumentalPage() {
  const [centroDocumentalData, dashboardData] = await Promise.all([
    getCentroDocumentalData(),
    getDashboardData(),
  ]);

  const updatedNavigation = dashboardData.navigation.map((item) => ({
    ...item,
    active: item.label === "Centro Documental",
  }));

  return (
    <ProtectedDashboard
      data={{
        ...dashboardData,
        navigation: updatedNavigation,
      }}
    >
      <CentroDocumentalView data={centroDocumentalData} />
    </ProtectedDashboard>
  );
}
