import { Task } from '@/domain/types';

/** * Clave utilizada para la persistencia en LocalStorage.
 * @constant {string} 
 */
const STORAGE_KEY = 'tasks_db';

/**
 * Utility para simular latencia de red en operaciones asíncronas.
 * @param {number} ms - Milisegundos de espera.
 * @returns {Promise<void>}
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Servicio de infraestructura para la gestión de tareas.
 * Maneja la comunicación con el motor de persistencia (LocalStorage).
 * @namespace taskService
 */
export const taskService = {
  /**
   * Obtiene la colección completa de tareas.
   * @async
   * @returns {Promise<Task[]>} Promesa con el listado de tareas.
   */
  getAll: async (): Promise<Task[]> => {
    await delay(500); 
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Registra una nueva tarea con ID y timestamp generados.
   * @async
   * @param {Omit<Task, 'id' | 'createdAt'>} task - Datos base de la tarea.
   * @returns {Promise<Task>} Tarea persistida con sus metadatos.
   */
  create: async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    await delay(800);
    const tasks = await taskService.getAll();
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...tasks, newTask]));
    return newTask;
  },

  /**
   * Actualiza los datos de una tarea existente.
   * @async
   * @param {Task} updatedTask - Tarea con los nuevos valores.
   * @returns {Promise<Task>} Tarea actualizada.
   */
  update: async (updatedTask: Task): Promise<Task> => {
    await delay(300);
    const tasks = await taskService.getAll();
    const newTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    return updatedTask;
  },

  /**
   * Elimina una tarea por su ID.
   * @async
   * @param {string} id - ID de la tarea a remover.
   * @returns {Promise<void>}
   */
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const tasks = await taskService.getAll();
    const newTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  }
};