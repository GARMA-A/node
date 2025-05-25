import express from 'express';
import { Movie } from '../models/movies.js';

const viewSingleMovieRouter = express.Router();


// /getSingleMovie?by=(id|title)(&id | &title)=someValue
viewSingleMovieRouter.get('/getSingleMovie/', async (req, res) => {
	const { by, id, title } = req.query;
	try {
		if (by === 'id' && id) {
			const movie = await Movie.findById(id);
			return res.status(200).json(movie);
		}
		else if (by === 'title' && title) {
			const regex = new RegExp('^' + title, 'i');
			const movies = await Movie.find({ title: { $regex: regex } });
			return res.status(200).json(movies);
		} else {
			return res.status(400).json({ error: 'Invalid or missing query parameters' });
		}
	} catch (error) {
		console.error('Error fetching movie:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}



});

export { viewSingleMovieRouter };
