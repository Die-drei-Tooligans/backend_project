import mongoose from "mongoose";
// import { carModel } from "./carModel.js";
// import { bookingModel } from "./bookingModel.js";
// import { companyModel } from "./companyModel.js";
// import { taskModel } from "./taskModel.js";

//userSchema und adressSchema
const adressSchema = new mongoose.Schema({
	city: { type: String, required: true },
	zipCode: { type: Number, required: true },
	street: { type: String, required: true },
	streetNum: { type: Number, required: true },
	numSupp: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		image: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: Number, required: true, unique: true },
		adress: { type: adressSchema, required: true },
		dob: { type: Date, required: true },
		isAdmin: { type: Boolean, required: true },
		//! IF isAdmin === true -> company is required, cars is NOT
		//! IF isAdmin === false -> company is NOT required, cars is required
		// company: { type: companyModel },
		cars: {
			type: [
				{
					// type: carModel,
				},
			],
			default: [],
		},
		//! bookingSchema und taskSchema müssen unterschiedliche Daten verfügbar machen
		bookings: {
			type: [
				{
					// type: bookingModel,
				},
			],
			default: [],
		},
		tasks: {type: Array, default: []},
	},
	{ minimize: false },
	{ timestamps: true }
);

userSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	delete obj._id;
	return obj;
};

export const User = mongoose.models.user || mongoose.model("user", userSchema);

// carSchema (erledigte Reperaturen, Dokumente), bookingSchema, companySchema
