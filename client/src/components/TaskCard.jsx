const priorityColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
const statusOptions = ['pending', 'in_progress', 'completed'];

export default function TaskCard({ task, onUpdate, onDelete }) {
  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div>
          <span style={{ ...styles.priority, backgroundColor: priorityColors[task.priority] }}>
            {task.priority}
          </span>
          <h3 style={{
            ...styles.title,
            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
            color: task.status === 'completed' ? '#9ca3af' : '#111827',
          }}>
            {task.title}
          </h3>
          {task.description && <p style={styles.desc}>{task.description}</p>}
          {task.due_date && (
            <p style={styles.due}>
              Due: {new Date(task.due_date).toLocaleDateString()}
            </p>
          )}
        </div>
        <button style={styles.deleteBtn} onClick={() => onDelete(task.id)}>✕</button>
      </div>

      <div style={styles.bottom}>
        <select
          style={styles.select}
          value={task.status}
          onChange={(e) => onUpdate(task.id, { status: e.target.value })}
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '16px 20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  top: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  priority: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '99px',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  title: { margin: '0 0 4px', fontSize: '16px', fontWeight: '600' },
  desc: { margin: '0 0 4px', fontSize: '14px', color: '#6b7280' },
  due: { margin: 0, fontSize: '13px', color: '#9ca3af' },
  deleteBtn: { background: 'none', border: 'none', color: '#9ca3af', fontSize: '16px', cursor: 'pointer', padding: '0 4px' },
  bottom: { marginTop: '12px', display: 'flex', justifyContent: 'flex-end' },
  select: { padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' },
};