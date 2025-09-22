import prisma from "../db.ts";
import { type Request, type Response } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth.ts";

export const createUser = async (req: Request, res: Response) => {
	const body = req.body as { username: string, email: string, createdAt: Date, password: string, Product: string[] };
	const user = await prisma.user.create({
		data: {
			username: body.username,
			password: await hashPassword(body.password)

		}
	});
	const token = createJWT(user.id, user.username);
	return res.status(201).json({ token });
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
	const token = createJWT(user.id, user.username);
	return res.status(200).json({ token });
}

