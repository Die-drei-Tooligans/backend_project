import 'dotenv/config';
import bcrypt from 'bcrypt';
import { Admin } from '../models/userModel.js';
import { createToken } from '../utils/auth/createToken.js';
import { compareWithHashedPassword } from '../utils/auth/compareWithHashedPassword.js';
import { sendEmail } from '../services/sendEmail.js';

const SECRET_KEY = process.env.SECRET_KEY;

export const createAdmin = async (req, res, next) => {
    try {
        const { firstname, username, mail, password } = req.body.person;

        if (await Admin.findOne({ "person.username": username })) {
            return res.status(403).json({
                message: "Username already exists. Please choose another one.",
            });
        }

        const hashedPW = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            person: { ...req.body.person, password: hashedPW },
        });
        console.log(newAdmin);

        sendEmail(username, mail);

        res.status(201).json({
            message: `Nice to meet you ${firstname}`,
            newAdmin,
        });
    } catch (error) {
        console.dir(error, { depth: null });
    }
};

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

export const loginAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({
            "person.username": req.body.person.username,
        });

        const hashed = await compareWithHashedPassword(
            req.body.person.password,
            user.person.password
        );

        if (!admin || !hashed) {
            return res.json({ message: "Invalid credentials" });
        }

        const token = await createToken(
            { username: user.person.username },
            SECRET_KEY,
            {
                expiresIn: "1h",
            }
        );
        console.log(token);
        res.status(200)
            .cookie("token", token, {
                httpOnly: true,
            })
            .json({ message: "Logged in.", token });
    } catch (error) {
        console.dir(error, { depth: null });
        res.status(402).json({ message: "Some error.", error });
    }
};