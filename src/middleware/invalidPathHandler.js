export const invalidPathHandler = (req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	res.status(404).json({ message: "Caught by invalidPathHandler", error });
	next(error);
};
