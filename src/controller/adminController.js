import 'dotenv/config';
import { Admin } from '../models/userModel.js';

// ADMIN ADMIN ADMIN --> :3000/admin/:id
export const getAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            const error = new Error("Admin could not be found.");
            error.status = 404;
            next(error);
        }
        res.json(admin);
    } catch (error) {
        error.message = "Admin could not be called.";
        error.status = 400;
        next(error);
    }
}

export const softDeleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            const error = new Error("Admin could not be found.");
            error.status = 404;
            next(error);
        }
        admin.deleted = true;
        await admin.save();
        res.json({message: "Admin soft deleted successfully"});
    } catch (error) {
        error.message = "Admin could not be deleted.";
        error.status = 400;
        next(error);

    }
}

export const editAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const editedData = req.body;

        const editedAdmin = await Admin.findByIdAndUpdate(id, editedData,
        {
            new: true,
            runValidators: true,
        });

        if(!editedAdmin){
            const error = new Error("Admin could not be found.");
            error.status = 404;
            next(error);
        }
        res.json({message: "Admin edited successfully"});
    } catch (error) {
        error.message = "Admin could not be edited.";
        error.status = 400;
        next(error);
    }
}


export const deleteAdmin = async (req, res, next) => {
    try {
        await Admin.deleteOne({ username: req.body.username });
        res.status(202).json({ message: `${req.body.username} deleted` });
    } catch (error) {
        console.dir(error, { depth: null });
        throw new Error(error);
    }
};