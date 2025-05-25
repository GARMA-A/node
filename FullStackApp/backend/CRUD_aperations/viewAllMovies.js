import express from 'express';
import { Movie } from '../models/movies.js';


const viewAllMoviesRouter = express.Router();


viewAllMoviesRouter.get('/getAllMovies', async (_, res) => {
	try {
		const movies = await Movie.find({});
		if (movies.length === 0) {
			return res.status(404).json({ message: 'No movies found' });
		}
		res.status(200).json(movies);
	} catch (error) {
		console.error('Error fetching movies:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});


export { viewAllMoviesRouter };

