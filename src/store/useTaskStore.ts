import { create } from 'zustand';
import { Task } from '@/domain/types';
import { taskService } from '@/services/taskService';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: true,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.getAll();
      set({ tasks, isLoading: false });
    } catch (err) {
      set({ error: 'Error al cargar tareas', isLoading: false });
    }
  },

  addTask: async (taskData) => {
    set({ isLoading: true });
    try {
      const newTask = await taskService.create(taskData);
      set((state) => ({ tasks: [...state.tasks, newTask], isLoading: false }));
    } catch (err) {
      set({ error: 'Error al crear tarea', isLoading: false });
    }
  },

  updateTask: async (task) => {
    set({ isLoading: true });
    try {
      const updated = await taskService.update(task);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === task.id ? updated : t)),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: 'Error al actualizar', isLoading: false });
    }
  },

  removeTask: async (id) => {
    try {
      await taskService.delete(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
    } catch (err) {
       console.error(err);
    }
  },
  isSidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));