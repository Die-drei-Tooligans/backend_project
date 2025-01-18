import mongoose from "mongoose";

const adressSchema = new mongoose.Schema(
	{
		city: { type: String, required: false },
		zipCode: { type: Number, required: false },
		street: { type: String, required: false },
		streetNum: { type: Number, required: false },
		numSupp: { type: String, required: false },
	},
	{ _id: false }
);

export default adressSchema;
