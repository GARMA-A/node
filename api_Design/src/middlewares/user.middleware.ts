import { type Request, type Response, type NextFunction } from 'express';
import prisma from '../config/db.ts';

export const isUserNotExist = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.body as { username: string };
	if (!user.username) {
		return res.status(400).json({ error: "Username and id are required" });
	}
	const found = await prisma.user.findUnique({
		where: {
			username: user.username
		}
	})
	if (found) {
		return res.status(409).json({ error: "Username already exists" });
	}
	next();
}
