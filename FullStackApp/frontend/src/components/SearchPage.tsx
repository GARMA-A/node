import { useEffect, useState } from "react";
import MovieForm from "./MovieForm";
import { Movie } from "./types";
import { LoadingSpinner } from "./LoadingSpiner";
import { ErrorMessage } from "./ErrorMessage";
import MovieItem from "./MovieItem";


export function SearchPage({ movie, setMovie, error, setError, loading, setLoading, submit, setSubmit }: {
    movie: Partial<Movie>;
    setMovie: React.Dispatch<React.SetStateAction<Partial<Movie>>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    submit: boolean;
    setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const [movieArray, setMovieArray] = useState<Movie[]>([]);


    useEffect(() => {
        async function searchMovie() {
            if (!submit || movie.title == "" || movie.title == undefined) return;
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`http://localhost:8080/GetAllMoviesByTitle?title=${encodeURIComponent(movie.title!)}`);
                if (!response.ok) {
                    setError("Failed to search for movie");
                } else {
                    const data = await response.json();
                    setMovieArray(data);
                    console.log('Search results:', data);
                    setError("");
                }
            } catch (err) {
                setError("An error occurred while searching for movie");
            } finally {
                setLoading(false);
                setSubmit(false);
            }
        }
        searchMovie();
    }), [submit, movie.title, setSubmit, setLoading, setError, setMovieArray, setMovie] // eslint-disable-line react-hooks/exhaustive-deps)

    return (<>

        <div className="bg-gray-900 text-white flex flex-col 
            items-center justify-center min-h-screen">
            <MovieForm movie={movie} setMovie={setMovie} setSubmit={setSubmit} loading={loading} submit={submit} needReleaseDate={false} title="Search For A Movie" buttonText="Search" />
            <LoadingSpinner loading={loading} />
            {!loading && !error && (
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">Movies List</h1>
                    <ul className="list-disc">
                        {movieArray.map((movie) => (
                            <MovieItem key={movie._id} movie={movie} />
                        ))}
                    </ul>
                </div>
            )}

            {!loading && <ErrorMessage error={error} />}
        </div>

    </>)


}
