import bcrypt from "bcrypt";

export const hashPassword = async (req, res, next) => {
	const hashedPW = await bcrypt.hash(req.body.person.password, 10);
	req.body.person.password = hashedPW;
	next();
};
