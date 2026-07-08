import { ProtectedDashboard } from "@/app/components/auth/ProtectedDashboard";
import { getDashboardData } from "@/app/services/dashboardService";

export default async function Home() {
  const data = await getDashboardData();

  return <ProtectedDashboard data={data} />;
}
