const mongoose = require('mongoose');

// Define the schema for the Task model
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: String, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);
