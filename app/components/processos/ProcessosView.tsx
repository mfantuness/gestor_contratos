"use client";

import { useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import { Input, Select, Button, Badge, Table } from "@/app/components/ui/design-system";
import type { ProcessosData, ProcessItem } from "@/app/data/mockProcessos";

type ProcessosViewProps = {
  data: ProcessosData;
};

export function ProcessosView({ data }: ProcessosViewProps) {
  const [filters, setFilters] = useState({
    protocol: "",
    processNumber: "",
    sei: "",
    modality: "",
    status: "",
    priority: "",
    department: "",
    creationDateFrom: "",
    creationDateTo: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredProcesses = useMemo(() => {
    return data.processes.filter((process: ProcessItem) => {
      const matchProtocol =
        filters.protocol === "" ||
        process.id.toLowerCase().includes(filters.protocol.toLowerCase());

      const matchProcessNumber =
        filters.processNumber === "" ||
        process.id.toLowerCase().includes(filters.processNumber.toLowerCase());

      const matchSei =
        filters.sei === "" || process.id.toLowerCase().includes(filters.sei.toLowerCase());

      const matchModality =
        filters.modality === "" || process.modality.toLowerCase() === filters.modality.toLowerCase();

      const matchStatus =
        filters.status === "" || process.status === filters.status;

      const matchPriority =
        filters.priority === "" || process.priority === filters.priority;

      // Department filter (simplified - checking if stage/department contains the filter)
      const matchDepartment =
        filters.department === "" ||
        process.currentStage.toLowerCase().includes(filters.department.toLowerCase());

      return (
        matchProtocol &&
        matchProcessNumber &&
        matchSei &&
        matchModality &&
        matchStatus &&
        matchPriority &&
        matchDepartment
      );
    });
  }, [filters, data.processes]);

  const getStatusTone = (status: string) => {
    switch (status) {
      case "em-andamento":
        return "success";
      case "concluido":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "em-andamento":
        return "EM ANDAMENTO";
      case "concluido":
        return "CONCLUÍDO";
      default:
        return status.toUpperCase();
    }
  };

  const getPriorityTone = (priority: string) => {
    switch (priority) {
      case "alta":
        return "error";
      case "media":
        return "warning";
      case "baixa":
        return "info";
      default:
        return "default";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "alta":
        return "ALTA";
      case "media":
        return "MÉDIA";
      case "baixa":
        return "BAIXA";
      default:
        return priority.toUpperCase();
    }
  };

  const processTable = {
    headers: [
      "Processo",
      "Objeto",
      "Modalidade",
      "Etapa Atual",
      "Status",
      "Prioridade",
      "Prazo",
    ],
    rows: filteredProcesses.map((process: ProcessItem) => [
      <span key={`${process.id}-id`} className="font-bold text-blue-600">
        {process.id}
      </span>,
      <span key={`${process.id}-obj`} className="text-slate-600">
        {process.object}
      </span>,
      <span key={`${process.id}-modality`} className="text-slate-600">
        {process.modality}
      </span>,
      <span key={`${process.id}-stage`} className="text-slate-600">
        {process.currentStage}
      </span>,
      <Badge key={`${process.id}-status`} tone={getStatusTone(process.status)}>
        {getStatusLabel(process.status)}
      </Badge>,
      <Badge key={`${process.id}-priority`} tone={getPriorityTone(process.priority)}>
        {getPriorityLabel(process.priority)}
      </Badge>,
      <span key={`${process.id}-date`} className="text-slate-600">
        {process.dueDate}
      </span>,
    ]),
  };

  const handleClearFilters = () => {
    setFilters({
      protocol: "",
      processNumber: "",
      sei: "",
      modality: "",
      status: "",
      priority: "",
      department: "",
      creationDateFrom: "",
      creationDateTo: "",
    });
    setCurrentPage(1);
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-blue-600 font-bold text-lg mb-1">{data.breadcrumb}</p>
        <h1 className="text-2xl font-bold text-slate-800">{data.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{data.subtitle}</p>
      </div>

      {/* Filter Section */}
      <section className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        {/* Filter Row 1 */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <label className="mb-2 text-xs font-bold text-slate-700">Protocolo</label>
            <Input
              placeholder=""
              type="text"
              value={filters.protocol}
              onChange={(e) => setFilters({ ...filters, protocol: e.target.value })}
              className="h-10"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-xs font-bold text-slate-700">
              Número do Processo
            </label>
            <Input
              placeholder=""
              type="text"
              value={filters.processNumber}
              onChange={(e) => setFilters({ ...filters, processNumber: e.target.value })}
              className="h-10"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-xs font-bold text-slate-700">SEI</label>
            <Input
              placeholder=""
              type="text"
              value={filters.sei}
              onChange={(e) => setFilters({ ...filters, sei: e.target.value })}
              className="h-10"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-xs font-bold text-slate-700">Modalidade</label>
            <Select
              value={filters.modality}
              onChange={(e) => setFilters({ ...filters, modality: e.target.value })}
              className="h-10"
            >
              <option value="">Selecione</option>
              {data.filterOptions.modalidades.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Filter Row 2 */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <label className="mb-2 text-xs font-bold text-slate-700">Status</label>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="h-10"
            >
              <option value="">Selecione</option>
              {data.filterOptions.statuses.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-xs font-bold text-slate-700">Prioridade</label>
            <Select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="h-10"
            >
              <option value="">Selecione</option>
              {data.filterOptions.priorities.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-xs font-bold text-slate-700">Departamento</label>
            <Select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="h-10"
            >
              <option value="">Selecione</option>
              {data.filterOptions.departments.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-xs font-bold text-slate-700">
              Período de Criação
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="dd/mm/aaaa"
                  type="text"
                  className="h-10 pr-8"
                  value={filters.creationDateFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, creationDateFrom: e.target.value })
                  }
                />
                <Calendar
                  size={16}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
              <span className="whitespace-nowrap text-xs text-slate-400">até</span>
              <div className="relative flex-1">
                <Input
                  placeholder="dd/mm/aaaa"
                  type="text"
                  className="h-10 pr-8"
                  value={filters.creationDateTo}
                  onChange={(e) =>
                    setFilters({ ...filters, creationDateTo: e.target.value })
                  }
                />
                <Calendar
                  size={16}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleClearFilters}>
            Limpar
          </Button>
          <Button variant="primary">Pesquisar</Button>
        </div>
      </section>

      {/* Results Info */}
      <div className="mb-4 text-right">
        <p className="text-xs font-medium text-slate-500">
          {filteredProcesses.length} de {data.processes.length} processos encontrados
        </p>
      </div>

      {/* Process Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <Table headers={processTable.headers} rows={processTable.rows} />

        {/* Pagination Footer */}
        <div className="border-t border-slate-200 px-6 py-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "border border-blue-200 bg-blue-50 text-blue-600 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <span className="px-2 text-sm text-slate-400">...</span>

              <button className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                25
              </button>

              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
            </div>

            {/* Items Per Page & Total */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Select defaultValue="10" className="h-8 py-1 px-3 text-xs">
                  <option value="10">10 por página</option>
                  <option value="20">20 por página</option>
                  <option value="50">50 por página</option>
                </Select>
              </div>
              <p className="text-xs font-medium text-slate-500">
                Total: {filteredProcesses.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
