/**
 * Estados permitidos para una tarea dentro del ciclo de vida del proyecto.
 * @typedef {'pending' | 'in-progress' | 'completed'} TaskStatus
 */
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

/**
 * Representa la entidad principal de una Tarea.
 * @interface Task
 */
export interface Task {
  /** @property {string} id - Identificador único universal (UUID). */
  id: string;
  /** @property {string} title - Título breve de la tarea. */
  title: string;
  /** @property {string} description - Detalle extenso de la actividad a realizar. */
  description: string;
  /** @property {TaskStatus} status - Estado actual de la tarea. */
  status: TaskStatus;
  /** @property {string} createdAt - Fecha de creación en formato ISO string. */
  createdAt: string;
}

/**
 * Representa la sesión del usuario autenticado.
 * @interface User
 */
export interface User {
  /** @property {string} email - Identificador del usuario. */
  email: string;
  /** @property {string} token - JWT ficticio para manejo de sesión. */
  token: string;
}