import { Task } from '../models/taskModel.js';

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

export const softDeleteAllOwnTasks = async (req, res) => {
    try {
        await Task.updateMany({ user: req.user.id }, { deleted: true });
        res.status(200).json({
            status: 'success',
            message: 'All tasks soft deleted'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

export const softDeleteOwnTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
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

export const editOwnTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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