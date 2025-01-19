import { body } from "express-validator";

export const carValidator = [
	body("deleted")
		.optional({ nullbase: true })
		.isBoolean()
		.withMessage("Deleted must be a boolean value"),
	body("fitUser")
		.optional({ nullbase: true })
		.isArray()
		.withMessage("FitUser must be an array"),
	body("licensePlate")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.isLength({ min: 3, max: 9 })
		.matches(/^[A-Z0-9]/)
		.withMessage(
			"License plate must be a string of 6 alphanumeric characters"
		),
	body("lastNameOrCompany")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.withMessage("Last name or company name is required"),
	body("firstName")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.withMessage("First name is required"),
	body("address")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.withMessage("Address is required"),
	body("nextHU")
		.optional({ nullbase: true })
		.trim()
		.isDate()
		.withMessage("Next HU must be a valid date"),
	body("dateOfFirstRegistration")
		.optional({ nullbase: true })
		.trim()
		.isDate()
		.withMessage("Date of first registration must be a valid date"),
	body("manufacturerNumber")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.withMessage("Manufacturer number is required"),
	body("typeNumber")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.withMessage("Type number is required"),
	body("vehicleClass")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.withMessage("Vehicle class is required"),
	body("checkDigit")
		.optional({ nullbase: true })
		.trim()
		.isNumeric()
		.withMessage("Check digit is required"),
	body("variant")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.withMessage("Variant is required"),
	body("version")
		.optional({ nullbase: true })
		.trim()
		.isString()
		.withMessage("Version is required"),
	body("tasks")
		.optional({ nullbase: true })
		.trim()
		.isArray()
		.default([])
		.withMessage("At least one task is required"),
];
