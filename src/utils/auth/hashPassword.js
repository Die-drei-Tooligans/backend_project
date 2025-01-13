import bcrypt from "bcrypt";

export const createHashedPassword = async (req, res, next) => {
	const hashedPW = await bcrypt.hash(req.body.username, 10);

	next();
};
