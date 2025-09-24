import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN, ACCESS_TOKEN_SECRET } from '../utils/constants.ts';

export const protect = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies[ACCESS_TOKEN];
	if (!token) {
		res.status(401).json({ message: 'Not valid token' });
	}

	try {
		const decoded = jwt.verify(token as string, ACCESS_TOKEN_SECRET);
		req.user = decoded as { userId: string, username: string };
		console.log(decoded);
		next();

	} catch (error) {
		console.error(error);
		res.status(401).json({ message: 'Token validation faild' });
	}
}


