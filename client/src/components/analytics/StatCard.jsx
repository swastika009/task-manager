export default function StatCard({ label, value, color }) {
  return (
    <div style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
      <p style={styles.label}>{label}</p>
      <p style={{ ...styles.value, color }}>{value}</p>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    flex: 1,
    minWidth: '140px',
  },
  label: { margin: '0 0 8px', fontSize: '13px', color: '#6b7280', fontWeight: '500' },
  value: { margin: 0, fontSize: '32px', fontWeight: '700' },
};