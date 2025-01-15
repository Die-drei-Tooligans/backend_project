import mongoose from "mongoose";
import carSchema from "./carModel.js";
import personalDataSchema from "./personalDataModel.js";

const userSchema = new mongoose.Schema(
	{
		deleted: { type: Boolean, default: false },
		person: { type: personalDataSchema },
		cars: {
			type: [
				{
					type: carSchema
				},
			],
			default: [],
		},
		bookings: {
			type: [
				{
					// type: mongoose.Schema.Types.ObjectId, ref: "booking"
				},
			],
			default: [],
		},
	},
	{ minimize: false },
	{ timestamps: true }
);

const adminSchema = new mongoose.Schema(
	{
		deleted: { type: Boolean, default: false },
		person: { type: personalDataSchema },
		company: {
			type: {
				type: mongoose.Schema.Types.ObjectId, ref: "company"
			},
		},
	},
	{ minimize: false },
	{ timestamps: true }
);

userSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.person.password;
	delete obj._id;
	return obj;
};

adminSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.person.password;
	delete obj._id;
	return obj;
};

export const User = mongoose.models.user || mongoose.model("user", userSchema);
export const Admin =
	mongoose.models.admin || mongoose.model("admin", adminSchema);
// carSchema (erledigte Reperaturen, Dokumente), bookingSchema, companySchema
