import { Task } from '../models/taskModel.js';



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
export const softDeleteAllTasks = async (req, res) => {
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

export  const deleteSingleOwnTask = async (req, res) => {
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

export const editOwnTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const { password, ...rest } = req.body;
        const updatedTask = await Task.updateOne({ _id: task._id }, rest);
        return res.json({ message: "Done", updatedTask });
    } catch (error) {
        res.status(400).json({ message: "Could not edit Task" });
    }
};

export const softDeleteOwnTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updatedTask = await Task.updateOne({ _id: task._id }, { deleted: true });
        return res.json({ message: "Done", updatedTask });
    } catch (error) {
        res.status(400).json({ message: "Could not delete Task" });
    }   
};

export const deleteAllOwnTasks = async (req, res) => {
    try {
        const tasks = await Task.deleteMany({ deleted: true });
        return res.json({ message: "Done", tasks });
    } catch (error) {
        res.status(400).json({ message: "Could not delete Tasks" });
    }
};









//? http://localhost:3000/admin/managetasks --- POST

export const createTask = async (req, res, next) => {
    try {
        const { shopId, ...rest } = req.body;
        
        if (!shopId) {
            return res.status(400).json({ message: "Id is required" });
        }

        const shop = await Company.findOne({ "shopId": shopId });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        const newTask = await Task.create({
            fitCompany: shop._id,
            ...rest
        });

        shop.tasks.push(newTask._id);

        return res.json({ message: "Nice to have a new company", newCompany});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not add company" });
    }
};

//? http://localhost:3000/admin/managetasks --- PATCH

export const softDeleteAllOwnTasks = async (req, res) => {
    try {
        const tasks = await Task.updateMany({ deleted: false }, { deleted: true });
        return res.json({ message: "Done", tasks });
    } catch (error) {
        res.status(400).json({ message: "Could not delete Tasks" });
    }
};

//? http://localhost:3000/admin/managetasks/:id --- POST 

export const reactivateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            const error = new Error("Task could not be found.");
            error.status = 404;
            next(error);
        }
        task.deleted = false;
        await task.save();
        res.json({message: "Task reactivated successfully"});
    } catch (error) {
        error.message = "Task could not be reactivated.";
        error.status = 400;
        next(error);

    }
}