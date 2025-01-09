import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	firstname: {type:String, required:true},
	lastname: {type:String, required:true},
	image: {type:String},
	email: {type:String, required:true, unique:true},
	password: {type:String, required:true},
	phone: {type:Number, required:true, unique:true},
	address: {type:addressSchema, required:true},
	dob: {type:Date, required:true},
	isAdmin: {type:Boolean, required:true},
	cars: {
		type: [
			{
				type: carSchema
			}
		],
		default:[]
	},
	bookings: {
		type: [
			{
				type: bookingSchema
			}
		],
		default:[]
	},
	company: {type:companySchema}
}, {minimize:false}, {timestamps:true})

//! IF isAdmin === true -> company is required, cars is NOT
//! IF isAdmin === false -> company is NOT required, cars is required

const addressSchema = new mongoose.Schema({

	city: {type:String, required:true},
	zipCode: {type:Number, required:true},
	street: {type:String, required:true},
	streetNum: {type:Number, required:true},
	numSupp: {type:String, required:true}
});

export const userModel = mongoose.models.user || mongoose.model('user', userSchema)

// carSchema (erledigte Reperaturen, Dokumente), bookingSchema, companySchema












/*
userSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	delete obj._id;
	return obj;
};
*/

