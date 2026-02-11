import { Task } from '@/domain/types';

const STORAGE_KEY = 'tasks_db';

// Helper para simular retardo de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    await delay(500); // Simula latencia
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  create: async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    await delay(800); // Un poco más de delay para lucir el estado "Loading" del modal
    const tasks = await taskService.getAll();
    const newTask: Task = {
      ...task, // Esto ya incluye 'description' ahora
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...tasks, newTask]));
    return newTask;
  },

  update: async (updatedTask: Task): Promise<Task> => {
    await delay(300);
    const tasks = await taskService.getAll();
    const newTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    return updatedTask;
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    const tasks = await taskService.getAll();
    const newTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  }
};