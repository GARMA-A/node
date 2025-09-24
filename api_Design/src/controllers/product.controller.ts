import { type Request, type Response } from 'express';
import prisma from '../config/db.ts';

export const getProducts = async (req: Request, res: Response) => {
	const reqUser = req.user
	if (!reqUser) {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	const user = await prisma.user.findUnique({
		where: {
			id: reqUser.userId
		},
		include: {
			products: true
		}
	})
	res.status(200).json({ products: user?.products || [] })
}
export const getOneProduct = async (req: Request, res: Response) => {
	const reqUser = req.user
	if (!reqUser) {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	const { id } = req.params
	const product = await prisma.product.findFirst({
		where: {
			id,
			belongsToId: reqUser.userId
		}
	})
	if (!product) {
		return res.status(404).json({ message: 'Product not found' })
	}
	res.status(200).json({ product })

}

export const createProduct = async (req: Request, res: Response) => {
	const { name, description, price } = req.body
	if (!name || !description || !price) {
		return res.status(400).json({ message: 'Missing required fields' })
	}
	const reqUser = req.user
	if (!reqUser) {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	const product = await prisma.product.create({
		data: {
			name,
			description,
			price: parseFloat(price),
			belongsToId: reqUser.userId
		}
	})
	res.status(201).json({ product })
}
export const updateProduct = async (req: Request, res: Response) => {
	const { id } = req.params
	const { name, description, price } = req.body
	if (!name && !description && !price) {
		return res.status(400).json({ message: 'Missing required fields' })
	}
	const reqUser = req.user
	if (!reqUser) {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	const product = await prisma.product.findFirst({
		where: {
			id,
			belongsToId: reqUser.userId
		}
	})
	if (!product) {
		return res.status(404).json({ message: 'Product not found' })
	}
	const updatedProduct = await prisma.product.update({
		where: {
			id
		},
		data: {
			name: name || product.name,
			description: description || product.description,
			price: price ? parseFloat(price) : product.price
		}
	})
	res.status(200).json({ product: updatedProduct })
}

export const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.params
	const reqUser = req.user
	if (!reqUser) {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	const product = await prisma.product.findFirst({
		where: {
			id,
			belongsToId: reqUser.userId
		}
	})
	if (!product) {
		return res.status(404).json({ message: 'Product not found' })
	}
	await prisma.product.delete({
		where: {
			id
		}
	})
	res.status(200).json({ message: 'Product deleted' })
}

