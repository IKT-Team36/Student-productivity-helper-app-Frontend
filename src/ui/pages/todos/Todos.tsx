import React, {FC, useState} from 'react'
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {alpha, Box, Button, Grid, styled, Typography, useTheme} from "@mui/material";
import {
    AddRounded,
    RotateRightRounded,
    PendingOutlined,
    CheckCircleOutlineRounded
} from '@mui/icons-material';
import {Breadcrumb} from "@src/routing/Routes";

const TodoContainer = styled(Box)<{
    dragover: boolean
}>(({theme, dragover}) => ({
    backgroundColor: !dragover ? alpha(theme.palette.primary.main, 0.3) : alpha(theme.palette.primary.main, 0.5),
    zIndex: 1,
    position: 'relative',
    '& .MuiSvgIcon-root': {
        fontSize: '50px',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        marginBottom: 'auto',
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex: '-1 !important',
        border: 'none'
    },
    ...(dragover && {
        '& .MuiSvgIcon-root': {
            fontSize: '90px',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            marginBottom: 'auto',
            marginTop: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            zIndex: '-1 !important',
            border: 'none'
        },
    })
}))

const ItemStyled = styled(Box)(({theme}) => ({
    border: '2px solid',
    borderLeft: '10px solid',
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'left',
    '& .MuiTypography-root': {
        textAlign: 'left'
    },
    cursor: 'pointer'

}))

interface Prop {
    breadcrumbs: Breadcrumb[]
}

export const Todos: FC<Prop> = ({breadcrumbs}) => {
    type TaskType = 'todo' | 'in progress' | 'done'

    const theme = useTheme()

    const [taskTodo, setTaskTodo] = useState<string[]>(["Complete Homework", "Finish writing script"])
    const [taskInProgress, setTaskInProgress] = useState<string[]>(["Developing App", "Rewrite Codebase"])
    const [taskDone, setTaskDone] = useState<string[]>(["Team Meeting", "Project Check"])

    const [dragoverTodo, setDragoverTodo] = useState<boolean>(false)
    const [dragoverInProgress, setDragoverInProgress] = useState<boolean>(false)
    const [dragoverDone, setDragoverDone] = useState<boolean>(false)

    const [moveFrom, setMoveFrom] = useState<TaskType | undefined>()

    function handleOnDrag(e: React.DragEvent, widgetType: string, type: TaskType) {
        e.dataTransfer.setData("widgetType", widgetType)
        setMoveFrom(type)
    }

    function handleOnDrop(e: React.DragEvent, type: TaskType) {
        const widgetType = e.dataTransfer.getData("widgetType") as string

        if (type !== moveFrom) {
            if (type === 'todo') {
                setTaskTodo([...taskTodo, widgetType])
                setDragoverTodo(false)
            } else if (type === 'in progress') {
                setTaskInProgress([...taskInProgress, widgetType])
                setDragoverInProgress(false)
            } else if (type === 'done') {
                setTaskDone([...taskDone, widgetType])
                setDragoverDone(false)
            }

            if (moveFrom === 'todo') {
                setTaskTodo(taskTodo.filter((task) => task !== widgetType))
            } else if (moveFrom === 'in progress') {
                setTaskInProgress(taskInProgress.filter((task) => task !== widgetType))
            } else if (moveFrom === 'done') {
                setTaskDone(taskDone.filter((task) => task !== widgetType))
            }
        } else {
            if (type === 'todo') {
                setDragoverTodo(false)
            } else if (type === 'in progress') {
                setDragoverInProgress(false)
            } else if (type === 'done') {
                setDragoverDone(false)
            }
        }

    }

    function handleDragOver(e: React.DragEvent, type: TaskType) {
        if (type === 'todo') {
            setDragoverTodo(true)
        } else if (type === 'in progress') {
            setDragoverInProgress(true)
        } else if (type === 'done') {
            setDragoverDone(true)
        }

        e.preventDefault()
        e.stopPropagation()
    }

    const createButton = (
        <Button variant="outlined" startIcon={<AddRounded/>}>Create new</Button>
    )

    return (
        <ScreenLayout title={'Todos'} action={createButton} breadcrumbs={breadcrumbs}>
            <Box textAlign={'justify'} sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.primary.main, 0.2)
            }} p={5}>
                <Grid container spacing={1}>


                    {/* TO DO */}
                    <Grid item xs={12} md={4}
                          onDrop={(e) => handleOnDrop(e, 'todo')}
                          onDragOver={(e) => handleDragOver(e, 'todo')}
                          onDragLeave={() => setDragoverTodo(false)}
                    >
                        <Typography textAlign={'center'} m={1} mb={2}>To do</Typography>
                        <TodoContainer dragover={false}
                                       width={'100%'}
                                       minHeight={'300px'}
                                       maxHeight={'300px'}
                        >
                            <Box minHeight={'300px'} maxHeight={'300px'} overflow={'hidden'}
                                 sx={{overflowY: "scroll"}} color={'primary'}>
                                {taskTodo.map((task) => {
                                    return (
                                        <ItemStyled
                                            key={task}
                                            draggable={true}
                                            onDragStart={(e) => handleOnDrag(e, task, 'todo')}>
                                            <Typography noWrap variant={'caption'}>Description:</Typography>
                                            <Typography noWrap variant={'subtitle2'}>{task}</Typography>
                                        </ItemStyled>
                                    )
                                })}
                            </Box>
                        </TodoContainer>

                        <TodoContainer dragover={dragoverTodo}
                                       onDrop={(e) => handleOnDrop(e, 'todo')}
                                       onDragOver={(e) => handleDragOver(e, 'todo')}
                                       width={'100%'}
                                       onDragLeave={() => setDragoverTodo(false)}
                                       minHeight={'300px'}
                                       maxHeight={'300px'}
                                       mt={10}
                        >
                            <Box minHeight={'300px'}
                                 maxHeight={'300px'}
                                 sx={{border: '4px dotted', borderColor: 'primary.main'}}
                                 display={'flex'}
                                 alignItems={'center'}
                                 justifyContent={'center'}
                            >
                                <Box justifyContent={'center'}>
                                    <PendingOutlined color={'primary'}/>
                                </Box>
                            </Box>
                        </TodoContainer>
                    </Grid>


                    {/* IN PROGRESS */}
                    <Grid item xs={12} md={4}
                          onDrop={(e) => handleOnDrop(e, 'in progress')}
                          onDragOver={(e) => handleDragOver(e, 'in progress')}
                          onDragLeave={() => setDragoverInProgress(false)}
                    >
                        <Typography textAlign={'center'} m={1} mb={2}>In progress</Typography>
                        <TodoContainer dragover={false}
                                       width={'100%'}
                                       minHeight={'300px'}
                                       maxHeight={'300px'}
                        >
                            <Box minHeight={'300px'} maxHeight={'300px'} overflow={'hidden'}
                                 sx={{overflowY: "scroll"}} color={'primary'}>
                                {taskInProgress.map((task) => {
                                    return (
                                        <ItemStyled
                                            key={task}
                                            draggable={true}
                                            onDragStart={(e) => handleOnDrag(e, task, 'in progress')}>
                                            <Typography noWrap variant={'caption'}>Description:</Typography>
                                            <Typography noWrap variant={'subtitle2'}>{task}</Typography>
                                        </ItemStyled>
                                    )
                                })}
                            </Box>
                        </TodoContainer>

                        <TodoContainer dragover={dragoverInProgress}
                                       onDrop={(e) => handleOnDrop(e, 'in progress')}
                                       onDragOver={(e) => handleDragOver(e, 'in progress')}
                                       width={'100%'}
                                       onDragLeave={() => setDragoverInProgress(false)}
                                       minHeight={'300px'}
                                       maxHeight={'300px'}
                                       mt={10}
                        >
                            <Box minHeight={'300px'}
                                 maxHeight={'300px'}
                                 sx={{border: '4px dotted', borderColor: 'primary.main'}}
                                 display={'flex'}
                                 alignItems={'center'}
                                 justifyContent={'center'}
                            >
                                <Box justifyContent={'center'}>
                                    <RotateRightRounded color={'primary'}/>
                                </Box>
                            </Box>
                        </TodoContainer>
                    </Grid>


                    {/* DONE */}
                    <Grid item xs={12} md={4}
                          onDrop={(e) => handleOnDrop(e, 'done')}
                          onDragOver={(e) => handleDragOver(e, 'done')}
                          onDragLeave={() => setDragoverDone(false)}
                    >
                        <Typography textAlign={'center'} m={1} mb={2}>Done</Typography>
                        <TodoContainer dragover={false}
                                       width={'100%'}
                                       minHeight={'300px'}
                                       maxHeight={'300px'}
                        >
                            <Box minHeight={'300px'} maxHeight={'300px'} overflow={'hidden'}
                                 sx={{overflowY: "scroll"}} color={'primary'}>
                                {taskDone.map((task) => {
                                    return (
                                        <ItemStyled
                                            key={task}
                                            draggable={true}
                                            onDragStart={(e) => handleOnDrag(e, task, 'done')}
                                        >
                                            <Typography noWrap variant={'caption'}>Description:</Typography>
                                            <Typography noWrap variant={'subtitle2'}>{task}</Typography>
                                        </ItemStyled>
                                    )
                                })}
                            </Box>
                        </TodoContainer>

                        <TodoContainer dragover={dragoverDone}
                                       onDrop={(e) => handleOnDrop(e, 'done')}
                                       onDragOver={(e) => handleDragOver(e, 'done')}
                                       width={'100%'}
                                       onDragLeave={() => setDragoverDone(false)}
                                       minHeight={'300px'}
                                       maxHeight={'300px'}
                                       mt={10}
                        >
                            <Box minHeight={'300px'}
                                 maxHeight={'300px'}
                                 sx={{border: '4px dotted', borderColor: 'primary.main'}}
                                 display={'flex'}
                                 alignItems={'center'}
                                 justifyContent={'center'}
                            >
                                <Box textAlign={'center'}>
                                    <CheckCircleOutlineRounded color={'primary'}/>
                                </Box>
                            </Box>
                        </TodoContainer>
                    </Grid>
                </Grid>
            </Box>
        </ScreenLayout>
    )
}