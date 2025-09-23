import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies?.accessTokne;

	if (!token) {
		res.status(401).json({ message: 'Not valid token' });
	}

	try {
		const decoded = jwt.verify(token as string, process.env.JWT_ACCESS_SECRET as string);
		req.user = decoded as { userId: string, username: string };
		console.log(decoded);
		next();

	} catch (error) {
		console.error(error);
		res.status(401).json({ message: 'Token validation faild' });
	}
}


