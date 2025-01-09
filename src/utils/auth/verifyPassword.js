import bcrypt from "bcrypt";

export const verifyPassword = async (req, res, next) => {
	const { username, password } = req.body;
	console.log("hier");
	try {
		const hashPW = await bcrypt.hash(password, 10);
		const match = await bcrypt.compare(req.body.password, password);
		console.log("Password verified in utils/auth/verifyPassword.js");
		return match;
	} catch (error) {
		console.log(error);
		res.status(401).json({
			message: "PW check failed in utils/auth/verifyPassword.js",
		});
	}
};
