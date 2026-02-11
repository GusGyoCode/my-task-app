import { create } from 'zustand';
import { Task } from '@/domain/types';
import { taskService } from '@/services/taskService';

/**
 * Interface que define el estado global y las acciones para la gestión de tareas.
 * @interface TaskState
 */
interface TaskState {
  /** @property {Task[]} tasks - Listado de tareas recuperadas. */
  tasks: Task[];
  /** @property {boolean} isLoading - Indica si hay una operación asíncrona en curso. */
  isLoading: boolean;
  /** @property {string|null} error - Almacena mensajes de error en caso de fallos en el servicio. */
  error: string | null;
  /** @property {boolean} isSidebarOpen - Estado de visibilidad de la barra lateral. */
  isSidebarOpen: boolean;

  /**
   * Obtiene todas las tareas desde el servicio y actualiza el estado.
   * @function fetchTasks
   * @returns {Promise<void>}
   */
  fetchTasks: () => Promise<void>;

  /**
   * Crea una nueva tarea y la añade al listado global.
   * @function addTask
   * @param {Omit<Task, 'id' | 'createdAt'>} task - Datos de la tarea sin ID ni fecha (generados por el servicio).
   * @returns {Promise<void>}
   */
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;

  /**
   * Actualiza una tarea existente mediante su ID.
   * @function updateTask
   * @param {Task} task - Tarea completa con las modificaciones.
   * @returns {Promise<void>}
   */
  updateTask: (task: Task) => Promise<void>;

  /**
   * Elimina una tarea permanentemente del almacenamiento.
   * @function removeTask
   * @param {string} id - Identificador único de la tarea a eliminar.
   * @returns {Promise<void>}
   */
  removeTask: (id: string) => Promise<void>;

  /** @function setSidebarOpen - Define explícitamente el estado del sidebar. */
  setSidebarOpen: (isOpen: boolean) => void;
  /** @function toggleSidebar - Alterna la visibilidad del sidebar. */
  toggleSidebar: () => void;
}

/**
 * Store de Zustand para la gestión reactiva de tareas.
 * Implementa lógica asíncrona para interactuar con {@link taskService}.
 * * @example
 * const { tasks, fetchTasks } = useTaskStore();
 * useEffect(() => { fetchTasks(); }, []);
 */
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