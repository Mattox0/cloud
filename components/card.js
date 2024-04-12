import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({ movie }) {
    console.log("movie", movie)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="256"
                    image={ movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://media.discordapp.net/attachments/1100084765077540888/1227710023740948621/image-placeholder.jpg?ex=6629650f&is=6616f00f&hm=b3dcd9236790f89001fa4a0ad28b4e307e202c6a9512b323c322cd192746a96b&=&format=webp&width=671&height=671" }
                    alt="unknown image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { movie.title }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { movie.overview }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}