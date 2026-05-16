import { useState, useEffect } from 'react';
import api from '../api/axios';

export function useAnalytics() {
  const [summary, setSummary] = useState(null);
  const [byDay, setByDay] = useState([]);
  const [byPriority, setByPriority] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, d, p, o] = await Promise.all([
          api.get('/analytics/summary'),
          api.get('/analytics/by-day'),
          api.get('/analytics/by-priority'),
          api.get('/analytics/overdue'),
        ]);
        setSummary(s.data);
        setByDay(d.data);
        setByPriority(p.data);
        setOverdue(o.data);
      } catch (err) {
        console.error('Analytics fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return { summary, byDay, byPriority, overdue, loading };
}