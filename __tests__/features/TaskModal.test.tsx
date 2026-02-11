import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskModal from '@/components/features/TaskModal';
import { useTaskStore } from '@/store/useTaskStore';

// Mock del store
jest.mock('@/store/useTaskStore');

describe('TaskModal Component', () => {
  const mockAddTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    (useTaskStore as unknown as jest.Mock).mockReturnValue({
      addTask: mockAddTask,
      updateTask: mockUpdateTask,
      isLoading: false
    });
  });

  test('debe mostrar "Nueva Tarea" cuando no hay tarea para editar', () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} taskToEdit={null} />);
    expect(screen.getByText(/Nueva Tarea/i)).toBeInTheDocument();
  });

  test('debe mostrar "Editar Tarea" y cargar datos cuando hay taskToEdit', () => {
    const task = { id: '1', title: 'Editable', description: 'Desc', status: 'pending' as const, createdAt: '' };
    render(<TaskModal isOpen={true} onClose={mockOnClose} taskToEdit={task} />);

    expect(screen.getByText(/Editar Tarea/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Título/i)).toHaveValue('Editable');
  });

  test('debe llamar a addTask al crear una tarea nueva', async () => {
    render(<TaskModal isOpen={true} onClose={mockOnClose} taskToEdit={null} />);

    fireEvent.change(screen.getByPlaceholderText(/Título/i), { target: { value: 'Nueva' } });
    fireEvent.change(screen.getByPlaceholderText(/Descripción/i), { target: { value: 'Desc' } });

    fireEvent.submit(screen.getByRole('button', { name: /Añadir Tarea/i }));

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith({
        title: 'Nueva',
        description: 'Desc',
        status: 'pending'
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});