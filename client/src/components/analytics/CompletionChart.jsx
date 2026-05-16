import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4f46e5', '#e5e7eb'];

export default function CompletionChart({ completed, total }) {
  const pending = total - completed;
  const data = [
    { name: 'Completed', value: Number(completed) },
    { name: 'Remaining', value: Number(pending) },
  ];

  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={styles.card}>
      <p style={styles.title}>Completion Rate</p>
      <p style={styles.rate}>{rate}%</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  title: { margin: '0 0 4px', fontSize: '14px', color: '#6b7280', fontWeight: '500' },
  rate: { margin: '0 0 8px', fontSize: '36px', fontWeight: '700', color: '#4f46e5' },
};