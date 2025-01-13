import bcrypt from "bcrypt";

export const compareWithHashedPassword = async (
	passwordFromReq,
	passwordFromDB
) => {
	return bcrypt.compare(passwordFromReq, passwordFromDB);
};
