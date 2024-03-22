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
                    image={ `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                    alt="green iguana"
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