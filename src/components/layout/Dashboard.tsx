import Navbar from "@/components/layout/Navbar";
import { Search } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TaskCard from "@/components/features/TaskCard";
import Button from "@/components/ui/Button";
import TaskModal from "@/components/features/TaskModal";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTaskStore } from "@/store/useTaskStore";
import { useDebounce } from "@/hooks/useDebounce";
import { Task } from "@/domain/types";

/**
 * Componente principal del Dashboard de tareas.
 * * Gestiona:
 * - El filtrado y búsqueda de tareas.
 * - Sincronización bidireccional entre el estado local y los SearchParams de la URL.
 * - Apertura y cierre del modal de gestión de tareas.
 * - Estados de carga (Skeletons).
 * * @component
 */

export default function DashboardContent() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const { tasks, fetchTasks, removeTask, updateTask, isLoading } =
    useTaskStore();

  // 1. Solo inicializamos el estado local UNA VEZ al cargar
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);
  const currentFilter = searchParams.get("filter") || "all";

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 2. CORRECCIÓN: Sincronizar búsqueda con URL sin bucles
  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Usamos window para leer el estado real
    const currentSearch = params.get("search") || "";

    // Solo actualizamos la URL si el valor debounced es distinto al que ya está en la URL
    if (debouncedSearch !== currentSearch) {
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, router]); // Quitamos searchParams de las dependencias para romper el bucle

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      currentFilter === "all" || task.status === currentFilter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const updateURLFilter = (status: string) => {
    const params = new URLSearchParams(window.location.search);
    status === "all" ? params.delete("filter") : params.set("filter", status);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="w-full h-screen bg-[#111714] flex">
      <Sidebar
        updateURLFilter={updateURLFilter}
        currentFilter={currentFilter}
      />
      <div className="flex-1 h-full min-w-0">
        <Navbar />
        <main className="h-[calc(100%-80px)] overflow-y-auto text-[#2D2D2D] bg-[#F7F7F7] rounded-t-[40px] style_main__1l px-4 md:px-8 py-5">
          <div className="flex flex-col gap-6 w-full">
            <div className="w-full min-h-[88px] bg-[#F1F1F1] rounded-lg flex flex-col md:flex-row items-center justify-between p-4 gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-2/3">
                <div className="relative w-full sm:w-2/3">
                  <input
                    type="search"
                    placeholder="Busca por Titulo"
                    className="w-full pl-10 pr-4 py-3 md:py-4 bg-white rounded-lg text-sm focus:ring-2 focus:ring-[#36E27B]/20 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2D2D2D]/40"
                    size={16}
                  />
                </div>
                <span className="text-lg md:text-xl whitespace-nowrap">
                  <strong>{filteredTasks.length}</strong> resultados
                </span>
              </div>
              <div className="flex items-center w-full md:w-auto">
                <Button
                  onClick={() => {
                    setSelectedTask(null);
                    setIsModalOpen(true);
                  }}
                  className="w-full md:w-auto"
                >
                  + Nueva Tarea
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-[280px] bg-gray-200 rounded-2xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    setSelectedTask={(task) => {
                      setSelectedTask(task);
                      setIsModalOpen(true);
                    }}
                    updateTask={updateTask}
                    removeTask={removeTask}
                    index={filteredTasks.indexOf(task)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
                <p className="text-zinc-500">
                  No se encontraron tareas que coincidan con los filtros.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={selectedTask}
      />
    </div>
  )
}