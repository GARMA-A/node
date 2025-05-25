import { Router } from "express";
import { getAll } from './controller.js';

const router = Router();

function renderMovies(movies) {
	return movies.map(
		movie => `<li>${movie.title} (${movie.year})</li>`
	).join('');

}

router.get('/', (_, res) => {
	getAll().then((movies) => {
		res.send(movies);
	})


});

export { router };
