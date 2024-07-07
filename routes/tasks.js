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
router.post('/tasksData', async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        completed: false
    });
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE route to delete a task by id
router.put('/:id', async (req, res) => {
    try {

        // update task as completed
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: { completed: true } },
            { new: true }
        );

        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.json({ message: task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
