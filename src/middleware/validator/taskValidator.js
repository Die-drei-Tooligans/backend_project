import { body } from "express-validator";

export const taskValidator = [
	body("deleted").isBoolean().default(false),
	body("fitShop").notEmpty().withMessage("Must be a String"),
	body("name")
		.isString()
		.isLength({ min: 5, max: 40 })
		.withMessage("Invalid input"),
	body("topic")
		.isString()
		.isLength({ min: 5, max: 40 })
		.withMessage("String has to be 5 to 40 characters long"),
	body("image").isURL().withMessage("Has to be valid URL"),
	body("about")
		.isString()
		.isLength({ min: 5, max: 100 })
		.withMessage("String has to be 5 to 100 characters long"),

	body("timeRequired").isNumeric().withMessage("Has to be a number."),
	body("isFree").isBoolean().withMessage("Must be boolean"),
	body("isDoneBefore").isBoolean().withMessage("Must be boolean"),
	body("doneLast").isDate().withMessage("Must be date."),
	body("costs").isNumeric().withMessage("Must be a number"),
	body("neededMaterials").optional().isArray().withMessage("Must be Array"),
	body("neededMaterials.name")
		.optional()
		.isString()
		.withMessage("Must be Array"),
	body("neededMaterials.image")
		.optional()
		.isString()
		.withMessage("Must be Array"),
	body("neededMaterials.quantity")
		.optional()
		.isNumeric()
		.withMessage("Must be a number"),
	body("slots_booked")
		.optional()
		.isObject()
		.default({})
		.withMessage("Must be Object"),
];
