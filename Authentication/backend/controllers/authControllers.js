const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	if (!first_name || !last_name || !email || !password) {
		return res.status(400).json({ "message": "all fields are required" });
	}

	const found_the_user = await User.findOne({ email: email }).exec();
	if (found_the_user)
		return res.status(401).json({ "message": "user already exists" });

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create
		({ first_name, last_name, email, password: hashedPassword });

	const accessToken = jwt.sign({
		UserInfo: {
			id: user._id
		}


	}, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: 15 });

	const refreshToken = jwt.sign({
		UserInfo: {
			id: user._id
		}


	}, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "7d" });
	res.cookie("jwt", refreshToken, {
		httpOnly: true, // only access by the http or https
		// secure: true, // onyl i can access the token by https not http
		sameSite: "None",// store the cockie in any domain name there is 'strict'
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.json({ accessToken, email: user.email, first_name: user.first_name, last_name: user.last_name });

};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ "message": "all fields are required" });
	}

	const founded_user = await User.findOne({ email }).exec();
	if (!founded_user)
		return res.status(401).json({ "message": "user not found " });

	const match = bcrypt.compare(password, founded_user.password);

	if (!match)
		res.status(401).json({ "message": "password is not correct" });



	const accessToken = jwt.sign({
		UserInfo: {
			id: founded_user._id
		}


	}, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: 15 });

	const refreshToken = jwt.sign({
		UserInfo: {
			id: founded_user._id
		}
	}, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "7d" });

	res.cookie("jwt", refreshToken, {
		httpOnly: true, // only access by the http or https
		// secure: true, // onyl i can access the token by https not http
		sameSite: "None",// store the cockie in any domain name there is 'strict'
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.json({ accessToken, email: founded_user.email });

};

const logout = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); // No content

	// Clear the cookie
	res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
	res.json({ "message": "cookie cleared" });
}

const refresh = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(401).send({ "message": "jwt cookie not found unauthorized" });

	const refreshToken = cookies.jwt;

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decoded) => {
		if (err) return res.status(403).send({ "message": "forbidden" });
		const found_user = User.findById(decoded.UserInfo.id).exec();
		if (!found_user)
			return res.status(401).send({ "message": "user not found" });
		const accessToken = jwt.sign({
			UserInfo: {
				id: decoded.UserInfo.id
			}
		}, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: 15 });


		res.json({ accessToken });
	});
};


module.exports = {
	register,
	login,
	logout,
	refresh
};


