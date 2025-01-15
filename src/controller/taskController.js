// import Task from '../models/taskModel';



// Get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            status: 'success',
            results: tasks.length,
            data: {
                tasks
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get a single task
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                status: 'fail',
                message: 'No task found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                task
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Create a new task (admin)
export const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                task: newTask
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update a task (admin)
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).json({
                status: 'fail',
                message: 'No task found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                task
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Soft delete a task (admin)
export const softDeleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { deleted: true }, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).json({
                status: 'fail',
                message: 'No task found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                task
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a task (admin)
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({
                status: 'fail',
                message: 'No task found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};