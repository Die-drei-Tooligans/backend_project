import { body } from "express-validator";

export const companyValidator = [
	body("fitAdmin")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 3, max: 50 })
		.withMessage("fitAdmin must be a string between 3 and 50 characters."),
	body("name")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 2, max: 100 })
		.withMessage("Name must be a string between 2 and 100 characters."),
	body("adress")
		.optional()
		.isObject()
		.withMessage("Adress must be a valid object."),
	body("phone")
		.optional()
		.isMobilePhone("any")
		.withMessage("Phone must be a valid mobile phone number."),
	body("email")
		.optional()
		.isEmail()
		.withMessage("Email must be a valid email address."),
	body("website")
		.optional()
		.isURL()
		.withMessage("Website must be a valid URL."),
	body("logo").optional().isURL().withMessage("Logo must be a valid URL."),
	body("about")
		.optional()
		.trim()
		.isString()
		.isLength({ max: 500 })
		.withMessage(
			"About must be a string with a maximum of 500 characters."
		),
	body("openingHours")
		.optional()
		.trim()
		.isString()
		.withMessage("Opening hours must be a string."),
	body("numberOfPossibilities")
		.optional()
		.isInt({ min: 0 })
		.withMessage("Number of possibilities must be a non-negative integer."),
	body("bookings")
		.optional()
		.isArray()
		.withMessage("Bookings must be an array."),
	body("tasks").optional().isArray().withMessage("Tasks must be an array."),
];
