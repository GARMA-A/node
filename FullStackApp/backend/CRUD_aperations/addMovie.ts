import express, { Request, Response } from 'express';
import { Movie, MovieDocument } from '../models/movies.js';

const movieAddRouter = express.Router();

movieAddRouter.post('/sendmovie', async (req: Request, res: Response) => {
	try {
		const movie: Partial<MovieDocument> = req.body;

		const movieCreated = await Movie.create(movie);
		res.status(201).json({
			message: 'Movie added successfully',
			movie: movieCreated,
		});
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
});

export { movieAddRouter };
