import bcrypt from "bcrypt";

export const verifyPassword = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const hashPW = await bcrypt.hash(password, 10);
		const match = await bcrypt.compare(req.body.password, password);

		return res.status(200).json({
			message: "password verified in utils/auth/verifyPassword.js",
			match,
			hashPW,
		});
	} catch (error) {
		console.log(error);
		res.status(401).json({
			message: "PW check failed in utils/auth/verifyPassword.js",
		});
	}
};
