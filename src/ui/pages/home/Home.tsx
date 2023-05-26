import React from 'react'
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {
    alpha,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    styled,
    Typography
} from "@mui/material";
import {BookOutlined, ChecklistOutlined, SpeakerNotesOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const PaperStyled = styled(Paper)(({theme}) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.text.primary,
    marginBottom: 40,
    [theme.breakpoints.down('md')]: {
        '& h1': {
            textAlign: 'center'
        }

    }
}))

const MainAppBlock = styled(Box)(() => ({
    padding: '50px',
}))

const CardMediaStyle = styled(CardMedia)(() => ({
    padding: '50px !important',
    '& .MuiSvgIcon-root': {
        width: '3em',
        height: '3em',
        padding: '0px'
    }
}))


export const Home = () => {
    const navigate = useNavigate()

    return (
        <ScreenLayout showBreadcrumbs={false}>
            <PaperStyled elevation={0}>
                <Grid container>
                    <Grid item sm={12} lg={7}>
                        <MainAppBlock>
                            <Typography component="h1" variant="h4" color="inherit" gutterBottom>
                                Welcome to the <Typography color={'primary'} component="h2" variant="h4" gutterBottom
                                                           fontWeight={'bold'}> Student Helper App! </Typography>
                            </Typography>
                            <Typography variant="h6" paragraph>
                                We are thrilled to have you join our community of students striving for success. <br/>Whether
                                you're starting a new semester, preparing for exams, or simply looking for ways to
                                enhance your academic journey, we've got you covered.
                                <Typography fontWeight={'bold'} mt={3} color={'primary'}>Happy learning!</Typography>
                            </Typography>
                        </MainAppBlock>
                    </Grid>
                </Grid>
            </PaperStyled>

            {/*COURSES*/}

            <Grid container display={'flex'} justifyContent={'space-between'} spacing={4}>

                <Grid item sm={12} lg={4} sx={{minHeight: '400px'}}>
                    <Box textAlign={'justify'}>
                        <Card elevation={2} sx={{minHeight: '400px'}}>
                            <CardMediaStyle sx={{display: 'flex', justifyContent: 'center', p: 10}}>
                                <BookOutlined fontSize={'large'} color={'primary'}/>
                            </CardMediaStyle>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Course
                                </Typography>
                                <Typography variant="subtitle2" color={'text.light'} textAlign={'left'}
                                            height={'100px'}>
                                    Explore a wide range of courses tailored to your interests and academic goals, all
                                    available at your fingertips on the Student Helper App.
                                </Typography>
                                <Typography variant="h2" textAlign={'center'}>
                                    2
                                </Typography>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <Typography variant="caption" textAlign={'center'} alignItems={'center'}
                                                fontStyle={'italic'}>
                                        total courses
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(`/courses`)}>Take a
                                    look</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>

                {/*TODOS*/}

                <Grid item sm={12} lg={4} sx={{minHeight: '400px'}}>
                    <Box textAlign={'justify'}>
                        <Card elevation={2} sx={{minHeight: '400px'}}>
                            <CardMediaStyle sx={{display: 'flex', justifyContent: 'center', p: 10}}>
                                <ChecklistOutlined fontSize={'large'} color={'primary'}/>
                            </CardMediaStyle>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Todo
                                </Typography>
                                <Typography variant="subtitle2" color={'text.light'} textAlign={'left'}
                                            height={'100px'}>
                                    Stay organized and on top of your tasks with our intuitive todo list feature on the
                                    Student Helper App.
                                </Typography>
                                <Typography variant="h2" textAlign={'center'}>
                                    7
                                </Typography>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <Typography variant="caption" textAlign={'center'} alignItems={'center'}
                                                fontStyle={'italic'}>
                                        total todos
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(`/todos`)}>Take a look</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>

                {/*NOTES*/}

                <Grid item sm={12} lg={4} sx={{minHeight: '400px'}}>
                    <Box textAlign={'justify'}>
                        <Card elevation={2} sx={{minHeight: '400px'}}>
                            <CardMediaStyle sx={{display: 'flex', justifyContent: 'center', p: 10}}>
                                <SpeakerNotesOutlined fontSize={'large'} color={'primary'}/>
                            </CardMediaStyle>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Note
                                </Typography>
                                <Typography variant="subtitle2" color={'text.light'} textAlign={'left'}
                                            height={'100px'}>
                                    Take notes effortlessly and keep your thoughts organized with our convenient
                                    note-taking feature on the Student Helper App.
                                </Typography>
                                <Typography variant="h2" textAlign={'center'}>
                                    5
                                </Typography>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <Typography variant="caption" textAlign={'center'} alignItems={'center'}
                                                fontStyle={'italic'}>
                                        total notes
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(`/notes`)}>Take a look</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
            </Grid>

        </ScreenLayout>
    )
}