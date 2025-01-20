import { body } from "express-validator";

export const companyValidator = [
	body("deleted")
		.optional()
		.isBoolean()
		.withMessage("Deleted must be a boolean value"),
	body("fitAdmin")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("FitAdmin must be a non-empty string up to 30 characters"),
	body("name")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("Name must be a non-empty string up to 30 characters"),
	body("adress")
		.optional()
		.isObject()
		.withMessage("Address must be an object"),
	body("adress.street")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("Street must be a non-empty string up to 30 characters"),
	body("adress.city")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("City must be a non-empty string up to 30 characters"),
	body("adress.state")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("State must be a non-empty string up to 30 characters"),
	body("adress.country")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("Country must be a non-empty string up to 30 characters"),
	body("adress.zipCode")
		.optional()
		.isString()
		.trim()
		.matches(/^\d{5}$/)
		.withMessage("Zip code must be in the format 12345 or 12345-6789"),
	body("phone")
		.optional()
		.isString()
		.trim()
		.isMobilePhone()
		.withMessage("Phone must be a valid phone number"),
	body("email")
		.optional()
		.isString()
		.trim()
		.isEmail()
		.withMessage("Email must be a valid email address"),
	body("website")
		.optional()
		.isString()
		.trim()
		.isURL()
		.withMessage("Website must be a valid URL"),
	body("logo")
		.optional()
		.isString()
		.trim()
		.isURL()
		.withMessage("Logo must be a valid URL"),
	body("about")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 300 })
		.withMessage("About must be a non-empty string up to 300 characters"),
	body("openingHours")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 1, max: 20 })
		.withMessage(
			"Opening hours must be a non-empty string up to 200 characters"
		),
	body("numberOfPossibilities")
		.optional()
		.isInt({ min: 0 })
		.withMessage("Number of possibilities must be a non-negative integer"),
	body("bookings")
		.optional()
		.isArray()
		.withMessage("Bookings must be an array"),
	body("tasks").optional().isArray().withMessage("Tasks must be an array"),
];
