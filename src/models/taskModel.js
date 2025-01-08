import mongoose from "mongoose";

const topicData = new mongoose.Schema(
	{
		topic: "Topic1",
		image: "prifile_img",
	},
	{
		topic: "Topic1",
		image: "prifile_img",
	}
);
const taskData = new mongoose.Schema({
	_id: "task1",
	name: "Task 1",
	topic: "Topic 1",
	image: "task1",
	about: "Task 1 is a task that is very important",
	timeRequired: 30,
	isFree: false,
	isDoneBefore: false,
	doneLast: "2021-10-10",
	costs: 100,
	neededMaterials: [
		{
			name: "Material 1",
			image: "material1",
			quantity: 1,
		},
		{
			name: "Material 2",
			image: "material2",
			quantity: 2,
		},
	],
});
export const Topic = new mongoose.Schema("Topics", topicData);
export const Task = new mongoose.Schema("Tasks", taskData);
