import mongoose from "mongoose";

import adressSchema from "./adressModel.js";

const personalDataSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: false },
		lastname: { type: String, required: false },
		username: { type: String },
		image: { type: String },
		mail: { type: String, required: false },
		password: { type: String, required: false },
		phone: { type: Number, required: false },
		adress: { type: adressSchema, required: false },
		dob: { type: Date, required: false },
	},
	{ _id: false }
);

export default personalDataSchema;
