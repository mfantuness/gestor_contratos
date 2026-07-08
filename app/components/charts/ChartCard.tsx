"use client";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CheckCircle } from "lucide-react";
import type { ModalidadeData, ProcessStatusData } from "@/app/data/mockDashboard";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

type DonutChartProps = {
  title: string;
  items: ModalidadeData[];
  total: number;
};

export function DonutChart({ title, items, total }: DonutChartProps) {
  const data = {
    labels: items.map((item) => item.label),
    datasets: [
      {
        data: items.map((item) => item.value),
        backgroundColor: items.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-600">{title}</h3>
      <div className="flex items-center gap-4">
        <div className="flex w-1/2 justify-center">
          <div className="relative h-32 w-32">
            <Doughnut data={data} options={{ cutout: "70%", plugins: { legend: { display: false } } }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-xs font-bold text-slate-400">Total</p>
              <p className="text-lg font-black text-slate-800">{total}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 space-y-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <span className="font-bold text-slate-600">{item.value} ({item.percent}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatusDonutChart({ title, items }: { title: string; items: ProcessStatusData[] }) {
  const data = {
    labels: items.map((item) => item.label),
    datasets: [
      {
        data: items.map((item) => item.value),
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-600">{title}</h3>
      <div className="flex items-center gap-4">
        <div className="flex w-1/2 justify-center">
          <div className="relative h-32 w-32">
            <Doughnut data={data} options={{ cutout: "70%", plugins: { legend: { display: false } } }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle size={48} className="text-[#22c55e]" />
            </div>
          </div>
        </div>
        <div className="w-1/2 space-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${item.tone === "success" ? "bg-[#22c55e]" : item.tone === "warning" ? "bg-[#f59e0b]" : "bg-[#ef4444]"}`} />
                {item.label}
              </span>
              <span className="font-bold text-slate-600">{item.value} ({item.percent}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
