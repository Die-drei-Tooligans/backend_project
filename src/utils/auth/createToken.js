import jwt from "jsonwebtoken";

export const createToken = async (userInfo, secretkey, expiration) => {
	console.log("createToken");
	return await jwt.sign(userInfo, secretkey, expiration);
};
