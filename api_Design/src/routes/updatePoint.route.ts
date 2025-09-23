import { Router, type Request, type Response } from 'express';


export const updatePointRoutes = Router();

updatePointRoutes.get('/all', (req: Request, res: Response) => {
	res.status(200).json({ message: 'get all updatePoints' });
});

updatePointRoutes.get('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: 'get updatePoint', id });
});

updatePointRoutes.put('/:id', (req, res) => {

	const id = req.params.id;
	res.status(200).json({ message: 'change updatePoint', id });
});


updatePointRoutes.post('/', (req, res) => {
	res.status(200).json({ message: 'create new updatePoint' });
});


updatePointRoutes.delete('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: 'delete updatePoint', id });
});

