const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const verifyToken = require('../middleware/verifyToken');

// Apply verifyToken to ALL task routes
router.use(verifyToken);

// ─── GET ALL TASKS ───────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
});

// ─── CREATE TASK ─────────────────────────────────────────
router.post('/', async (req, res) => {
  const { title, description, priority, due_date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, priority, due_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.userId, title, description, priority || 'medium', due_date || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to create task.' });
  }
});

// ─── UPDATE TASK ─────────────────────────────────────────
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status, due_date } = req.body;
  try {
    const result = await pool.query(
      `UPDATE tasks
       SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         priority = COALESCE($3, priority),
         status = COALESCE($4, status),
         due_date = COALESCE($5, due_date),
         completed_at = CASE
           WHEN $4 = 'completed' AND status != 'completed' THEN NOW()
           ELSE completed_at
         END
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [title, description, priority, status, due_date, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update task.' });
  }
});

// ─── DELETE TASK ─────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to delete task.' });
  }
});

module.exports = router;