import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '@/components/features/TaskCard';
import { Task } from '@/domain/types';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'pending',
  createdAt: new Date().toISOString(),
};

describe('TaskCard Component', () => {
  const mockSetSelectedTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockRemoveTask = jest.fn();

  const renderCard = () => render(
    <TaskCard
      index={0}
      task={mockTask}
      setSelectedTask={mockSetSelectedTask}
      updateTask={mockUpdateTask}
      removeTask={mockRemoveTask}
    />
  );

  test('debe mostrar el título, descripción y estado correctamente', () => {
    renderCard();
    expect(screen.getByText(/#1 Test Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByTestId('task-status')).toHaveTextContent(/Pendiente/i);
  });

  test('debe llamar a removeTask cuando se pulsa el botón de eliminar', () => {
    renderCard();
    const deleteBtn = screen.getByRole('button', { name: /Eliminar tarea/i });
    fireEvent.click(deleteBtn);

    expect(mockRemoveTask).toHaveBeenCalledWith(mockTask.id);
  });

  test('debe abrir el menú de estados al hacer click en el selector', () => {
    renderCard();
    const selector = screen.getByRole('button', { name: /Pendiente/i });
    fireEvent.click(selector);

    expect(screen.getByText(/En progreso/i)).toBeInTheDocument();
    expect(screen.getByText(/Completada/i)).toBeInTheDocument();
  });
});