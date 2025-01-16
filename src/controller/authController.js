import "dotenv/config";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const SECRET_KEY = process.env.SECRET_KEY;

export function authorize2(roles = []) {
	return (req, res, next) => {
		cookieParser()(req, res, () => {});
		const token = req.cookies.token;

		if (!token) {
			return res.json({ message: "Missing token" });
		}

		jwt.verify(token, SECRET_KEY, (error, decoded) => {
			if (error) {
				return res.status(401).json({ message: "invalid token" });
			}

			if (!roles.includes(decoded.role)) {
				return res.status(403).json({ message: "Not authorized." });
			}

			next();
		});
	};
}
