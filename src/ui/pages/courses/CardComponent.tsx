import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import * as React from "react";

export type CardInfo = {
    name: string;
    semester: string;
    description: string;
    courseStatus: string;
    user:number;
};

type CardProps = {
    info: CardInfo;
};

export const CardComponentGrid: React.FC<CardProps> = ({info}) => (
    <Card
        style={{
            display: "flex",
        }}
    >
        <CardMedia
            component="img"
            alt={info.name}
            style={{
                width: "50%",
                objectFit: "cover",
            }}
        />
        <CardContent>
            <Typography variant="h5" component="div">
                {info.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {info.description}
            </Typography>
        </CardContent>
    </Card>
);

export const CardComponentList: React.FC<CardProps> = ({info}) => (
    <Card
        style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10px",
        }}
    >
        <CardContent>
            <Typography variant="h5" component="div" width={'150px'}>
                {info.name}
            </Typography>
        </CardContent>
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {info.description}
            </Typography>
        </CardContent>
    </Card>
);
