import { body } from "express-validator";

export const taskValidator = [
	body("deleted").isBoolean().default(false),
	body("fitShop")
		.optional()
		.isString()
		.trim()
		.notEmpty()
		.withMessage("FitShop must be a non-empty string"),
	body("name")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 100 })
		.withMessage("Name must be a string between 1 and 100 characters long"),
	body("topic")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 100 })
		.withMessage(
			"Topic must be a string between 1 and 100 characters long"
		),
	body("image").optional().isURL().withMessage("Image must be a valid URL"),
	body("about")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 1000 })
		.withMessage(
			"About must be a string between 1 and 1000 characters long"
		),
	body("timeRequired")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Time required must be a positive integer"),
	body("isFree")
		.optional()
		.isBoolean()
		.withMessage("IsFree must be a boolean"),
	body("isDoneBefore")
		.optional()
		.isBoolean()
		.withMessage("IsDoneBefore must be a boolean"),
	body("doneLast")
		.optional()
		.isISO8601()
		.toDate()
		.withMessage("DoneLast must be a valid date"),
	body("costs")
		.optional()
		.isFloat({ min: 0 })
		.withMessage("Costs must be a non-negative number"),
	body("neededMaterials")
		.optional()
		.isArray()
		.withMessage("NeededMaterials must be an array"),
	body("neededMaterials.*.name")
		.optional()
		.isString()
		.trim()
		.notEmpty()
		.withMessage("Material name must be a non-empty string"),
	body("neededMaterials.*.image")
		.optional()
		.isURL()
		.withMessage("Material image must be a valid URL"),
	body("neededMaterials.*.quantity")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Material quantity must be a positive integer"),
	body("slots_booked")
		.optional()
		.isObject()
		.withMessage("Slots booked must be an object"),
];
