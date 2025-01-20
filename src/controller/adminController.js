import "dotenv/config";
import { Admin } from "../models/userModel.js";

// ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN

//? http://localhost:3000/admin/manageprofile/:id  --- GET
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
};

//? http://localhost:3000/admin/manageprofile/:id  --- POST

export const reactivateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            const error = new Error("Admin could not be found.");
            error.status = 404;
            next(error);
        }
        admin.deleted = false;
        await admin.save();
        res.json({message: "Admin reactivated successfully"});
    } catch (error) {
        error.message = "Admin could not be reactivated.";
        error.status = 400;
        next(error);

    }
}

//? http://localhost:3000/admin/manageprofile/:id  --- PATCH

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
		res.json({ message: "Admin soft deleted successfully" });
	} catch (error) {
		error.message = "Admin could not be deleted.";
		error.status = 400;
		next(error);
	}
};

//? http://localhost:3000/admin/manageprofile/:id  --- PUT

export const editAdmin = async (req, res, next) => {
	try {
		const { id } = req.params;
		const editedData = req.body;

		const editedAdmin = await Admin.findByIdAndUpdate(id, editedData, {
			new: true,
			runValidators: true,
		});

		if (!editedAdmin) {
			const error = new Error("Admin could not be found.");
			error.status = 404;
			next(error);
		}
		res.json({ message: "Admin edited successfully" });
	} catch (error) {
		error.message = "Admin could not be edited.";
		error.status = 400;
		next(error);
	}
};