import { useEffect, useState } from "react";
import "../index.css";
import { Movie } from "../components/types";


export default function HomePage() {

    const [Movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
            {loading && (<div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div> </div>)}

            {error && !loading && (<div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-xl">{error}</div>
            </div>)}

            {!loading && !error && (
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">Movies List</h1>
                    <ul className="list-disc">
                        {Movies.map((movie) => (
                            <li key={movie._id} className="mb-2">
                                {movie.title} ({movie.releaseYear})
                            </li>
                        ))}
                    </ul>
                </div>
            )}



        </div>);
}


