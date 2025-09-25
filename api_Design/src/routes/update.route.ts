import { Router, type Request, type Response } from 'express';
import { validateCreateUpdate } from '../utils/update.validator.utils.ts';
import { handleInputErrors } from '../middlewares/general.middleware.ts';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from '../controllers/update.controller.ts';


export const updateRoutes = Router();

updateRoutes.get('/all', getUpdates);

updateRoutes.get('/:id', getOneUpdate);

updateRoutes.put('/:id', updateUpdate);

updateRoutes.post('/',
	validateCreateUpdate,
	handleInputErrors,
	createUpdate
);

updateRoutes.delete('/:id', deleteUpdate);

