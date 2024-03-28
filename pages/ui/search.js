import { useEffect, useState } from "react";
import ActionAreaCard from "../../components/card";
import { useRouter } from "next/router";
import Loader from "../../components/loader";

export default function Search() {
    const [movies, setMovies] = useState(null);
    const { query } = useRouter();

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (query?.query) {
                    const response = await fetch('/api/movies/search?query=' + query.query);
                    const data = await response.json();
                    setMovies(data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (query?.query) {
            fetchData();
        }
    }, [query?.query]); // Run effect whenever query.query changes

    if (!movies) {
        return (
            <Loader />
        );
    }

    return (
        <div>
            <h1 className="text-center font-bold text-3xl m-10">Vos résultats pour : { query?.query }</h1>
            <div className="flex flex-row justify-center items-start flex-wrap gap-x-7 gap-y-6 mb-2">
                {movies.map(movie => (
                    <div className="flex-initial" key={movie.id}>
                        <ActionAreaCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
}
