import {Breadcrumb} from "@src/routing/Routes";
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import React, {FC, useEffect, useState} from "react";
import {Card, CardContent, Typography, Grid, Box, CircularProgress} from "@mui/material";
import {styled} from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useSnackbar} from "@src/ui-shared/base/SnackbarProvider";
import {AttachFile, InsertInvitation} from '@mui/icons-material';

const StyledAccordion = styled(Accordion)(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({theme}) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({theme}) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));


interface Prop {
    breadcrumbs: Breadcrumb[];
}

export const SingleCourse: FC<Prop> = ({breadcrumbs}) => {
    const {showSnackbar} = useSnackbar()

    const [attachment, setAttachment] = useState<Attachment[]>([]);
    const [course, setCourse] = useState<Course[]>([]);
    const [eventDto, setEventDto] = useState<EventDto[]>([]);
    const [win, setWin] = useState((window.location.pathname).substring(9));
    const [loading, setLoading] = useState(false);

    type User = {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
    type Course = {
        courseId: number;
        name: string;
        semester: string;
        description: string;
        courseStatus: string;
        user: User;
    }

    type Attachment = {
        attachmentId: number;
        name: string;
        date: string;
        subject: string;
        type: string;
        byteContent: string;
        user_id: number;
    }

    type EventDto = {
        eventId: number;
        eventName: string;
        eventLocation: string;
        eventDate: string;
        course: Course;
        user: User;
    }

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:7762/api/v1/attachment/allAttachments')
            .then(response => response.json())
            .then(data => {
                setAttachment(data);
                fetch('http://localhost:7762/api/v1/course/all')
                    .then(response => response.json())
                    .then(data => {
                        setCourse(data);
                        fetch('http://localhost:7762/api/v1/event/all')
                            .then(response => response.json())
                            .then(data => {
                                setEventDto(data);
                                setLoading(false)
                            })
                    })
            })
            .catch(() => {
                setLoading(false)
                showSnackbar('Server not available', "error")
            })
    }, []);

    return (
        <ScreenLayout title={'Course Details'} breadcrumbs={breadcrumbs}>
            {loading ? <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress/>
                </Box> :
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                {course.map((oneCourse, index) =>
                                    <Box key={index}>
                                        {parseInt(win) == index ?
                                            <CardContent key={oneCourse.courseId}>
                                                <Typography variant="h5" component="div">
                                                    Semester:{oneCourse.semester}

                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    Description: {oneCourse.description}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    Course Status: {oneCourse.courseStatus}
                                                </Typography>
                                            </CardContent> : ''}
                                    </Box>
                                )}
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        align="center"
                                        color="primary"
                                        sx={{marginBottom: 3}}
                                        display={'flex'}
                                        alignItems={'center'}
                                    >
                                        Attachments <AttachFile color={'primary'}/>
                                    </Typography>
                                    <div>
                                        {attachment && attachment.length > 0 ? (
                                            attachment.map((oneAttachment, index) => (
                                                <Box key={index}>
                                                    {oneAttachment.attachmentId === parseInt(win) ?
                                                        <StyledAccordion>
                                                            <StyledAccordionSummary
                                                                expandIcon={
                                                                    <ArrowForwardIosSharpIcon
                                                                        sx={{fontSize: "0.9rem", m: 2}}
                                                                    />
                                                                }
                                                                aria-controls={`panel${index + 1}d-content`}
                                                                id={`panel${index + 1}d-header`}
                                                            >
                                                                <Typography>{oneAttachment.name}</Typography>
                                                            </StyledAccordionSummary>
                                                            <StyledAccordionDetails>
                                                                <Typography>
                                                                    Date: {oneAttachment.date}
                                                                    <br/>
                                                                    Subject: {oneAttachment.subject}
                                                                    <br/>
                                                                    Type: {oneAttachment.type}
                                                                    <br/>
                                                                    Byte Content: {oneAttachment.byteContent}
                                                                    <br/>
                                                                    User ID: {oneAttachment.user_id}
                                                                </Typography>
                                                            </StyledAccordionDetails>
                                                        </StyledAccordion>
                                                        : ''}
                                                </Box>
                                            ))
                                        ) : (
                                            <Typography variant="body1" color="text.secondary">
                                                No attachments found.
                                            </Typography>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        align="center"
                                        color="primary"
                                        sx={{marginBottom: 3}}
                                        display={'flex'}
                                        alignItems={'center'}
                                    >
                                        Events <InsertInvitation color={'primary'} sx={{ml: 1, mt: '5px'}}/>
                                    </Typography>
                                    <div>
                                        {eventDto && eventDto.length > 0 ? (
                                            eventDto.map((oneEvent, index) => (
                                                <Box key={index}>
                                                    {parseInt(win) == oneEvent.eventId ?
                                                        <StyledAccordion key={index}>
                                                            <StyledAccordionSummary
                                                                expandIcon={
                                                                    <ArrowForwardIosSharpIcon
                                                                        sx={{fontSize: "0.9rem", m: 2}}
                                                                    />
                                                                }
                                                                aria-controls={`panel${index + 1}d-content`}
                                                                id={`panel${index + 1}d-header`}
                                                            >
                                                                <Typography>{oneEvent.eventName}</Typography>
                                                            </StyledAccordionSummary>
                                                            <StyledAccordionDetails>
                                                                <Typography>
                                                                    Date: {oneEvent.eventDate}
                                                                    <br/>
                                                                    Location: {oneEvent.eventLocation}
                                                                </Typography>
                                                            </StyledAccordionDetails>
                                                        </StyledAccordion>
                                                        : ''}
                                                </Box>
                                            ))
                                        ) : (
                                            <Typography variant="body1" color="text.secondary">
                                                No events found.
                                            </Typography>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            }
        </ScreenLayout>
    );
};
