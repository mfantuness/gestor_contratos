"use client";

import type { ReactNode } from "react";
import { Grid, Mail, FileText, LogOut, BarChart3, Clock3 } from "lucide-react";
import type { NavigationItem } from "@/app/data/mockDashboard";

type SidebarProps = {
  navigation: NavigationItem[];
  organization: string;
};

const iconMap: Record<string, ReactNode> = {
  grid: <Grid size={20} />,
  inbox: <Mail size={20} />,
  "file-text": <FileText size={20} />,
  "bar-chart-3": <BarChart3 size={20} />,
  clock: <Clock3 size={20} />,
};

export function Sidebar({ navigation, organization }: SidebarProps) {
  const mainItems = navigation.filter((item) => !["SLA", "Centro Documental", "Relatórios"].includes(item.label));
  const documentItems = navigation.filter((item) => ["SLA", "Centro Documental", "Relatórios"].includes(item.label));

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-[240px] flex-col bg-[#1a2b4b] text-white">
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-white font-bold text-[#1a2b4b]">
            PD
          </div>
          <h1 className="text-sm font-bold leading-snug">
            Gestão do
            <br />
            Fluxo de Contratação
          </h1>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {mainItems.map((item) => (
          <a
            key={item.label}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              item.active ? "bg-[#e0e7f1] text-[#1a2b4b]" : "text-white/80 hover:bg-white/10"
            }`}
            href={item.href}
          >
            <span className={item.active ? "text-[#1a2b4b]" : "text-white/80"}>{iconMap[item.icon] || item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}

        {documentItems.length > 0 && (
          <div className="mt-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Monitoramento</div>
            {documentItems.map((item) => (
              <a
                key={item.label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  item.active ? "bg-[#e0e7f1] text-[#1a2b4b]" : "text-white/80 hover:bg-white/10"
                }`}
                href={item.href}
              >
                <span className={item.active ? "text-[#1a2b4b]" : "text-white/80"}>{iconMap[item.icon] || item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        )}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button className="w-full rounded bg-white/10 p-2 text-left text-xs font-semibold text-white transition-colors hover:bg-white/20">
          <div className="block text-[10px] opacity-50">Organização</div>
          <div className="font-bold">{organization}</div>
        </button>
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={() => {
            window.localStorage.removeItem("mock-auth");
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-all hover:bg-white/10"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

