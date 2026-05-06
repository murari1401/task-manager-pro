// backend/src/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a task title']
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Connects the task to a specific Project
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Connects the task to a specific Member
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);