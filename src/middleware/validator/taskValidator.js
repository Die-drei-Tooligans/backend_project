import { body } from "express-validator";

export const taskValidator = [
	body("deleted").isBoolean().default(false),
	body("fitShop").notEmpty().withMessage("Must be a String"),
	body("name")
		.optional()
		.isString()
		.isLength({ min: 5, max: 40 })
		.withMessage("Invalid input"),
	body("topic")
		.optional()
		.isString()
		.isLength({ min: 5, max: 40 })
		.withMessage("String has to be 5 to 40 characters long"),
	body("image").optional().isURL().withMessage("Has to be valid URL"),
	body("about")
		.optional()
		.isString()
		.isLength({ min: 5, max: 100 })
		.withMessage("String has to be 5 to 100 characters long"),

	body("timeRequired")
		.optional()
		.isNumeric()
		.default(15)
		.withMessage("Has to be a number."),
	body("isFree").optional().isBoolean().withMessage("Must be boolean"),
	body("isDoneBefore").optional().isBoolean().withMessage("Must be boolean"),
	body("doneLast").optional().isDate().withMessage("Must be date."),
	body("costs").optional().isNumeric().withMessage("Must be a number"),
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
