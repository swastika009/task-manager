import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>📋 TaskManager</div>
      <div style={styles.links}>
        <Link to="/tasks" style={styles.link}>Tasks</Link>
        <Link to="/analytics" style={styles.link}>Analytics</Link>
      </div>
      <div style={styles.right}>
        <span style={styles.username}>👋 {user?.name}</span>
        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    height: '60px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  brand: { fontWeight: '700', fontSize: '18px', letterSpacing: '-0.3px' },
  links: { display: 'flex', gap: '24px' },
  link: {
    color: '#c7d2fe',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
  },
  right: { display: 'flex', alignItems: 'center', gap: '16px' },
  username: { fontSize: '14px', color: '#e0e7ff' },
  button: {
    padding: '6px 14px',
    backgroundColor: 'transparent',
    border: '1px solid #c7d2fe',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
};