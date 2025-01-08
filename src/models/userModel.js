import mongoose from "mongoose";

const adressSchema = new mongoose.Schema({
	city: { type: String },
	zipCode: { type: Number },
	street: { type: String },
	streetNum: { type: Number },
	numSupp: { type: String },
});

const userSchema = new mongoose.Schema(
	{
		firstname: { type: String },
		username: { type: String, unique: true },
		mail: { type: String },
		password: { type: String },
		adress: { type: adressSchema },
	},
	{
		timestamps: true,
	}
);

userSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	delete obj._id;
	return obj;
};

export const User = mongoose.model("Users", userSchema);
