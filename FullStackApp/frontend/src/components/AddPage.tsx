import { useEffect } from "react";
import { Movie } from "../components/types";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpiner";
import MovieForm from "./MovieForm";

export default function AddPage({ movie, setMovie, error, setError, loading, setLoading, submit, setSubmit }: {
    movie: Partial<Movie>;
    setMovie: React.Dispatch<React.SetStateAction<Partial<Movie>>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    submit: boolean;
    setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}) {


    useEffect(() => {
        async function createMovie() {
            if (!submit || movie.title == "" || movie.title == undefined
                || movie.releaseYear == undefined) return;
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8080/sendmovie", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movie)
                });

                const result = await response.json();
                console.log('Server response:', result);
                if (!response.ok) {
                    setError("Failed to post a movie")
                } else {
                    setError("");
                }

            } catch (error) {
                setError(String(error))
            } finally {
                setLoading(false);

            }


        }
        createMovie();

    }, [submit, setSubmit])


    return (
        <div className="bg-gray-900 text-white flex flex-col items-center 
            justify-center min-h-screen">
            <MovieForm loading={loading} setSubmit={setSubmit} setMovie={setMovie} movie={movie} submit={submit} />
            {!loading && <ErrorMessage error={error} />}
            <LoadingSpinner loading={loading} />
        </div>


    );
}
