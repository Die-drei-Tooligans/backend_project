import mongoose from "mongoose";
import adressSchema from "./adressModel.js";

const personalDataSchema = new mongoose.Schema({
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    username: { type: String, unique: true },
    image: { type: String },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    phone: { type: Number, required: false, unique: true },
    adress: { type: adressSchema, required: false },
    dob: { type: Date, required: false },
}, { _id: false });

export default personalDataSchema;