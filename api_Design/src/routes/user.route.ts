import { Router, type Request, type Response } from 'express';


export const userRoutes = Router();

userRoutes.get('/all', (req: Request, res: Response) => {
	res.status(200).json({ message: 'get all Users' });
});

userRoutes.get('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: 'get User', id });
});

userRoutes.put('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: 'change User', id });
});


userRoutes.post('/', (req, res) => {
	res.status(200).json({ message: 'create new User' });
});


userRoutes.delete('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: 'delete User', id });
});

