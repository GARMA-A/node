import express, { Request, Response } from 'express';
import { Movie } from '../models/movies.js';

const deleteMovieRouter = express.Router();

// /deleteMovie?by=(id|title)(&id | &title)=someValue
deleteMovieRouter.delete('/deleteMovie', async (req: Request, res: Response) => {
	const { by, id, title } = req.query;

	try {
		if (by === 'id' && typeof id === 'string') {
			const deletedMovie = await Movie.findByIdAndDelete(id);
			if (!deletedMovie) {
				res.status(404).json({ error: 'Movie not found' });
			} else {
				res.status(200).json({ message: 'Movie deleted successfully' });
			}
		}
		else if (by === 'title' && typeof title === 'string') {
			const regex = new RegExp('^' + title, 'i');
			const deletedMovie = await Movie.findOneAndDelete({ title: { $regex: regex } });
			if (!deletedMovie) {
				res.status(404).json({ error: 'Movie not found' });
			} else {
				res.status(200).json({ message: 'Movie deleted successfully' });
			}
		}
		else {
			res.status(400).json({ error: 'Invalid query parameters' });
		}
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
});

export { deleteMovieRouter };
