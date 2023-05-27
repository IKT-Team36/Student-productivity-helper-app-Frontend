import React, {FC, useEffect, useState} from 'react'
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, IconButton, CircularProgress,
    Card, CardContent, CardActions
} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {Breadcrumb} from "@src/routing/Routes";

interface Prop {
    breadcrumbs: Breadcrumb[]
}

export const Notes: FC<Prop> = ({breadcrumbs}) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(false);
    const [profile, setProfile] = useState<StateProperties[]>([]);
    const [dataSubmit, setDataSubmit] = useState({
        noteContent: "", dateModified: dayjs().format('DD-MMMM-YYYY').toString(), user: 27, course: 29

    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    type StateProperties = {
        noteId: number; noteContent: string; dateModified: string;
    }

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:7762/api/v1/note/allNotes')
            .then(response => response.json())
            .then(data => {
                setProfile(data);
                setLoading(false);
            })

    }, [reloadFlag]);

    const remove = async (id: number) => {
        setLoading(true)
        await fetch(`http://localhost:7762/api/v1/note/delete/${id}`, {
            method: 'DELETE',
        })
        setReloadFlag(prev => !prev)
    }

    const handleSubmit = async (e: any) => {
        setLoading(true)
        handleClose()
        e.preventDefault()
        await fetch('http://localhost:7762/api/v1/note/add', {
            method: 'POST', body: JSON.stringify(dataSubmit), headers: {
                'Content-Type': 'application/json'
            }
        });
        setReloadFlag(prev => !prev)
    }

    function handleChange(e: any) {
        const desc = e.target.value
        setDataSubmit({
            noteContent: desc, dateModified: dayjs().format('DD-MMMM-YYYY HH:m').toString(), user: 27, course: 29
        })
    }

    const createButton = (<Button variant="outlined" startIcon={<AddRounded/>} onClick={handleOpen}>Create new</Button>)

    return (<ScreenLayout title={'Notes'} action={createButton} breadcrumbs={breadcrumbs}>
        {loading ? <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress/>
            </Box> :
            <Box>
                {profile.map(profiler =>
                    <Card key={profiler?.noteId} sx={{mr: 3, mb:2, position:'relative'}}>
                        <CardContent sx={{display:'inline-block'}}>
                            <IconButton sx={{borderRadius: '10px', scale: '50%'}}>N. {profiler?.noteId}</IconButton>
                            <Box display={"inline-block"} width={'70%'}>
                                {profiler?.noteContent}
                            </Box>
                            <Box sx={{ml:2}}>
                                {profiler?.dateModified}
                            </Box>
                            <CardActions>
                                <Button onClick={() => remove(profiler?.noteId)}>Delete</Button>
                            </CardActions>
                        </CardContent>
                        <Box width={'10%'} height={'80px'} sx={{float:'inline-end', position:'absolute', right:'0', top:'0'}} bgcolor={'primary.main'}></Box>
                    </Card>)}
            </Box>}
        <Box>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Dialog onClose={handleClose} open={open} maxWidth={'sm'}>
                    <DialogTitle color={'primary'}>Create new note</DialogTitle>

                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    multiline
                                    rows={14}
                                    variant="outlined"
                                    placeholder={'Description'}
                                    onChange={(e) => handleChange(e)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                        <DemoItem>
                                            <DateTimePicker defaultValue={dayjs()}/>
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions sx={{p: 3}}>
                        <Button variant="outlined"
                                onClick={handleClose}>Close</Button>
                        <Button variant="contained" sx={{width: '30%'}}
                                onClick={(e) => handleSubmit(e)}>Save</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </Box>

    </ScreenLayout>)
}