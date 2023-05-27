import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import * as React from "react";

export type CardInfo = {
  id: string;
  image: string;
  title: string;
  description: string;
  createdDate: string;
  isFinished: boolean;
};

type CardProps = {
  info: CardInfo;
};

export const CardComponentGrid: React.FC<CardProps> = ({ info }) => (
  <Card
    style={{
      display: "flex",
    }}
  >
    <CardMedia
      component="img"
      image={info.image}
      alt={info.title}
      style={{
        width: "50%",
        objectFit: "cover",
      }}
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {info.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {info.description}
      </Typography>
    </CardContent>
  </Card>
);

export const CardComponentList: React.FC<CardProps> = ({ info }) => (
  <Card
    style={{
      background: `url(${info.image}) no-repeat center center`,
      backgroundSize: "cover",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: "10px",
    }}
  >
    <CardContent>
      <Typography variant="h5" component="div">
        {info.title}
      </Typography>
    </CardContent>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {info.description}
      </Typography>
    </CardContent>
  </Card>
);
