import { body } from "express-validator";

export const validateCreateProduct = [body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),

body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0').notEmpty().withMessage('Price is required'),

body('description').isString().withMessage('Description must be a string').isLength({ min: 10 }).withMessage('Description must be at least 10 characters long').notEmpty().withMessage('Description is required')

];

export const validateUpdateProduct = [body('name').optional().isString().withMessage('Name must be a string'),

body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),

body('description').optional().isString().withMessage('Description must be a string').isLength({ min: 10 }).withMessage('Description must be at least 10 characters long')

];
