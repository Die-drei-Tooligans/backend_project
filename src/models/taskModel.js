import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
	topic: {type:String, required:true},
	image: {type:String, required:true}
},{minimize:false})

export const taskSchema = new mongoose.Schema({
    name: {type:String, required:true, unique:true},
    topic: {type:String, required:true},
    image: {type:String, required:true},
    about: {type:String, required:true},
    timeRequired: {type:Number, required:true},
    isFree: {type:Boolean, required:true},
    isDoneBefore: {type:Boolean, required:true},
    doneLast: {type:Date, required:true},
    costs: {type:Number, required:true},
    neededMaterials: [
        {
            name: {type:String, required:true},
            image: {type:String, required:true},
            quantity: {type:Number, required:true}
        }
    ],
    slots_booked: {type:Object, default:{}}
},{minimize:false})

export const Topic = mongoose.models.topic || mongoose.model('topic', topicSchema)
export const Task = mongoose.models.task || mongoose.model('task', taskSchema)