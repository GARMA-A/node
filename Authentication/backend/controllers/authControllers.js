const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
	const { first_name, last_name, email, password } = req.body();
	if (!first_name || !last_name || !email || password) {
		return res.status(400).json({ "message": "all fields are required" });
	}

	const found_the_user = await User.findOne({ email: email }).exec();
	if (found_the_user)
		return res.status(401).json({ "message": "user already exists" });

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({ first_name, last_name, email, password: hashedPassword });

	const accessToken = jwt.sign({
		UserInof: {
			id: user._id
		}


	}, process.end.ACCESS_TOKEN_SECRET_KEY, { expiersIn: "15m" });

	const refreshToken = jwt.sign({
		UserInof: {
			id: user._id
		}


	}, process.end.REFRESH_TOKEN_SECRET_KEY, { expiersIn: "7d" });
	res.cookie("jwt", refreshToken, {
		httpOnly: true, // only access by the http or https
		// secure: true, // onyl i can access the token by https not http
		sameSite: "None",// store the cockie in any domain name there is 'strict'
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.json({ accessToken, email: user.email, first_name: user.first_name, last_name: user.last_name });

};


module.exports = {
	register
};


