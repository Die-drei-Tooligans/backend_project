import "dotenv/config";
export const jwt = "jsonwebtoken";

const verifyToken = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		res.status(400).json({ message: "Authorization denied." });
	}
	try {
		const decode = jwt.verify(token, SECRET_KEY);
		req.user = decode;
	} catch (error) {
		res.status(400).json({ message: "Token is not valid" });
	}
};
