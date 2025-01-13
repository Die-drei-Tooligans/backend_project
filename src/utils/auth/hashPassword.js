import bcrypt from "bcrypt";

export const createHashedPassword = async (userInfo) => {
	return await bcrypt.hash(userInfo, 10);
};
