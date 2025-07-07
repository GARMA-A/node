const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers['authorization'] || req.headers['Authorization'];

	if (!authHeader?.startsWith('Bearer ')) {
		return res.status(401).json({ "message": "Unauthorized: No token provided" });
	}


	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
		if (err) {

			return res.status(403).json({ "message": "Forbidden: Invalid token" });
		}
		req.user_id = decoded.UserInfo.id;
		next();
	});
}

module.exports = verifyToken;
