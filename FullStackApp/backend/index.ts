import express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { movieAddRouter } from './CRUD_aperations/addMovie.js';
import { viewAllMoviesRouter } from './CRUD_aperations/viewAllMovies.js';
import { viewSingleMovieRouter } from './CRUD_aperations/viewSingleMovie.js';
import { updateMovieRouter } from './CRUD_aperations/updateMovie.js';
import { deleteMovieRouter } from './CRUD_aperations/deleteMovie.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get('/', (_: Request, res: Response) => {
	res.send('Hello World!');
});
app.post('/sendmovie', movieAddRouter);

app.get('/getAllMovies', viewAllMoviesRouter);

app.get('/getSingleMovie', viewSingleMovieRouter);

app.put('/updateMovie', updateMovieRouter);

app.delete('/deleteMovie', deleteMovieRouter);



mongoose.connect(process.env.DATABASE_URL as string)
	.then(() => {
		console.log('Connected to MongoDB');

		app.listen(8080, () => {
			console.log('Server is running on port 8080');
		});
	}).catch((err) => {
		console.error('Error connecting to MongoDB:', err);
	});
