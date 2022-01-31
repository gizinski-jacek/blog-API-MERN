require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
	try {
		if (typeof req.cookies.userToken === undefined) {
			res.status(403).json({ msg: 'Unauthorized Access' });
		} else {
			req.decodedUser = jwt.verify(
				req.cookies.userToken,
				process.env.STRATEGY_SECRET
			);
			next();
		}
	} catch (error) {
		next(error);
	}
};

module.exports = verifyToken;
