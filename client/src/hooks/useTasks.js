import { useState, useEffect } from 'react';
import api from '../api/axios';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    const res = await api.post('/tasks', taskData);
    setTasks((prev) => [res.data, ...prev]);
  };

  const updateTask = async (id, updates) => {
    const res = await api.put(`/tasks/${id}`, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, loading, error, addTask, updateTask, deleteTask };
}