import Navbar from '../components/Navbar';
import StatCard from '../components/analytics/StatCard';
import CompletionChart from '../components/analytics/CompletionChart';
import ProductivityChart from '../components/analytics/ProductivityChart';
import PriorityBreakdown from '../components/analytics/PriorityBreakdown';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Analytics() {
  const { summary, byDay, byPriority, overdue, loading } = useAnalytics();

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <p style={styles.loading}>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Analytics</h1>

        {/* Stat Cards */}
        <div style={styles.statRow}>
          <StatCard label="Total Tasks" value={summary?.total || 0} color="#4f46e5" />
          <StatCard label="Completed" value={summary?.completed || 0} color="#10b981" />
          <StatCard label="Pending" value={summary?.pending || 0} color="#f59e0b" />
          <StatCard label="Overdue" value={summary?.overdue || 0} color="#ef4444" />
        </div>

        {/* Charts row */}
        <div style={styles.chartRow}>
          <div style={styles.chartHalf}>
            <CompletionChart
              completed={Number(summary?.completed || 0)}
              total={Number(summary?.total || 0)}
            />
          </div>
          <div style={styles.chartHalf}>
            <PriorityBreakdown data={byPriority} />
          </div>
        </div>

        {/* Full width line chart */}
        <ProductivityChart data={byDay} />

        {/* Overdue list */}
        {overdue.length > 0 && (
          <div style={styles.overdueCard}>
            <p style={styles.overdueTitle}>⚠️ Overdue Tasks ({overdue.length})</p>
            {overdue.map((task) => (
              <div key={task.id} style={styles.overdueItem}>
                <span style={styles.overdueTask}>{task.title}</span>
                <span style={styles.overdueDate}>
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f3f4f6' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '20px' },
  title: { fontSize: '26px', fontWeight: '700', margin: '0 0 8px' },
  loading: { textAlign: 'center', marginTop: '80px', color: '#6b7280' },
  statRow: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  chartRow: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  chartHalf: { flex: 1, minWidth: '280px' },
  overdueCard: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderTop: '4px solid #ef4444' },
  overdueTitle: { margin: '0 0 16px', fontWeight: '600', fontSize: '15px', color: '#ef4444' },
  overdueItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' },
  overdueTask: { fontSize: '14px', fontWeight: '500' },
  overdueDate: { fontSize: '13px', color: '#9ca3af' },
};