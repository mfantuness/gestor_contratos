import { ProtectedDashboard } from "@/app/components/auth/ProtectedDashboard";
import { Visao360View } from "@/app/components/visao360/Visao360View";
import { getProcessDetailData } from "@/app/services/processosService";
import { getDashboardData } from "@/app/services/dashboardService";

export default async function Visao360Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const [detailData, dashboardData] = await Promise.all([
    getProcessDetailData(params.id),
    getDashboardData(),
  ]);

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
      <Visao360View data={detailData} />
    </ProtectedDashboard>
  );
}
