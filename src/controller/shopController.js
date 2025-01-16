import { Admin } from "../models/userModel.js";
import { Company } from "../models/companyModel.js";

export const createShop = async (req, res, next) => {
    try {
        const { person, company } = req.body;
        
        if (!person || !person.username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // Suche den Benutzer anhand des Benutzernamens
        const admin = await Admin.findOne({ "person.username": person.username });

        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!company) {
            return res.status(400).json({ message: "Cars data is required" });
        }
        const newCompany = await Company.create({
                    company: { ...req.body.company },
                });

        const updatedAdmin = await Admin.updateOne(
            { _id: admin._id },
            { $set: { company: newCompany } }
        );
        

        return res.json({ message: "Car(s) added successfully", updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not add car(s)" });
    }
};