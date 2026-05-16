import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: '', description: '', priority: 'medium', due_date: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    setForm({ title: '', description: '', priority: 'medium', due_date: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input style={styles.input} name="title" placeholder="Task title" value={form.title} onChange={handleChange} required />
      <textarea style={styles.textarea} name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} rows={3} />
      <div style={styles.row}>
        <select style={styles.select} name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <input style={styles.input} type="date" name="due_date" value={form.due_date} onChange={handleChange} />
      </div>
      <button style={styles.button} type="submit">Add Task</button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  input: { padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' },
  textarea: { padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', resize: 'vertical' },
  select: { padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', flex: 1 },
  row: { display: 'flex', gap: '12px' },
  button: { padding: '10px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' },
};