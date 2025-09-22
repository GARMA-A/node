import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createJWT = (userId: string, username: string) => {
	return jwt.sign({ id: userId, username },
		process.env.JWT_SECRET as string,
		{ expiresIn: '1h' }
	);
}
export const comparePasswords = (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
}
export const hashPassword = (password: string) => {
	return bcrypt.hash(password, 5);
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
	const bearer = req.headers["authorization"] || req.headers['Authorization'];

	if (!bearer) {
		res.status(401).json({ message: 'There is no token' });
	}

	const [, token] = (bearer as string).split(" ");
	if (!token) {
		res.status(401).json({ message: 'Not valid token' });
	}

	try {
		const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
		req.user = decoded as { id: string, username: string };
		console.log(decoded);
		next();


	} catch (error) {
		console.error(error);
		res.status(401).json({ message: 'Token validation faild' });
	}
}







