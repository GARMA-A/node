import { warn } from "console";
import prisma from "../config/db.ts";
import { type Request, type Response } from "express";

export const getOneUpdate = (req: Request, res: Response) => {
	const id = req.params.id;
	const update = prisma.update.findUnique({
		where: {
			id
		}
	})
	res.status(200).json({ update });
}

export const getUpdates = async (req: Request, res: Response) => {
	const user = req.user;
	if (!user) {
		warn('No user attached to request in getUpdates');
		return res.status(500).json({ message: 'Something went wrong' });
	}
	const products = await prisma.product.findMany({
		where: {
			belongsToId: user.userId
		},
		include: {
			Updates: true
		}

	})
	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.Updates];
	}, [] as typeof products[0]['Updates']);

	res.status(200).json({ updates });
}

export const createUpdate = async (req: Request, res: Response) => {
	const user = req.user;
	const productId = req.body.productId;
	if (!user) {
		warn('No user attached to request in createUpdate');
		return res.status(401).json({ message: 'unauthorized' });
	}
	if (!productId) {
		warn("No productId in the body")
		return res.status(400).json({ message: "ProductId is required" });
	}
	const userProducts = await prisma.product.findMany({
		where: {
			belongsToId: user.userId
		}
	});
	const productIds = userProducts.map(p => p.id);
	if (!productIds.includes(productId)) {
		return res.status(403).json({ message: "You do not own this product" });
	}
	const update = await prisma.update.create({
		data: {
			title: req.body.title,
			body: req.body.body || "",
			version: req.body.version || "1.0.0",
			product: {
				connect: { id: productId }
			}
		}
	});
	res.status(201).json({ update });
}

export const updateUpdate = async (req: Request, res: Response) => {
	const user = req.user;
	const updateId = req.params.id;
	if (!user) {
		warn('No user attached to request in updateUpdate');
		return res.status(401).json({ message: 'unauthorized' });
	}
	const products = await prisma.product.findMany({
		where: {
			belongsToId: user.userId
		},
		include: {
			Updates: true
		}
	})

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.Updates];
	}, [] as typeof products[0]['Updates']);

	const match = updates.find(u => u.id === updateId);

	if (!match) {
		return res.status(403).json({ message: "You do not own this update" });
	}
	const updatedUpdate = await prisma.update.update({
		where: {
			id: updateId
		},
		data: req.body
	})
	return res.status(200).json({ update: updatedUpdate });
}

export const deleteUpdate = async (req: Request, res: Response) => {
	const user = req.user;
	const updateId = req.params.id;
	if (!user) {
		warn('No user attached to request in updateUpdate');
		return res.status(401).json({ message: 'unauthorized' });
	}
	const products = await prisma.product.findMany({
		where: {
			belongsToId: user.userId
		},
		include: {
			Updates: true
		}
	})

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.Updates];
	}, [] as typeof products[0]['Updates']);

	const match = updates.find(u => u.id === updateId);

	if (!match) {
		return res.status(403).json({ message: "You do not own this update" });
	}
	const deleted = await prisma.update.delete({
		where: {
			id: updateId
		}
	})
	return res.status(200).json({ update: deleted });
}
