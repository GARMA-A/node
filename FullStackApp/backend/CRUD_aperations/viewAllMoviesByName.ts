import { Request, Response } from 'express';
import express from 'express';
import { Movie } from '../models/movies.js';

const viewAllMoviesByNameRouter = express.Router();

viewAllMoviesByNameRouter.get("/GetAllMoviesByTitle", async (req: Request, res: Response) => {
	const { title } = req.query;

	try {
		if (typeof title === 'string') {

			const regex = new RegExp('^' + title, 'i');
			const movies = await Movie.find({ title: { $regex: regex } });

			if (movies.length === 0) {
				res.status(404).json({ message: 'No movies found with the specified title' });
			}
			res.status(200).json(movies);

		} else {

			res.status(400).json({ error: 'Title query parameter is required and must be a string' });
		}

	} catch (error: any) {
		console.error('Error fetching movies by title:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}

});
export { viewAllMoviesByNameRouter };
