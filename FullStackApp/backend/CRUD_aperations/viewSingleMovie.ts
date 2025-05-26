import express, { Request, Response } from 'express';
import { Movie } from '../models/movies.js';

const viewSingleMovieRouter = express.Router();

// /getSingleMovie?by=(id|title)(&id | &title)=someValue
viewSingleMovieRouter.get('/getSingleMovie/', async (req: Request, res: Response) => {
	const { by, id, title } = req.query;

	try {
		if (by === 'id' && typeof id === 'string') {
			const movie = await Movie.findById(id);
			res.status(200).json(movie);
		} else if (by === 'title' && typeof title === 'string') {
			const regex = new RegExp('^' + title, 'i');
			const movies = await Movie.find({ title: { $regex: regex } });
			res.status(200).json(movies);
		} else {
			res.status(400).json({ error: 'Invalid or missing query parameters' });
		}
	} catch (error: any) {
		console.error('Error fetching movie:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

export { viewSingleMovieRouter };
