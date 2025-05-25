import express from 'express';
import { Movie } from '../models/movies.js';

const movieAddRouter = express.Router();


movieAddRouter.post('/sendmovie', async (req, res) => {
	try {
		const movie = req.body;
		const movieCreated = await Movie.create(movie);
		res.status(201).json(
			{
				message: 'Movie added successfully',
				movie: movieCreated
			}
		);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}

});


export { movieAddRouter };
