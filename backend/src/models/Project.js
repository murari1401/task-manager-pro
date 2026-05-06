// backend/src/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Connects the project to the Admin who made it
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);