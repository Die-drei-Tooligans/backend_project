import { Car } from "../models/carModel.js";
import { User } from "../models/userModel.js";

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



//DELETEDELETEDELETEDELETE
export const deleteCar = async (req, res, next) => {
    try {
        await Car.deleteOne({ username: req.body.username });
        res.status(202).json({ message: `${req.body.username} deleted` });
    } catch (error) {
        console.dir(error, { depth: null });
        throw new Error(error);
    }
};