import jwt from "jsonwebtoken";

export const verifyToken = (req, res) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: "Invalid token" });
	}
	jwt.verify(token, SECRET_KEY, (error, decoded) => {
		if (error) {
			return res.status(401).json({ message: "Not authorized " });
		}
		req.user = decoded;
		res.status(200).json({ message: "Authorized" });
	});
	console.log(token);
};
