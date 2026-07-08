"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/app/components/layout/MainLayout";
import { DashboardView } from "@/app/components/dashboard/DashboardView";
import type { DashboardData } from "@/app/data/mockDashboard";

export function ProtectedDashboard({ data, children }: { data: DashboardData; children?: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = typeof window !== "undefined" && window.localStorage.getItem("mock-auth") === "true";

    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <MainLayout navigation={data.navigation} organization={data.organization}>
      {children || <DashboardView data={data} />}
    </MainLayout>
  );
}
