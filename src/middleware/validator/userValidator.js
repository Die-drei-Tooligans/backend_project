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
		.isLength({ min: 8, max: 50 })
		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
		.withMessage(
			"Password must be 8-50 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
		),

	body("person.phone")
		.optional()
		.isMobilePhone("any", { strictMode: true })
		.withMessage("Please provide a valid phone number"),

	body("person.dob")
		.optional()
		.isISO8601()
		.toDate()
		.custom((value) => {
			const now = new Date();
			const hundredYearsAgo = new Date(
				now.getFullYear() - 100,
				now.getMonth(),
				now.getDate()
			);
			if (value > now || value < hundredYearsAgo) {
				throw new Error(
					"Date of birth must be between 100 years ago and today"
				);
			}
			return true;
		}),

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
		.matches(/^[0-9]{5}(-[0-9]{4})?$/)
		.withMessage(
			"Please provide a valid ZIP code (e.g., 12345 or 12345-6789)"
		),

	body("person.address.street")
		.optional()
		.isString()
		.trim()
		.isLength({ min: 2 })
		.withMessage("Street must be at least 2 characters long"),

	body("person.address.streetNum")
		.optional()
		.isString()
		.trim()
		.matches(/^[0-9]+[a-zA-Z]?$/)
		.withMessage(
			"Street number must be a number, optionally followed by a letter"
		),

	body("person.address.numSupp")
		.optional()
		.isString()
		.trim()
		.isLength({ max: 5 })
		.withMessage("Additional number must not exceed 5 characters"),
];
