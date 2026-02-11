import { taskService } from '@/services/taskService';
import { Task } from '@/domain/types';
describe('taskService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('debe guardar y recuperar tareas del localStorage', async () => {
    const taskData = <Task>{ title: 'Persistencia', description: 'Test', status: 'pending' };
    
    // Crear
    const created = await taskService.create(taskData);
    expect(created.title).toBe(taskData.title);
    
    // Recuperar
    const all = await taskService.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe(created.id);
  });

  test('debe eliminar una tarea del localStorage', async () => {
    const task = await taskService.create({ title: 'A borrar', description: '', status: 'pending' });
    await taskService.delete(task.id);
    
    const all = await taskService.getAll();
    expect(all).toHaveLength(0);
  });
});