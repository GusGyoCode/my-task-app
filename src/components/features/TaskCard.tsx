import { Check, ChevronDown, Edit, Trash } from "lucide-react";
import { Task, TaskStatus } from "@/domain/types";
import { useState } from "react";

interface Props {
  task: Task;
  setSelectedTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (id: string) => void;
  index: number;
}

const Status: Record<TaskStatus, string> = {
  pending: "Pendiente",
  "in-progress": "En progreso",
  completed: "Completada",
}

const statusStyles: Record<TaskStatus, string> = {
  pending: "border-[#FF4D4D] text-[#FF4D4D] bg-[#FFF0F0]",
  "in-progress": "border-[#FFD700] text-[#FFD700] bg-[#FFFBEB]",
  completed: "border-[#36E27B] text-[#36E27B] bg-[#ECF8EF]",
};

export default function TaskCard({ index, task, setSelectedTask, updateTask, removeTask }: Props) {
  const [isPelajeOpen, setIsPelajeOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-3xl p-6 flex flex-col gap-4 justify-between hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-1 text-[#2D2D2D]">
          <h3 className="text-2xl font-semibold">
            #{index + 1} {task.title}
          </h3>
          <p className="font-medium">
            {task.description}
          </p>
          <div className="flex items-center gap-2">
            <span
              data-testid="task-status"
              className={`px-2 h-[20px] flex items-center rounded-lg text-[10px] font-bold border ${statusStyles[task.status]}`}
            >
              {Status[task.status]}
            </span>
          </div>
        </div>
      </div>
      <div className="text-white gap-4 w-full border-l flex justify-between items-center">
        <div className="relative">
          <button
            onClick={() => setIsPelajeOpen(!isPelajeOpen)}
            className={`flex items-center justify-between px-3 w-[204px] h-[56px] rounded-lg cursor-pointer bg-[#152B1E] ${isPelajeOpen ? `${statusStyles[task.status].split(' ')[0]} border` : ""
              }`}
          >
            <span className={`text-sm capitalize ${statusStyles[task.status].split(' ')[1]}`}>
              {Status[task.status]}
            </span>
            <ChevronDown
              size={16}
              color={statusStyles[task.status].split(' ')[1].match(/\[(.*?)\]/)?.[1] || "#36E27B"}
              className={`transition-transform duration-200 ${isPelajeOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isPelajeOpen && (
            <div className="absolute top-[60px] left-0 w-[204px] flex flex-col gap-2 bg-[#152B1E] p-2 rounded-lg z-50 border border-[#36E27B] shadow-xl">
              {[
                { name: "Pendiente", value: "pending" },
                { name: "En progreso", value: "in-progress" },
                { name: "Completada", value: "completed" },
              ].map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    updateTask({
                      ...task,
                      status: option.value as TaskStatus,
                    });
                    setIsPelajeOpen(false);
                  }}
                  className="flex items-center justify-between px-2 w-full h-[40px] rounded hover:bg-[#ffffff10] transition-colors"
                >
                  <span className="text-sm">{option.name}</span>
                  {task.status === option.value ? (
                    <div className="w-5 h-5 rounded bg-[#36E27B] flex justify-center items-center">
                      <Check size={14} color="#111714" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded border border-[#36E27B]"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <div className="flex flex-col gap-2 border-l border-[#D9D9D9] pl-8">
            <button
              onClick={() => setSelectedTask(task)}
              className="w-[40px] h-[40px] rounded-xl bg-[#1C2620] flex items-center justify-center hover:bg-[#2A3830] transition-colors cursor-pointer"
              aria-label="Editar tarea"
            >
              <Edit size={20} color="white" />
            </button>
            <button
              onClick={() => removeTask(task.id)}
              className="w-[40px] h-[40px] rounded-xl bg-[#1C2620] flex items-center justify-center hover:bg-[#2A3830] transition-colors cursor-pointer"
              aria-label="Eliminar tarea"
            >
              <Trash
                size={20}
                color="white"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
