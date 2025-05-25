import { useEffect, useState } from "react";
import { Movie } from "../components/types";

export default function AddPage() {
    const [movie, setMovie] = useState<Movie>({ title: "" });
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [submit, setSubmit] = useState<boolean>(false);

    useEffect(() => {
        async function createMovie() {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8080/sendmovie", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movie)
                });
                if (!response.ok) {
                    setError("Failed to post a movie")


                } else {
                    setError("");
                }
                const result = await response.json();
                console.log('Server response:', result);



            } catch (error) {
                setError(String(error))
            } finally {
                setLoading(false);

            }


        }
        createMovie();

    }, [submit, setSubmit])


    return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
            {!loading && <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add a New Movie</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="title">Title</label>

                        <input value={movie?.title as string}
                            onChange={(e) => setMovie(prev => { return { ...prev, title: e.target.value } })}

                            type="text" id="title" className="w-full p-2 bg-gray-700 text-white rounded" />


                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="releaseYear">Release Year</label>
                        <input value={movie.releaseYear}
                            onChange={(e) => setMovie(prev => { return { ...prev, releaseYear: Number(e.target.value) } })}

                            type="number" id="releaseYear" className="w-full p-2 bg-gray-700 text-white rounded" />
                    </div>
                    <button type="submit" onClick={() => setSubmit(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Movie</button>
                </form>
                {error && !loading && (<div className="flex justify-center items-center h-screen">
                    <div className="text-red-500 text-xl">{error}</div>
                </div>)}
            </div>}
            {loading && (<div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div> </div>)}
        </div>
    );
}
