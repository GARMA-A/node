import { useState } from "react";
import { Movie } from "./types"
import { buffer } from "stream/consumers";

export default function MovieForm({
    setMovie,
    setSubmit,
    movie,
    submit,
    loading,
    backgroundColor = "#2563eb",
    hoverColor = "#1d4ed8",
    needReleaseDate = true,
    title = "Add a New Movie",
    buttonText = "Add Movie"
}: {
    setMovie: React.Dispatch<React.SetStateAction<Partial<Movie>>>;
    movie: Partial<Movie>;
    setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
    submit: boolean;
    loading: boolean;
    needReleaseDate?: boolean,
    backgroundColor?: string;
    hoverColor?: string;
    title?: string;
    buttonText?: string;
}) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const style = {
        backgroundColor: isHovered ? backgroundColor : hoverColor,
        width: '100%',
        color: 'white',
        fontWeight: 'bold',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        borderRadius: '0.25rem',
    }

    return <>{
        !loading && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center jusify-start"
                style={{ minWidth: 0 }}>
                <h2 className="text-2xl font-bold mb-4"> {title}</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="title">Title</label>
                        <input required value={movie?.title as string}
                            onChange={(e) => setMovie(prev => { return { ...prev, title: e.target.value } })}
                            type="text" id="title"
                            className="w-full p-2 bg-gray-700 text-white rounded"
                        />
                        {movie.title === undefined && submit && < p className="text-red-500 text-sm mt-1">Title is required</p>}
                    </div>
                    {needReleaseDate && <ReleaseYear setMovie={setMovie} movie={movie} submit={submit} />}
                    <button type="submit" onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} onClick={(e) => { e.preventDefault(); setSubmit(true); }}
                        style={style}
                        className="active:scale-95 transition-transform duration-200 ease-in-out"
                    >{buttonText}
                    </button>
                </form >
            </div >)
    }</>

}

function ReleaseYear({ movie, setMovie, submit }: {
    movie: Partial<Movie>;
    setMovie: React.Dispatch<React.SetStateAction<Partial<Movie>>>;
    submit: boolean;
}) {
    return <>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="releaseYear">Release Year</label>
            <input required value={movie.releaseYear}
                onChange={(e) => setMovie(prev => { return { ...prev, releaseYear: Number(e.target.value) } })}
                type="number" id="releaseYear"
                className="w-full p-2 bg-gray-700 text-white rounded"
            />
            {movie.releaseYear === undefined && submit && <p className="text-red-500 text-sm mt-1">Release year is required</p>}
        </div>

    </>

}
