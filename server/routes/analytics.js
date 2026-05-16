const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

// ─── SUMMARY ─────────────────────────────────────────────
// Total, completed, pending, overdue counts
router.get('/summary', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        COUNT(*)                                                        AS total,
        COUNT(*) FILTER (WHERE status = 'completed')                   AS completed,
        COUNT(*) FILTER (WHERE status = 'pending')                     AS pending,
        COUNT(*) FILTER (WHERE status = 'in_progress')                 AS in_progress,
        COUNT(*) FILTER (WHERE due_date < NOW()
                         AND status != 'completed')                    AS overdue
       FROM tasks
       WHERE user_id = $1`,
      [req.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch summary.' });
  }
});

// ─── TASKS COMPLETED PER DAY ──────────────────────────────
// Last 30 days — used for the line chart
router.get('/by-day', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        DATE(completed_at) AS day,
        COUNT(*)           AS count
       FROM tasks
       WHERE user_id = $1
         AND status = 'completed'
         AND completed_at >= NOW() - INTERVAL '30 days'
       GROUP BY DATE(completed_at)
       ORDER BY day ASC`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch daily data.' });
  }
});

// ─── TASKS BY PRIORITY ────────────────────────────────────
// Used for the bar chart
router.get('/by-priority', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        priority,
        COUNT(*) AS count
       FROM tasks
       WHERE user_id = $1
       GROUP BY priority
       ORDER BY priority ASC`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch priority data.' });
  }
});

// ─── OVERDUE TASKS LIST ───────────────────────────────────
// Full list of overdue tasks
router.get('/overdue', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, due_date, priority
       FROM tasks
       WHERE user_id = $1
         AND due_date < NOW()
         AND status != 'completed'
       ORDER BY due_date ASC`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch overdue tasks.' });
  }
});

module.exports = router;