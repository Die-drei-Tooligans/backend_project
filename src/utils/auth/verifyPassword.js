import bcrypt from "bcrypt";
import { User } from "../../models/userModel.js";

export const verifyPassword = async (req, res, next) => {
	try {
		const user = await User.person.findOne({
			username: req.body.person.username,
		});
		const passwordVerified = await bcrypt.compare(
			req.body.person.password,
			user.person.password
		);
		if (!passwordVerified) {
			return res.status(401).json({ message: "Invalid credentials!" });
		}
		next();
	} catch (error) {
		next(error);
	}
};
