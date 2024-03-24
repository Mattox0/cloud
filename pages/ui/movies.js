import {useEffect, useState} from "react";
import ActionAreaCard from "../../components/card";

export default function Movie() {
    const [ movies, setMovies ] = useState(null);

    const getAllMovies = async () => {
        const response = await fetch('/api/movies');
        const data = await response.json();
        setMovies(data.data);
    }

    useEffect(() => {
        getAllMovies();
    }, []);

    return (
        <div >
            <h1 className="text-center m-10 text-4xl">All popular movies</h1>
            <div className="flex flex-row justify-center items-start flex-wrap gap-x-7 gap-y-6 mb-2" >
                {movies && movies.map(movie => (
                    <div className="flex-initial">
                        <ActionAreaCard key={movie.id} movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
}
