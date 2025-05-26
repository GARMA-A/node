import express, { Request, Response } from 'express';
import { Movie } from '../models/movies.js';

const viewAllMoviesRouter = express.Router();


viewAllMoviesRouter.get('/getAllMovies', async (_: Request, res: Response) => {
	try {
		const movies = await Movie.find({});
		if (movies.length === 0) {
			res.status(404).json({ message: 'No movies found' });
		} else {
			res.status(200).json(movies);
		}
	} catch (error: any) {
		console.error('Error fetching movies:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

export { viewAllMoviesRouter };
