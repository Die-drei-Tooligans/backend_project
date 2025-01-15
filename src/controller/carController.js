

export const deleteCar = async (req, res, next) => {
    try {
        await Car.deleteOne({ username: req.body.username });
        res.status(202).json({ message: `${req.body.username} deleted` });
    } catch (error) {
        console.dir(error, { depth: null });
        throw new Error(error);
    }
};