const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/tasksData');

app.use(bodyParser.json());
app.use(cors());


// Import and use the tasks routes
const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

