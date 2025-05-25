import express from 'express';
import { Movie } from '../models/movies.js';


const deleteMovieRouter = express.Router();

// /deleteMovie?by=(id|title)(&id | &title)=someValue
deleteMovieRouter.delete('/deleteMovie', async (req, res) => {
	const { by, id, title } = req.query;
	if (by === 'id' && id) {
		const deletedMovie = Movie.findByIdAndDelete(id);
		if (!deletedMovie) {
			return res.status(404).json({ error: 'Movie not found' });
		}
		return res.status(200).json({ message: 'Movie deleted successfully' });
	} else if (by === 'title' && title) {
		const regex = new RegExp('^' + title, 'i');
		const deletedMovie = await Movie.findOneAndDelete({ title: { $regex: regex } });
		if (!deletedMovie) {
			return res.status(404).json({ error: 'Movie not found' });
		}
		return res.status(200).json({ message: 'Movie deleted successfully' });
	}
})


export { deleteMovieRouter };
