// backend/src/controllers/taskController.js
const Task = require('../models/Task');

// @desc    Create a new task (Admin Only)
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, project, assignedTo } = req.body;
    const task = await Task.create({ title, project, assignedTo });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks for a specific project
// @route   GET /api/tasks/project/:projectId
exports.getTasksByProject = async (req, res) => {
  try {
    // Finds tasks for the project and gets the assigned user's name
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task status (Logged in users)
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};