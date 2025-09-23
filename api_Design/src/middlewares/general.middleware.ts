import { validationResult } from 'express-validator';
import { type Response, type Request, type NextFunction } from 'express';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}
