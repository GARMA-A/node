import mongoose, { Schema, Document, Model } from "mongoose";

type MovieDocument = Document & {
	title: string;
	releaseYear: number;
	rating?: number;
	_id?: mongoose.Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
};


const movieSchema: Schema<MovieDocument> = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Title is required'],
			trim: true,
		},
		releaseYear: {
			type: Number,
			required: [true, 'Release year is required'],
		},
		rating: {
			type: Number,
			min: 0,
			max: 10,
		},
	},
	{ timestamps: true }
);

const Movie: Model<MovieDocument> = mongoose.model<MovieDocument>('Movie', movieSchema);

export { Movie, MovieDocument };




