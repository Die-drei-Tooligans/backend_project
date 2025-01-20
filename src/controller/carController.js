import { Car } from "../models/carModel.js";
import { User } from "../models/userModel.js";

//? http://localhost:3000/user/cars --- GET

export const getAllOwnCars = async (req, res, next) => {
    try {
        const { username } = req.body.person;
        const user = await User.findOne({ "person.username": username });

        res.json(await Car.find({fitUser: user._id}));
    } catch (error) {
        error.message = "Cars could not be found.";
        error.status = 400;
		next(error);
    }
};

//? http://localhost:3000/user/cars --- POST

export const createCar = async (req, res, next) => {
    try {
        const { username } = req.body.person;
        const { ...car } = req.body;
        
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const user = await User.findOne({ "person.username": username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const newCar = await Car.create({
            fitUser: user._id,
            ...car
        });

        return res.json({ message: "Nice to have a new car", newCar});
    } catch (error) {
        error.message = "Car could not be created.";
        error.status = 400;
        next(error);
    }
};

//? http://localhost:3000/user/cars --- PATCH

export const softDeleteAllOwnCars = async (req, res, next) => {
    try {
        const { username } = req.body.person;
        const user = await User.findOne({ "person.username": username });

        await Car.updateMany({ fitUser: user._id }, { deleted: true });

        res.json({ message: "All cars are deleted" });
    } catch (error) {
        next(error);
    }
};

//? http://localhost:3000/user/cars/:id --- GET

export const getSingleOwnCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            const error = new Error("Car could not be found.");
            error.status = 404;
            next(error);
        }
        res.json(shop);
    } catch (error) {
        error.message = "Car could not be called.";
        error.status = 400;
        next(error);
    }
}

//? http://localhost:3000/user/cars/:id --- POST

export const reactivateCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            const error = new Error("Car could not be found.");
            error.status = 404;
            next(error);
        }
        car.deleted = false;
        await car.save();
        res.json({message: "Car reactivated successfully"});
    } catch (error) {
        error.message = "Car could not be reactivated.";
        error.status = 400;
        next(error);

    }
}

//? http://localhost:3000/user/cars/:id --- PATCH

export const softDeleteOwnCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            const error = new Error("Car could not be found.");
            error.status = 404;
            next(error);
        }
        shop.deleted = true;
        await shop.save();
        res.json({message: "Car soft deleted successfully"});
    } catch (error) {
        error.message = "Car could not be deleted.";
        error.status = 400;
        next(error);

    }
}

//? http://localhost:3000/user/cars/:id --- PUT

export const editOwnCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const editedData = req.body;

        const editedCar = await Car.findByIdAndUpdate(id, editedData,
        {
            new: true,
            runValidators: true,
        });

        if(!editedCar){
            const error = new Error("Car could not be found.");
            error.status = 404;
            next(error);
        }
        res.json({message: "Car edited successfully"});
    } catch (error) {
        error.message = "Car could not be edited.";
        error.status = 400;
        next(error);
    }
}