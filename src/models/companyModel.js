import mongoose from "mongoose";
import adressSchema from "./adressModel.js";
import { taskSchema } from "./taskModel.js";

const companySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		adress: { type: adressSchema, required: true },
		phone: { type: Number, required: true },
		email: { type: String, required: true },
		website: { type: String, required: true },
		logo: { type: String, required: true },
		about: { type: String, required: true },
		openingHours: { type: String, required: true },
		numberOfPossibilities: { type: Number, required: true },
		bookings: {
			type: [
				{
					// type: bookingModel,
				},
			],
			default: [],
		},
		tasks: {
			type: [
				{
					type: taskSchema
				},
			],
		},
	},
	{ minimize: false }
);

export const companyModel =
	mongoose.models.company || mongoose.model("company", companySchema);
