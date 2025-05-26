import { useEffect, useState } from "react";
import MovieForm from "./MovieForm";
import { Movie } from "./types";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpiner";

export default function Delete({ movie, setMovie, error, setError, loading, setLoading, submit, setSubmit }: {
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
        async function deleteMovie() {
            if (!submit || movie.title == "" || movie.title == undefined) return;
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`http://localhost:8080/deleteMovie?by=title&title=${encodeURIComponent(movie.title!)}`, {
                    method: "DELETE"
                });
                if (!response.ok) {
                    setError("Failed to delete movie");
                }
            } catch (err) {
                setError("An error occurred while deleting movie");
            } finally {
                setLoading(false);
                setSubmit(false);
            }
        }
        deleteMovie();
    }, [submit, movie.title]);

    return (
        <div className="bg-gray-900 text-white flex flex-col 
            items-center justify-center min-h-screen">
            <MovieForm needReleaseDate={false} movie={movie} setMovie={setMovie} setSubmit={setSubmit} loading={loading} backgroundColor="#B91CC" hoverColor="#ef4444" submit={submit} title="Delete a movie" buttonText="Delete" />
            {!loading && <ErrorMessage error={error} />}
            <LoadingSpinner loading={loading} />
        </div>
    );
}
