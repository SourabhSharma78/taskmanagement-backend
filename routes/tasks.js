const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET route to retrieve all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to create a new task
router.post('/', async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    });
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE route to delete a task by id
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
