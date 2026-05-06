// backend/src/controllers/projectController.js
const Project = require('../models/Project');

// @desc    Create a new project (Admin Only)
// @route   POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create project and attach the logged-in admin's ID
    const project = await Project.create({
      name,
      description,
      admin: req.user._id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    // Finds all projects and grabs the admin's name and email to show with it
    const projects = await Project.find().populate('admin', 'name email');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};