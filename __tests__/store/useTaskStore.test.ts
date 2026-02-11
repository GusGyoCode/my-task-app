import { useTaskStore } from '@/store/useTaskStore';
import { taskService } from '@/services/taskService';
import { Task } from '@/domain/types';
// Mock del servicio para no depender de localStorage real en el test
jest.mock('@/services/taskService');

describe('useTaskStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reiniciamos el estado del store manualmente si es necesario
    useTaskStore.setState({ tasks: [], isLoading: false, error: null });
  });

  test('debe cargar las tareas exitosamente (fetchTasks)', async () => {
    const mockTasks = [
      { id: '1', title: 'Tarea 1', description: 'Desc 1', status: 'pending', createdAt: '' }
    ];
    (taskService.getAll as jest.Mock).mockResolvedValue(mockTasks);

    await useTaskStore.getState().fetchTasks();

    expect(useTaskStore.getState().tasks).toEqual(mockTasks);
    expect(useTaskStore.getState().isLoading).toBe(false);
  });

  test('debe agregar una nueva tarea (addTask)', async () => {
    const newTaskData = <Task>{ title: 'Nueva', description: 'Nueva Desc', status: 'pending' };
    const createdTask = { ...newTaskData, id: '123', createdAt: new Date().toISOString() };
    
    (taskService.create as jest.Mock).mockResolvedValue(createdTask);

    await useTaskStore.getState().addTask(newTaskData);

    const state = useTaskStore.getState();
    expect(state.tasks).toContainEqual(createdTask);
    expect(state.isLoading).toBe(false);
  });

  test('debe actualizar el estado de una tarea (updateTask)', async () => {
    const initialTask = <Task>{ id: '1', title: 'T1', description: 'D1', status: 'pending', createdAt: '' };
    const updatedTask = <Task>{ ...initialTask, status: 'completed' };
    
    useTaskStore.setState({ tasks: [initialTask] });
    (taskService.update as jest.Mock).mockResolvedValue(updatedTask);

    await useTaskStore.getState().updateTask(updatedTask);

    const task = useTaskStore.getState().tasks.find(t => t.id === '1');
    expect(task?.status).toBe('completed');
  });

  test('debe eliminar una tarea (removeTask)', async () => {
    const taskToDelete = <Task>{ id: '99', title: 'Eliminar', description: '', status: 'pending', createdAt: '' };
    useTaskStore.setState({ tasks: [taskToDelete] });
    (taskService.delete as jest.Mock).mockResolvedValue(undefined);

    await useTaskStore.getState().removeTask('99');

    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });
});