import 'dotenv/config';
import { Admin } from '../models/userModel.js';


export const getAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            const error = new Error("Admin nicht gefunden.");
            error.status = 404;
            next(error);
        }
        res.json(admin);
    } catch (error) {
        error.message = "Admin konnte nicht abgerufen werden.";
        error.status = 400;
        next(error);
    }
}

