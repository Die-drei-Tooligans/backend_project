import mongoose from "mongoose";
import adressSchema from "./adressModel.js";

const companySchema = new mongoose.Schema(
	{
		deleted: { type: Boolean, default: false },
		fitAdmin: { type: String, required: false },
		name: { type: String, required: false },
		adress: { type: adressSchema, required: false },
		phone: { type: Number, required: false },
		email: { type: String, required: false },
		website: { type: String, required: false },
		logo: { type: String, required: false },
		about: { type: String, required: false },
		openingHours: { type: String, required: false },
		numberOfPossibilities: { type: Number, required: false },
		bookings: {
			type: [
				{
					// type: bookingModel,
				},
			],
			default: [],
		},
		tasks: { type: Array, default: []},
	},
	{ minimize: false }
);

export const Company =
	mongoose.models.company || mongoose.model("company", companySchema);
