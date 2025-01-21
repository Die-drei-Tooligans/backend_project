import { body } from "express-validator";

export const carValidator = [
	body("deleted")
		.default(false)
		.isBoolean()
		.withMessage("Deleted must be a boolean value"),
	body("fitUser")
		.isArray()
		.default([])
		.withMessage("FitUser must be an array."),
	body("licensePlate")
		.trim()
		.isString()
		.isLength({ min: 3, max: 9 })
		.matches(/^\\[A-Z0-9]+\\$/)
		.withMessage(
			"License plate must be a string of 3-9 alphanumeric characters (uppercase)"
		),
	body("lastNameOrCompany")
		.trim()
		.isString()
		.isLength({ min: 1, max: 100 })
		.withMessage(
			"Last name or company name must be a non-empty string up to 100 characters"
		),
	body("firstName")
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"First name must be a non-empty string up to 50 characters"
		),
	body("address")
		.trim()
		.isString()
		.isLength({ min: 5, max: 200 })
		.withMessage("Address must be a string between 5 and 200 characters"),
	body("nextHU")
		.isISO8601()
		.toDate()
		.withMessage("Next HU must be a valid date"),
	body("dateOfFirstRegistration")
		.isISO8601()
		.toDate()
		.withMessage("Date of first registration must be a valid date"),
	body("manufacturerNumber")
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"Manufacturer number must be a non-empty string up to 50 characters"
		),
	body("typeNumber")
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"Type number must be a non-empty string up to 50 characters"
		),
	body("vehicleClass")
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage(
			"Vehicle class must be a non-empty string up to 50 characters"
		),
	body("FIN")
		.isString()
		.matches(/^\\[A-Z0-9]+\\$/)
		.withMessage("Must be 17 characters long"),
	body("checkDigit")
		.isInt({ min: 17, max: 17 })
		.withMessage("Check digit must be a single digit between 0 and 9"),
	body("brand").isString().isLength({ max: 30 }).withMessage("test"),
	body("type").isString().isLength({ max: 30 }).withMessage("test"),
	body("variant")
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage("Variant must be a non-empty string up to 50 characters"),
	body("version")
		.trim()
		.isString()
		.isLength({ min: 1, max: 50 })
		.withMessage("Version must be a non-empty string up to 50 characters"),
	body("tasks.*")
		.isString()
		.isLength({ min: 1, max: 100 })
		.withMessage(
			"Each task must be a non-empty string up to 100 characters"
		),
];
