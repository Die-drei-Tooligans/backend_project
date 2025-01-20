import { body } from "express-validator";

export const companyValidator = [
	body("fitAdmin")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.isLength({ min: 3, max: 50 })
		.withMessage("fitAdmin must be a string between 3 and 50 characters."),
	body("name")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.isLength({ min: 2, max: 100 })
		.withMessage("Name must be a string between 2 and 100 characters."),
	body("adress")
		.optional({ nullbase: true })
		.isObject()
		.withMessage("Adress must be a valid object."),
	body("phone")
		.optional({ nullbase: true })
		.isMobilePhone("any")
		.withMessage("Phone must be a valid mobile phone number."),
	body("email")
		.optional({ nullbase: true })
		.isEmail()
		.withMessage("Email must be a valid email address."),
	body("website")
		.optional({ nullbase: true })
		.isURL()
		.withMessage("Website must be a valid URL."),
	body("logo")
		.optional({ nullbase: true })
		.isURL()
		.withMessage("Logo must be a valid URL."),
	body("about")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.isLength({ max: 500 })
		.withMessage(
			"About must be a string with a maximum of 500 characters."
		),
	body("openingHours")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.withMessage("Opening hours must be a string."),
	body("numberOfPossibilities")
		.optional({ nullbase: true })
		.isInt({ min: 0 })
		.withMessage("Number of possibilities must be a non-negative integer."),
	body("bookings")
		.optional({ nullbase: true })
		.isArray()
		.withMessage("Bookings must be an array."),
	body("tasks")
		.optional({ nullbase: true })
		.isArray()
		.withMessage("Tasks must be an array."),
];
