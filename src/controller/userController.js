import bcrypt from "bcrypt";

import { User } from "../models/userModel.js";


/// USER & ADMIN USER & ADMIN USER & ADMIN USER & ADMIN USER & ADMIN
//? http://localhost:3000/user --- GET

export const getSingleUser = async (req, res, next) => {
	try {
		const { mail } = req.body.person;
		const user = await User.person.findOne({ mail });

		if (!user) {
			return res.status(400).json({ message: "Wrong mail adress" });
		}
		res.status(200).json({ message: user });
	} catch (error) {
		error.message = "User could not be found.";
        error.status = 400;
		next(error);
	}
};

//? http://localhost:3000/user --- PATCH

export const softDeleteUser = async (req, res) => {
    try {
        const { mail } = req.body.person;
		const user = await User.person.findOne({ mail });

        if (!user) {
            const error = new Error("User could not be found.");
            error.status = 404;
            next(error);
        }
        user.deleted = true;
        await user.save();
        res.json({message: "User soft deleted successfully."});
    } catch (error) {
        error.message = "User could not be deleted.";
        error.status = 400;
        next(error);
    }
}

//? http://localhost:3000/user --- PUT

export const editSingleUser = async (req, res, next) => {
	try {
		const { mail } = req.body.mail;
		const editedData = req.body.person;

		const user = await User.person.findOne(mail, editedData,
			{
				new: true,
				runValidators: true,
			});
		
			if(!user){
				const error = new Error("User could not be found.");
				error.status = 404;
				next(error);
			}
			res.json({message: "User edited successfully"});
	} catch (error) {
		error.message = "User could not be updated.";
        error.status = 400;
        next(error);
	}
};

// ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN ADMIN

//? http://localhost:3000/admin/manageusers --- GET

export const getAllUsers = async (req, res, next) => {
	try {
		res.json(await User.find());
	} catch (error) {
		next(error);
	}
};

//? http://localhost:3000/admin/manageusers --- DELETE

export const deleteAllUsers = async (req, res, next) => {
	try {
		await User.deleteMany();

		res.status(201).json({ message: `Deleted all users.` });
	} catch (error) {
		next(error);
	}
};

//? http://localhost:3000/admin/manageusers/:id --- DELETE

export const deleteUser = async (req, res, next) => {
	try {
		await User.deleteOne({ username: req.body.username });
		res.status(202).json({ message: `${req.body.username} deleted` });
	} catch (error) {
		console.dir(error, { depth: null });
		throw new Error(error);
	}
};
