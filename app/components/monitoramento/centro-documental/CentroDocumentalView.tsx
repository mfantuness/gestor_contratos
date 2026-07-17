"use client";

import { FileText, Search, Filter, ArrowRight, CheckCircle2, Clock3, AlertCircle } from "lucide-react";
import { Button, PanelCard } from "@/app/components/ui/design-system";
import type { CentroDocumentalData } from "@/app/data/mockCentroDocumental";

const statusClasses = {
  "Em análise": "bg-amber-100 text-amber-700",
  Aprovado: "bg-emerald-100 text-emerald-700",
  Pendente: "bg-red-100 text-red-700",
} as const;

const summaryToneClasses = {
  primary: "bg-[#1a2b4b] text-white",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-sky-100 text-sky-700",
} as const;

export function CentroDocumentalView({ data }: { data: CentroDocumentalData }) {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1a2b4b]">
            <span className="text-[#2563eb]">
              <FileText size={18} />
            </span>
            <span className="text-xs uppercase tracking-[0.2em]">Centro Documental</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{data.sectionTitle}</h2>
          <p className="mt-1 text-sm text-slate-500">{data.sectionSubtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-2">
            <Search size={16} className="text-slate-400" />
            <input className="border-none bg-transparent text-sm text-slate-700 outline-none" placeholder="Buscar documento" />
          </label>
          <Button variant="secondary" icon={<Filter size={16} />}>
            Filtrar
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.summary.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
            <div className="flex items-end justify-between gap-3">
              <span className="text-3xl font-black text-slate-900">{item.value}</span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${summaryToneClasses[item.tone]}`}>
                {item.tone === "primary" ? "Ativo" : item.tone === "success" ? "Concluído" : "Em revisão"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <PanelCard title="Documentos do Processo" subtitle="Visão consolidada dos principais documentos" className="overflow-hidden">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Documento</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Categoria</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Responsável</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Status</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Atualização</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {data.documents.map((document) => (
                <tr key={document.name} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-800">{document.name}</td>
                  <td className="px-4 py-3 text-slate-600">{document.category}</td>
                  <td className="px-4 py-3 text-slate-600">{document.owner}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClasses[document.status]}`}>
                      {document.status === "Aprovado" ? <CheckCircle2 size={12} /> : document.status === "Em análise" ? <AlertCircle size={12} /> : <Clock3 size={12} />}
                      {document.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{document.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex justify-end">
          <button className="flex items-center gap-2 text-sm font-semibold text-[#2563eb] transition-colors hover:text-[#1a2b4b]">
            Ver todos os documentos
            <ArrowRight size={16} />
          </button>
        </div>
      </PanelCard>
    </>
  );
}
