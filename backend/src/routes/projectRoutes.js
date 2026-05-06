// backend/src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');
const { protect, admin } = require('../middlewares/authMiddleware');

// GET requires login. POST requires login AND Admin status.
router.route('/')
  .get(protect, getProjects)
  .post(protect, admin, createProject);

module.exports = router;