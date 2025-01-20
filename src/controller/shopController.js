import { Admin } from "../models/userModel.js";
import { Company } from "../models/companyModel.js";


//? http://localhost:3000/admin/manageshops ---GET

export const getAllOwnShops = async (req, res, next) => {
    try {
        const { username } = req.body.person;
        const admin = await Admin.findOne({ "person.username": username });

        res.json(await Company.find({fitAdmin: admin._id}));
    } catch (error) {
        next(error);
    }
};

//? http://localhost:3000/admin/manageshops --- POST

export const createShop = async (req, res, next) => {
    try {
        const { username } = req.body.person;
        const { ...company } = req.body;
        
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const admin = await Admin.findOne({ "person.username": username });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const newCompany = await Company.create({
            fitAdmin: admin._id,
            ...company
        });

        return res.json({ message: "Nice to have a new company", newCompany});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not add company" });
    }
};

//? http://localhost:3000/admin/manageshops --- PATCH

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

//? http://localhost:3000/admin/manageshops/:id --- GET

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

//? http://localhost:3000/admin/manageshops/:id --- POST

export const reactivateShop = async (req, res) => {
    try {
        const shop = await Company.findById(req.params.id);

        if (!shop) {
            const error = new Error("Company could not be found.");
            error.status = 404;
            next(error);
        }
        shop.deleted = false;
        await shop.save();
        res.json({message: "Company reactivated successfully"});
    } catch (error) {
        error.message = "Company could not be reactivated.";
        error.status = 400;
        next(error);

    }
}

//? http://localhost:3000/admin/manageshops/:id --- PATCH

export const softDeleteOwnShop = async (req, res) => {
    try {
        const shop = await Company.findById(req.params.id);

        if (!shop) {
            const error = new Error("Company could not be found.");
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

//? http://localhost:3000/admin/manageshops/:id --- PUT

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