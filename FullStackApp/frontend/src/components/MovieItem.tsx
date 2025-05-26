import { Movie } from "./types";
export default function MovieItem({ movie }: { movie: Partial<Movie> }) {
    return <>
        <li key={movie._id} className="mb-2 px-6 py-4 bg-gray-800 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gray-700 transition-colors duration-200">
            <span className="font-semibold text-lg">{movie.title}</span>
            <span className="text-gray-400">({movie.releaseYear})</span>
        </li></>;
}
