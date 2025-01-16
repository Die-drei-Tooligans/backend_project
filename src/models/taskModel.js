import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
	{
		topic: { type: String, required: false },
		image: { type: String, required: false },
	},
	{ minimize: false }
);

export const taskSchema = new mongoose.Schema(
	{
		deleted: { type: Boolean, default: false },
		fitAdmin: { type: String, required: false },
		name: { type: String, required: false },
		topic: { type: String, required: false },
		image: { type: String, required: false },
		about: { type: String, required: false },
		timeRequired: { type: Number, required: false },
		isFree: { type: Boolean, required: false },
		isDoneBefore: { type: Boolean, required: false },
		doneLast: { type: Date, required: false },
		costs: { type: Number, required: false },
		neededMaterials: [
			{
				name: { type: String, required: false },
				image: { type: String, required: false },
				quantity: { type: Number, required: false },
			},
		],
		slots_booked: { type: Object, default: {} },
	},
	{ minimize: false }
);

export const Topic =
	mongoose.models.topic || mongoose.model("topic", topicSchema);

	export const Task = mongoose.models.task || mongoose.model("task", taskSchema);
