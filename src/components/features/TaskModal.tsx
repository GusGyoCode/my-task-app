"use client";
import { useState, useEffect } from 'react';
import { useTaskStore } from '@/store/useTaskStore';
import { Task } from '@/domain/types';
import Button from '../ui/Button';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null; // Si existe, estamos editando
}

export default function TaskModal({ isOpen, onClose, taskToEdit }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask, updateTask, isLoading } = useTaskStore();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [taskToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (taskToEdit) {
      await updateTask({ ...taskToEdit, title, description });
    } else {
      await addTask({ title, description, status: 'pending' });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="bg-white border border-zinc-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl">
        <h3 className="text-xl font-bold text-[#2D2D2D]">{taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
        <input
          required value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-zinc-800 p-3 rounded-xl text-[#2D2D2D] outline-none focus:ring-1 focus:ring-accent"
          placeholder="Título"
        />
        <textarea
          required value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-zinc-800 p-3 rounded-xl text-[#2D2D2D] outline-none focus:ring-1 focus:ring-accent"
          placeholder="Descripción" rows={4}
        />
        <div className="flex gap-3 justify-end">
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>
            {taskToEdit ? isLoading ? 'Guardando...' : 'Guardar Cambios' : isLoading ? 'Añadiendo...' : 'Añadir Tarea'}
          </Button>
        </div>
      </form>
    </div>
  );
}