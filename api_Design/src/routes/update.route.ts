import { Router, type Request, type Response } from 'express';
import { validateCreateUpdate } from '../utils/update.validator.utils.ts';
import { handleInputErrors } from '../middlewares/general.middleware.ts';


export const updateRoutes = Router();

updateRoutes.get('/all', (req: Request, res: Response) => {
	res.status(200).json({ message: 'get all updates' });
});

updateRoutes.get('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: 'get update', id });
});

updateRoutes.put('/:id', (req, res) => {

	const id = req.params.id;
	res.status(200).json({ message: 'change update', id });
});


updateRoutes.post('/',
	validateCreateUpdate,
	handleInputErrors,
	(req: Request, res: Response) => {
		res.status(200).json({ message: 'create new update' });
	});


updateRoutes.delete('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: 'delete update', id });
});

