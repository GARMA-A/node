import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createAccessToken = (userId: string, username: string) => {
	const access_secret = process.env.JWT_ACCESS_SECRET || "access_secret";
	return jwt.sign({ id: userId, username },
		access_secret,
		{ expiresIn: '1h' }
	);
}
export const createRefreshToken = (userId: string, username: string) => {
	const refresh_secret = process.env.JWT_REFRESH_SECRET || "refresh_secret";
	const refresh_token = jwt.sign({ id: userId, username },
		refresh_secret,
		{ expiresIn: '7d' }
	);
	return refresh_token;
}
export const comparePasswords = (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
}
export const hashPassword = (password: string) => {
	return bcrypt.hash(password, 5);
}
