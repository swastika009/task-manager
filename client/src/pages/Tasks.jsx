import { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../hooks/useTasks';

export default function Tasks() {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Tasks</h1>
          <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Task'}
          </button>
        </div>

        {showForm && (
          <TaskForm
            onSubmit={async (data) => {
              await addTask(data);
              setShowForm(false);
            }}
          />
        )}

        {loading && <p style={styles.msg}>Loading tasks...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!loading && tasks.length === 0 && (
          <p style={styles.msg}>No tasks yet — create your first one!</p>
        )}

        <div style={styles.list}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f3f4f6' },
  container: { maxWidth: '800px', margin: '0 auto', padding: '32px 16px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { fontSize: '26px', fontWeight: '700', margin: 0 },
  addBtn: {
    padding: '8px 18px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  msg: { color: '#6b7280', textAlign: 'center', marginTop: '40px' },
  error: { color: '#b91c1c', textAlign: 'center', marginTop: '40px' },
};