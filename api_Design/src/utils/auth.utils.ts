import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ACCESS_TOKEN_EXPIRE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRE, REFRESH_TOKEN_SECRET } from './constants.ts';

export const createAccessToken = (userId: string, username: string) => {
	return jwt.sign({ userId, username },
		ACCESS_TOKEN_SECRET,
		{ expiresIn: ACCESS_TOKEN_EXPIRE }
	);
}
export const createRefreshToken = (userId: string, username: string) => {
	const refresh_token = jwt.sign({ userId, username },
		REFRESH_TOKEN_SECRET,
		{ expiresIn: REFRESH_TOKEN_EXPIRE }
	);
	return refresh_token;
}
export const comparePasswords = (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
}
export const hashPassword = (password: string) => {
	return bcrypt.hash(password, 5);
}
