import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		trim: true
	},
	releaseYear: {
		type: Number,
		required: [true, 'Release year is required'],
	},
	rating: {
		type: Number,
		min: 0,
		max: 10
	}
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

export { Movie };





