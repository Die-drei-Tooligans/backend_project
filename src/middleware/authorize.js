import "dotenv/config";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRETKEY;

export const authorize = (req, res, next) => {
	cookieParser()(req, res, () => {});
	const token = req.cookies.token;
	console.log(token);

	jwt.verify(token, SECRET_KEY, (error, decoded) => {
		if (error) {
			return res.status(403).json({ message: "Invalid Token" });
		}
		req.user = decoded;
		next();
	});
};
