"use client";
import { Check, X } from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";

export default function Sidebar({ updateURLFilter, currentFilter }: { updateURLFilter: (value: string) => void, currentFilter: string }) {
  const isSidebarOpen = useTaskStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useTaskStore((state) => state.setSidebarOpen);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-60 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-70 w-[280px] h-screen bg-[#111714] px-8 pb-3 pt-6 flex flex-col gap-6 text-white overflow-y-auto style_main__1l transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3 items-center text-lg font-semibold">
            <div className="w-10 h-10 bg-[#36E27B] rounded-full flex items-center justify-center">
              <span className="text-[#393939]">T</span>
            </div>
            <span>Task Pro</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 text-white hover:bg-[#29382F] rounded-lg transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <span className="text-sm font-medium uppercase tracking-wider">
          Filtros activos
        </span>
        <div className="flex flex-col gap-3">
          <span className="text-sm text-[#36E27B]/60 font-medium tracking-wide">Estatus</span>
          {[
            { name: "Todos", value: "all" },
            { name: "Pendientes", value: "pending" },
            { name: "En progreso", value: "in-progress" },
            { name: "Completados", value: "completed" },
          ].map((origen) => (
            <button
              key={origen.value}
              onClick={() => {
                updateURLFilter(origen.value);
                setSidebarOpen(false);
              }}
              className={`flex items-center justify-between px-3 w-full h-[56px] rounded-lg cursor-pointer bg-[#152B1E] transition-all hover:bg-[#1E3A28] ${(currentFilter ?? "") === origen.value ? "border-[#36E27B] border bg-[#1E3A28]" : ""}`}
            >
              <span className="text-sm">{origen.name}</span>
              {(currentFilter ?? "") === origen.value ? (
                <div className="w-6 h-6 rounded-lg bg-[#36E27B] flex justify-center items-center">
                  <Check size={16} color="#111714" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-lg border border-[#36E27B]/40"></div>
              )}
            </button>
          ))}
        </div>
      </aside>
    </>
  )
}