import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image from '../../../assets/images/garment.png'

export default function CardItem() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Crop Top - Guess
          </Typography>
          <Typography variant="body2" color="text.secondary">
            79€
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
