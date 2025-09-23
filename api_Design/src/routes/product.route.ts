import { Router, type Request, type Response } from 'express';
import { validateCreateProduct, validateUpdateProduct } from '../utils/product.validator.utils.ts';
import { handleInputErrors } from '../middlewares/general.middleware.ts';


export const productRoutes = Router();

productRoutes.get('/all', (req: Request, res: Response) => {
	res.status(200).json({ message: 'get all produts' });
});

productRoutes.get('/:id', (req: Request, res: Response) => {
	const id = req.params.id;
	res.status(200).json({ message: 'get product', id });
});

productRoutes.put('/:id', validateUpdateProduct, handleInputErrors, (req: Request, res: Response) => {
	const id = req.params.id;
	res.status(200).json({ message: 'change product', id });
});


productRoutes.post('/', validateCreateProduct, handleInputErrors, (req: Request, res: Response) => {
	res.status(200).json({ message: 'create new product' });
});

productRoutes.delete('/:id', (req: Request, res: Response) => {
	const id = req.params.id;
	res.status(200).json({ message: 'delete product', id });
});

