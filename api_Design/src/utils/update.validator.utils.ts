import { body } from "express-validator";


export const validateCreateUpdate = [
	body("title").isString().withMessage("title is required"),
	body("body").optional(),
	body("status").default("PENDENG").optional(),
	body("productId").isString().withMessage("ProductId is required"),
	body("version").optional().isString().withMessage("Version must be a string"),
	body("updatedAt").optional().isString().withMessage("updatedAt must be a string")
];
