// backend/src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { createTask, getTasksByProject, updateTask } = require('../controllers/taskController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Route to create a task (Admin only)
router.post('/', protect, admin, createTask);

// Route to get tasks for a project
router.get('/project/:projectId', protect, getTasksByProject);

// Route to update a task (Any logged-in member can update status)
router.put('/:id', protect, updateTask);

module.exports = router;