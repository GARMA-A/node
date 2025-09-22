import { Router, type Request, type Response } from 'express';


export const productRoutes = Router();

productRoutes.get('/all', (req: Request, res: Response) => {
	res.status(200).json({ message: 'get all produts' });
});

productRoutes.get('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: 'get product', id });
});

productRoutes.put('/:id', (req, res) => {

	const id = req.params.id;
	res.status(200).json({ message: 'change product', id });
});


productRoutes.post('/', (req, res) => {
	res.status(200).json({ message: 'create new product' });
});

productRoutes.delete('/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: 'delete product', id });
});

