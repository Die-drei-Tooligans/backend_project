import mongoose from "mongoose";
import { carSchema } from "./carModel.js";
import { bookingSchema } from "./bookingModel.js";
import { companySchema } from "./companyModel.js";
import { taskSchema } from "./taskModel.js";

//userSchema und adressSchema

const userSchema = new mongoose.Schema({
	firstname: {type:String, required:true},
	lastname: {type:String, required:true},
	image: {type:String},
	email: {type:String, required:true, unique:true},
	password: {type:String, required:true},
	phone: {type:Number, required:true, unique:true},
	adress: {type:adressSchema, required:true},
	dob: {type:Date, required:true},
	isAdmin: {type:Boolean, required:true},
	//! IF isAdmin === true -> company is required, cars is NOT
	//! IF isAdmin === false -> company is NOT required, cars is required
	company: {type:companySchema},
	cars: {
		type: [
			{
				type: carSchema
			}
		],
		default:[]
	},
	//! bookingSchema und taskSchema müssen unterschiedliche Daten verfügbar machen
	bookings: {
		type: [
			{
				type: bookingSchema
			}
		],
		default:[]
	},
	tasks: {
		type: [
			{
				type: taskSchema
			}
		],
		default:[]
	}
	
}, {minimize:false}, {timestamps:true})

const adressSchema = new mongoose.Schema({

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

