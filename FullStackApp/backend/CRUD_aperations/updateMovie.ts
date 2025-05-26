import express, { Request, Response } from "express";
import { Movie } from "../models/movies.js";

const updateMovieRouter = express.Router();

async function updateById(req: Request, res: Response, id: string) {
	try {
		const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
		if (!updatedMovie) {
			res.status(404).json({ error: "Movie not found" });
		} else {
			res.status(200).json(updatedMovie);
		}
	} catch (error: any) {
		console.error("Error updating movie by ID:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

async function updateByTitle(req: Request, res: Response, title: string) {
	try {
		const regex = new RegExp("^" + title, "i");
		const updatedMovie = await Movie.findOneAndUpdate(
			{ title: { $regex: regex } },
			req.body,
			{ new: true }
		);
		if (!updatedMovie) {
			res.status(404).json({ error: "Movie not found" });
		} else {
			res.status(200).json(updatedMovie);
		}
	} catch (error: any) {
		console.error("Error updating movie by title:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

// /updateMovie?by=(id|title)(&id | &title)=someValue
updateMovieRouter.put("/updateMovie", async (req: Request, res: Response) => {
	const { by, id, title } = req.query;

	if (by === "id" && typeof id === "string") {
		await updateById(req, res, id);
	} else if (by === "title" && typeof title === "string") {
		await updateByTitle(req, res, title);
	} else {
		res.status(400).json({ error: "Invalid or missing query parameters" });
	}
});

export { updateMovieRouter };
