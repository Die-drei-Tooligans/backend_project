// import "dotenv/config";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.SECRET_KEY;

// export const createToken = async (req, res, next) => {
// 	try {
// 		const token = await jwt.sign(req.body.person.username, SECRET_KEY);
// 		if (!token) {
// 			return res.status(400).json({ messgae: "Invlid token." });
// 		}
// 		res.cookie("token", token, { httpOnly: true });

// 		console.log("Here is the TOKENNNNNNNNNNNNNNNNNNNNNNNNN", token);
// 		next(token);
// 	} catch (error) {
// 		next(error);
// 	}
// };
