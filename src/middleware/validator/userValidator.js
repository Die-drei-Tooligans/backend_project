import { body } from "express-validator";

export const userValidator = [
	body("deleted").default(false),
	body("role").default("user"),

	// Person
	body("person.firstname")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 2, max: 30 })
		.withMessage("First name must be between 2 and 30 characters long"),

	body("person.lastname")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 2, max: 30 })
		.withMessage("Last name must be between 2 and 30 characters long"),

	body("person.username")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 5, max: 30 })
		.withMessage("Username must be between 5 and 30 characters long"),

	body("person.image")
		.optional()
		.isString()
		.isURL()
		.matches(/\.(jpeg|jpg|gif|png)$/i)
		.withMessage(
			"Image URL must be a valid URL ending with an image extension"
		),

	body("person.mail")
		.optional()
		.isString()
		.trim()
		.isEmail()
		.normalizeEmail()
		.withMessage("Please provide a valid email address"),

	body("person.password")
		.optional()
		.isString()
		.isLength({ min: 8, max: 90 })

		.withMessage("Password must be 8-50 characters long"),

	body("person.phone")
		.optional()
		.isMobilePhone()

		.withMessage("Please provide a valid phone number"),

	body("person.dob").optional().toDate(),

	// Address
	body("person.address.city")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 2 })
		.withMessage("City must be at least 2 characters long"),

	body("person.address.zipCode")
		.optional()
		.isString()
		.trim()
		.matches(/^\d{5}$/)
		.withMessage(
			"Please provide a valid ZIP code with exactly five numbers (e.g., 12345)"
		),

	body("person.address.street")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 2 })
		.withMessage("Street must be at least 2 characters long"),

	body("person.address.streetNum")
		.optional()
		.isNumeric()
		.withMessage("Street number must be a number"),

	body("person.address.numSupp")
		.optional()
		.isString()
		.trim()
		.isLength({ max: 5 })
		.withMessage("Additional number must not exceed 5 characters"),
];
