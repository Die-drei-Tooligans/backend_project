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

export const softDeleteAllOwnShops = async (req, res, next) => {
    try {
        const { username } = req.body.person;
        const admin = await Admin.findOne({ "person.username": username });

        await Company.updateMany({ fitAdmin: admin._id }, { deleted: true });

        res.json({ message: "All shops are deleted" });
    } catch (error) {
        next(error);
    }
};

//? http://localhost:3000/admin/manageshops/:id

export const getSingleOwnShop = async (req, res, next) => {
    try {
        const shop = await Company.findById(req.params.id);

        if (!shop) {
            const error = new Error("Company could not be found.");
            error.status = 404;
            next(error);
        }
        res.json(shop);
    } catch (error) {
        error.message = "Company could not be called.";
        error.status = 400;
        next(error);
    }
}

export const softDeleteOwnShop = async (req, res) => {
    try {
        const shop = await Company.findById(req.params.id);

        if (!shop) {
            const error = new Error("Companycould not be found.");
            error.status = 404;
            next(error);
        }
        shop.deleted = true;
        await shop.save();
        res.json({message: "Company soft deleted successfully"});
    } catch (error) {
        error.message = "Company could not be deleted.";
        error.status = 400;
        next(error);

    }
}

export const editOwnShop = async (req, res, next) => {
    try {
        const { id } = req.params;
        const editedData = req.body;

        const editedShop = await Company.findByIdAndUpdate(id, editedData,
        {
            new: true,
            runValidators: true,
        });

        if(!editedShop){
            const error = new Error("Company could not be found.");
            error.status = 404;
            next(error);
        }
        res.json({message: "Company edited successfully"});
    } catch (error) {
        error.message = "Company could not be edited.";
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