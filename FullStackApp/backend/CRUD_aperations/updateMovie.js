import express from "express";
import { Movie } from "../models/movies.js";

const updateMovieRouter = express.Router();


async function updateById(req, res, id) {

	try {
		const updatedMovie = await Movie.findByIdAndUpdate(id, req.body,
			{ new: true });
		if (!updatedMovie) {
			return res.status(404).json({ error: 'Movie not found' });
		}
		res.status(200).json(updatedMovie);
	} catch (error) {
		console.error('Error updating movie by ID:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}

}
async function updateByTitle(req, res, title) {

	try {
		const regex = new RegExp('^' + title, 'i');
		const updatedMovie =
			await Movie.findOneAndUpdate(
				{ title: { $regex: regex } },
				req.body, { new: true });
		if (!updatedMovie) {
			return res.status(404).json({ error: 'Movie not found' });
		}
		res.status(200).json(updatedMovie);

	} catch (error) {
		console.error('Error updating movie by title:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
}



// /updateMovie?by=(id|title)(&id | &title)=someValue
updateMovieRouter.put('/updateMovie', async (req, res) => {
	const { by, id, title } = req.query;
	if (by === 'id' && id) {
		return await updateById(req, res, id);
	} else if (by === 'title' && title) {
		return await updateByTitle(req, res, title);
	} else {
		return res.status(400).json({ error: 'Invalid or missing query parameters' });
	}

});



export { updateMovieRouter };
