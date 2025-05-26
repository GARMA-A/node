import { useEffect, useState } from "react";
import "../index.css";
import { Movie } from "../components/types";
import { LoadingSpinner } from "./LoadingSpiner";
import { ErrorMessage } from "./ErrorMessage";
import MovieItem from "./MovieItem";


export default function HomePage() {

    const [Movies, setMovies] = useState<Partial<Movie>[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function fetchMovies() {
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const response = await fetch('http://localhost:8080/getAllMovies');
                if (!response.ok) {
                    setError('Failed to fetch movies');
                }
                const data: Movie[] = await response.json();
                setMovies(data);
            } catch (error) {
                setError('An error occurred while fetching movies');
                console.error(error);

            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);



    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <LoadingSpinner loading={loading} />
            {!loading && <ErrorMessage error={error} />}
            {!loading && !error && (
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">Movies List</h1>
                    <ul className="list-disc">
                        {Movies.map((movie) => (
                            <MovieItem key={movie._id} movie={movie} />
                        ))}
                    </ul>
                </div>
            )}



        </div>);
}

