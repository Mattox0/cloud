import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Loader from "../../components/loader";
import Image from "next/image";
import * as React from "react";
import Box from "@mui/material/Box";

export default function Details(req, res) {
    const [ movie, setMovie ] = useState(null);
    const { query } = useRouter();



    useEffect(() => {
        const getMovie = async () => {
            console.log()
            const response = await fetch('/api/movies/' + query.idMovie);
            const data = await response.json();
            setMovie(data.data.movie);
        }

        if (query.idMovie) {
            getMovie();
        }
    }, [query.idMovie]);

    if (!movie) {
        return (
            <Loader />
        );
    }

    console.log(movie)
    const src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://media.discordapp.net/attachments/1100084765077540888/1227710023740948621/image-placeholder.jpg?ex=6629650f&is=6616f00f&hm=b3dcd9236790f89001fa4a0ad28b4e307e202c6a9512b323c322cd192746a96b&=&format=webp&width=671&height=671"

    return (
        <div >
            <h1 className="text-center m-10 text-4xl">{movie.title}</h1>
            <div className="flex flex-row justify-center items-start flex-wrap gap-x-7 gap-y-6 mb-2 mx-10 my-10" >
                <div className="flex-initial">
                    <Image
                        loader={() => src}
                        src={src}
                        alt={movie.title}
                        width={300}
                        height={450}
                    />
                </div>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <div>Overview :</div>
                    {movie.overview}
                </Box>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', width: '100%' }}>
                    <div>Genre :</div>
                    {movie.genres.map(genre => (
                        <div key={genre.id}>{genre.name}</div>
                    ))}
                </Box>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', width: '100%' }}>
                    <div>Budget : {movie.budget}$</div>
                </Box>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', width: '100%' }}>
                    <div>Company : {movie?.production_companies[0]?.name}</div>
                </Box>
            </div>
        </div>
    );
}
