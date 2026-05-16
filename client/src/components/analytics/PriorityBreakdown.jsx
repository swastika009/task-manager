import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };

export default function PriorityBreakdown({ data }) {
  const formatted = data.map((d) => ({
    priority: d.priority,
    count: Number(d.count),
  }));

  return (
    <div style={styles.card}>
      <p style={styles.title}>Tasks by Priority</p>
      {formatted.length === 0 ? (
        <p style={styles.empty}>No tasks yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="priority" tick={{ fontSize: 13 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {formatted.map((entry, i) => (
                <Cell key={i} fill={COLORS[entry.priority] || '#4f46e5'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  title: { margin: '0 0 16px', fontSize: '14px', color: '#6b7280', fontWeight: '500' },
  empty: { color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '40px 0' },
};