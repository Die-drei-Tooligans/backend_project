import mongoose from "mongoose";
// import { carModel } from "./carModel.js";
// import { bookingModel } from "./bookingModel.js";
import { companyModel } from "./companyModel.js";
// import { taskModel } from "./taskModel.js";

//userSchema und adressSchema

const adressSchema = new mongoose.Schema({
	city: { type: String, required: false },
	zipCode: { type: Number, required: false },
	street: { type: String, required: false },
	streetNum: { type: Number, required: false },
	numSupp: { type: String, required: false },
});

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
});

const userSchema = new mongoose.Schema(
	{
		person: { type: personalDataSchema },
		cars: {
			type: [
				{
					// type: carModel,
				},
			],
			default: [],
		},
		bookings: {
			type: [
				{
					// type: bookingModel,
				},
			],
			default: [],
		},
	},
	{ minimize: false },
	{ timestamps: true }
);

const adminSchema = new mongoose.Schema({
	person: { type: personalDataSchema },
	company: {
		type: {
			// type: companyModel,
		},
	},
});

userSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	delete obj._id;
	return obj;
};

export const User = mongoose.models.user || mongoose.model("user", userSchema);
export const Admin =
	mongoose.models.admin || mongoose.model("admin", adminSchema);
// carSchema (erledigte Reperaturen, Dokumente), bookingSchema, companySchema
