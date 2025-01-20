import { body } from "express-validator";

export const userValidator = [
	body("deleted").default(false),
	body("role").default("user"),
	//: person
	body("person.firstname")
		.optional()
		.isString()
		.isLength({ min: 2, max: 30 })
		.withMessage(
			"firstname must be a string between 2 and 30 characters long"
		),
	body("person.lastname")
		.optional()
		.isString()
		.isLength({ min: 2, max: 30 })
		.withMessage(
			"lastname must be a string between 2 and 30 characters long"
		),
	body("person.username")
		.optional()
		.isString()
		.isLength({ min: 5, max: 30 })
		.withMessage(
			"username must be a string between 5 and 30 characters long"
		),
	body("person.image")
		.optional()
		.isString()
		.isURL()
		//: check for https://wwww.
		.withMessage(
			"username must be a string between 5 and 30 characters long"
		),
	body("person.mail")
		.optional()
		.isString()
		.isEmail()
		.withMessage("Email must be a valid email."),
	body("person.password")
		.optional()
		.isString()
		.isLength({ min: 50, max: 82 })
		.withMessage("Must be between 8 and 50 characters long"),
	body("person.phone")
		.optional()
		.isMobilePhone()
		.withMessage("Must be a phone number"),
	body("person.dob")
		.optional()
		.isDate()
		.isDate()
		.withMessage("MESSAGE"),
	//: person.adress
	body("person.adress.city")
		.optional()
		.isString()
		.isLength({ min: 3 })
		.withMessage("Must be a String"),
	body("person.adress.zipCode")
		.optional()
		.isNumeric()
		.isLength({ min: 5, max: 5 })
		.withMessage("TEST"),
	body("person.adress.street")
		.optional()
		.isString()
		.withMessage("MESSAGE"),
	body("person.adress.streetNum")
		.optional()
		.isNumeric()
		.withMessage("MESSAGE"),
	body("person.adress.numSupp")
		.optional()
		.isString()
		.isLength({ min: 1, max: 5 })
		.withMessage("MESSAGE"),
];
