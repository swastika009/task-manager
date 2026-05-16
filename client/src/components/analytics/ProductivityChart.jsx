import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProductivityChart({ data }) {
  const formatted = data.map((d) => ({
    day: new Date(d.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    count: Number(d.count),
  }));

  return (
    <div style={styles.card}>
      <p style={styles.title}>Tasks Completed — Last 30 Days</p>
      {formatted.length === 0 ? (
        <p style={styles.empty}>No completions yet — complete some tasks to see your trend!</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
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