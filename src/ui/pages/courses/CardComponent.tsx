import {
    Card,
    CardContent,
    Typography, Box,
} from "@mui/material";
import * as React from "react";
import {LocalLibrary, BookmarkAddedRounded} from '@mui/icons-material';

export type CardInfo = {
    name: string;
    semester: string;
    description: string;
    courseStatus: string;
    user: number;
};

type CardProps = {
    info: CardInfo;
};

const getCourseStatus = (status: string) => {
    if (status === 'In Progress') {
        return <LocalLibrary fontSize={'small'} sx={{color: 'primary.light'}}/>
    } else {
        return <BookmarkAddedRounded fontSize={'small'} sx={{color: 'primary.light'}}/>
    }
}

export const CardComponentGrid: React.FC<CardProps> = ({info}) => (
    <Card
        style={{
            display: "flex",
        }}
        sx={{borderRight: '70px solid', borderColor: 'primary.light', position: 'relative'}}
    >
        <CardContent sx={{padding: 4}}>
            <Typography variant="h5" component="div">
                {info.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap={false}>
                {info.description}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap={false}>
                Semester: {info.semester}
            </Typography>
            <Box sx={{position: 'absolute', top: 5, left: 5}}>
                {getCourseStatus(info.courseStatus)}
            </Box>
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
        sx={{borderRight: '100px solid', borderColor: 'primary.light', position: 'relative'}}
        elevation={1}
    >
        <CardContent sx={{ml: 3}}>
            <Typography variant="h5" component="div" width={'100px'}>
                {info.name}
            </Typography>
        </CardContent>
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {info.description}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap={false}>
                Semester: {info.semester}
            </Typography>
        </CardContent>

        <Box sx={{position: 'absolute', top: 7, left: 7}}>
            {getCourseStatus(info.courseStatus)}
        </Box>
    </Card>
);
