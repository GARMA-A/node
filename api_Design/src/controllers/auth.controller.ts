import { type Request, type Response } from 'express';
import prisma from "../config/db.ts";
import { comparePasswords, createAccessToken, createRefreshToken, hashPassword } from "../utils/auth.utils.ts";
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN, REFRESH_TOKEN, REFRESH_TOKEN_SECRET } from '../utils/constants.ts';






export const signUp = async (req: Request, res: Response) => {
	const body = req.body as { username: string, password: string };
	if (!body.username || !body.password) {
		return res.status(400).json({ error: "Username and password are required" });
	}
	const user = await prisma.user.create({
		data: {
			username: body.username,
			password: await hashPassword(body.password)

		}
	});
	const accessToken = createAccessToken(user.id, user.username);
	const refreshToken = createRefreshToken(user.id, user.username);

	res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
	res.cookie(REFRESH_TOKEN, refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

	return res.status(201).json({ message: "User created", user: { id: user.id, username: user.username } });

}


export const signIn = async (req: Request, res: Response) => {
	const body = req.body as { username: string, password: string };
	if (!body.username || !body.password) {
		return res.status(400).json({ error: "Username and password are required" });
	}
	const user = await prisma.user.findUnique({
		where: {
			username: body.username
		}
	});
	if (!user) {
		return res.status(401).json({ error: "Invalid username or password" });
	}
	const isValid = await comparePasswords(body.password, user.password)
	if (!isValid) {
		return res.status(401).json({ error: "Invalid username or password" });
	}
	const accessToken = createAccessToken(user.id, user.username);
	const refreshToken = createRefreshToken(user.id, user.username);

	res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

	res.cookie(REFRESH_TOKEN, refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

	return res.status(200).json({ message: "User signed in", user: { id: user.id, username: user.username } });
}



export const refresh = (req: Request, res: Response) => {
	const refreshToken = req.cookies[REFRESH_TOKEN];
	if (!refreshToken) {
		return res.status(401).json({ message: 'There is no token' });
	}
	try {
		const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
		req.user = decoded as { userId: string, username: string };

		res.cookie(ACCESS_TOKEN, createAccessToken(req.user.userId, req.user.username), { httpOnly: true, secure: process.env.NODE_ENV === "production" });

		return res.status(200).json({ message: 'Token is valid', user: req.user });

	} catch (error) {
		console.error(error);
		return res.status(401).json({ message: 'Token validation faild' });
	}
}

export const signOut = (_: Request, res: Response) => {
	res.clearCookie(ACCESS_TOKEN);
	res.clearCookie(REFRESH_TOKEN);
	return res.status(200).json({ message: "User signed out" });
}

