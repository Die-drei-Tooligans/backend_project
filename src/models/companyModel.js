import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		// adress: { type: adressModel, required: true },
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
					// type: taskModel,
				},
			],
		},
	},
	{ minimize: false }
);

export const companyModel =
	mongoose.models.company || mongoose.model("company", companySchema);
