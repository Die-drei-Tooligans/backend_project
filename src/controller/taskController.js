import { Task } from '../models/taskModel.js';

// ADMIN & USER ADMIN & USER ADMIN & USER ADMIN & USER

//? http://localhost/3000/tasks --- GET

export const getAllTasks = async (req, res, next) => {
    try {
        const { searchedTask } = req.body;

        if (!searchedTask) {
            return res.status(400).json({ message: "No task found." });
        }

        res.json(await Task.find(
            { name: searchedTask },
            { deleted: false }
        ));

    } catch (error) {
        error.message = "Task could not be found.";
        error.status = 400;
        next(error);
    }
};

//? http://localhost/3000/tasks/:id --- GET

export const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id });

        if (!task) {
            return res.status(400).json({ message: "Wrong id." });
        }
        res.status(200).json({ message: task });
    } catch (error) {
        error.message = "Task could not be found.";
        error.status = 400;
        next(error);
    }
};

// ADMIN ADMIN ADMIN ADMIN ADMIN

//? http://localhost:3000/admin/managetasks --- POST

export const createTask = async (req, res, next) => {
    try {
        const { shopId, ...rest } = req.body;
        
        if (!shopId) {
            return res.status(400).json({ message: "ShopId is required" });
        }

        const shop = await Company.findOne({ "shopId": shopId });

        if (!shop) {
            return res.status(404).json({ message: "Company not found" });
        }

        const newTask = await Task.create({
            fitShop: shop._id,
            ...rest
        });

        shop.tasks.push(newTask._id);

        return res.json({ message: "Nice to have a new task", newTask});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not add task." });
    }
};

//? http://localhost:3000/admin/managetasks --- PATCH

export const softDeleteAllOwnTasks = async (req, res) => {
    try {
        const { shopId } = req.body;

        await Task.updateMany(
            { fitShop: shopId },
            { deleted: true }
        );

       return res.json({ message: "Softdeleted all tasks."});
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
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
        admin.deleted = false;
        await task.save();
        res.json({message: "Task reactivated successfully"});
    } catch (error) {
        error.message = "Task could not be reactivated.";
        error.status = 400;
        next(error);

    }
}

//? http://localhost:3000/admin/managetasks/:id --- PATCH

export const softDeleteSingleOwnTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id,
            { deleted: true },
            { new: true });

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

//? http://localhost:3000/admin/managetasks/:id --- PUT

export const editOwnTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,
            { new: true, 
            runValidators: true });
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