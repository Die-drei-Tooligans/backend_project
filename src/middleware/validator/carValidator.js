import { body } from "express-validator";

export const carValidator = [
	body("deleted")
		.optional()
		.isBoolean()
		.withMessage("Deleted must be a boolean value"),
	body("fitUser")
		.optional()
		.isString()
		.isLength({ min: 3, max: 50 })
		.withMessage("FitUser must be a string between 3 and 50 characters"),
	body("licensePlate")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 3, max: 9 })
		.matches(/^[A-Z0-9]+$/)
		.withMessage(
			"License plate must be a string of 3-9 alphanumeric characters (uppercase)"
		),
	body("lastNameOrCompany")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 1, max: 100 })
		.withMessage(
			"Last name or company name must be a non-empty string up to 100 characters"
		),
	body("firstName")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"First name must be a non-empty string up to 50 characters"
		),
	body("address")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 5, max: 200 })
		.withMessage("Address must be a string between 5 and 200 characters"),
	body("nextHU")
		.optional()
		.isISO8601()
		.toDate()
		.withMessage("Next HU must be a valid date"),
	body("dateOfFirstRegistration")
		.optional()
		.isISO8601()
		.toDate()
		.withMessage("Date of first registration must be a valid date"),
	body("manufacturerNumber")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"Manufacturer number must be a non-empty string up to 50 characters"
		),
	body("typeNumber")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"Type number must be a non-empty string up to 50 characters"
		),
	body("vehicleClass")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"Vehicle class must be a non-empty string up to 50 characters"
		),
	body("checkDigit")
		.optional()
		.isInt({ min: 0, max: 9 })
		.withMessage("Check digit must be a single digit between 0 and 9"),
	body("variant")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage("Variant must be a non-empty string up to 50 characters"),
	body("version")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage("Version must be a non-empty string up to 50 characters"),
	body("tasks").optional().isArray().withMessage("Tasks must be an array"),
	body("tasks.*")
		.optional()
		.isString()
		.isLength({ min: 1, max: 100 })
		.withMessage(
			"Each task must be a non-empty string up to 100 characters"
		),
];
