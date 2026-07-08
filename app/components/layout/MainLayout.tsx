import type { ReactNode } from "react";
import type { NavigationItem } from "@/app/data/mockDashboard";
import { Sidebar } from "@/app/components/layout/Sidebar";

type MainLayoutProps = {
  children: ReactNode;
  navigation: NavigationItem[];
  organization: string;
};

export function MainLayout({ children, navigation, organization }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f1f4f7] text-slate-800">
      <Sidebar navigation={navigation} organization={organization} />
      <main className="ml-[240px] min-h-screen p-6">{children}</main>
    </div>
  );
}
