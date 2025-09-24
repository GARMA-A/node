import { Router } from 'express';
import { validateCreateProduct, validateUpdateProduct } from '../utils/product.validator.utils.ts';
import { handleInputErrors } from '../middlewares/general.middleware.ts';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from '../controllers/product.controller.ts';


export const productRoutes = Router();

productRoutes.get('/all', getProducts);

productRoutes.get('/:id', getOneProduct);

productRoutes.put('/:id', validateUpdateProduct, handleInputErrors, updateProduct);

productRoutes.post("/", validateCreateProduct, handleInputErrors, createProduct);

productRoutes.delete('/:id', deleteProduct);

