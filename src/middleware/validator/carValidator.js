import { body } from "express-validator";

export const carValidator = [
	body("deleted")
		.optional()
		.isBoolean()
		.withMessage("Deleted must be a boolean value"),
	body("fitUser")
		.optional()
		.isString()
		.withMessage("FitUser must be a string between 3 and 50 characters."),
	body("licensePlate")
		.optional()
		.trim()
		.isString()
		.isLength({ min: 3, max: 9 })
		.matches(/^[A-Z0-9]/)
		.withMessage(
			"License plate must be a string of 6 alphanumeric characters"
		),
	body("lastNameOrCompany")
		.optional()
		.trim()
		.isString()
		.withMessage("Last name or company name is required"),
	body("firstName")
		.optional()
		.trim()
		.isString()
		.withMessage("First name is required"),
	body("address")
		.optional()
		.trim()
		.isString()
		.withMessage("Address is required"),
	body("nextHU")
		.optional()
		.trim()
		.isDate()
		.withMessage("Next HU must be a valid date"),
	body("dateOfFirstRegistration")
		.optional()
		.trim()
		.isDate()
		.withMessage("Date of first registration must be a valid date"),
	body("manufacturerNumber")
		.optional()
		.trim()
		.isString()
		.withMessage("Manufacturer number is required"),
	body("typeNumber")
		.optional()
		.trim()
		.isString()
		.withMessage("Type number is required"),
	body("vehicleClass")
		.optional()
		.trim()
		.isString()
		.withMessage("Vehicle class is required"),
	body("checkDigit")
		.optional()
		.trim()
		.isNumeric()
		.withMessage("Check digit is required"),
	body("variant")
		.optional()
		.trim()
		.isString()
		.withMessage("Variant is required"),
	body("version")
		.optional()
		.trim()
		.isString()
		.withMessage("Version is required"),
	body("tasks")
		.optional()
		.trim()
		.isArray()
		.default([])
		.withMessage("At least one task is required"),
];
