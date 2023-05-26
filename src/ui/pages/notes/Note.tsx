import React, {useEffect, useState} from 'react'
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, IconButton
} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

export const Notes = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const createButton = (
        <Button variant="outlined" startIcon={<AddRounded/>} onClick={handleOpen}>Create new</Button>
    )

    type StateProperties = {
        noteId: number;
        noteContent: string;
        dateModified: string;
    }

    const [profile, setProfile] = useState<StateProperties[]>([]);
    const [dataSubmit, setDataSubmit] = useState({
        noteContent: "",
        dateModified: dayjs().format('DD-MMMM-YYYY').toString(),
        user: 27,
        course: 29

    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:7762/api/v1/note/allNotes')
            .then(response => response.json())
            .then(data => {
                setProfile(data);
                //console.log(data)
                setLoading(false);
            })

    }, []);


    const remove = async (id: number) => {
        let url = 'http://localhost:7762/api/v1/note/delete/'
        fetch(url + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        navigate('/notes')
        alert('Noted Deleted')
        window.location.reload();
    }

    const handleSubmit = async (e: any) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:7762/api/v1/note/add', {
            method: 'POST',
            body: JSON.stringify(dataSubmit),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result =  await response.json();
        console.log(dataSubmit)
        alert('Note Added')
        window.location.reload();
    }

    function handleChange(e:any) {
        const desc = e.target.value
        setDataSubmit({
            noteContent: desc,
            dateModified: dayjs().format('DD-MMMM-YYYY HH:m').toString(),
            user: 27,
            course: 29
        })
        console.log(dataSubmit)

    }

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <ScreenLayout title={'Notes'} action={createButton}>
            <Box>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle color={'primary'}>Create new note</DialogTitle>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <DialogContent>
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        multiline
                                        rows={14}
                                        variant="outlined"
                                        placeholder={'Description'}
                                        fullWidth
                                        value={dataSubmit.noteContent}
                                        id={'Description'}
                                        onChange={(e)=>handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                            <DemoItem>
                                                <DateTimePicker defaultValue={dayjs()}/>
                                            </DemoItem>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <DialogActions sx={{mt: 3, p: 0}}>
                                <Button variant="outlined"
                                        onClick={handleClose}>Close</Button>
                                <Button variant="contained" sx={{width: '30%'}}
                                        type={'submit'}>Save</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </Box>
            <Box display={"flex"} sx={{mt:5}}  >
                {profile.map(profiler =>
                    <Box key={profiler?.noteId} sx={{mr:3}}>
                        <IconButton sx={{borderRadius:'10px', scale:'50%'}} >N. {profiler?.noteId}</IconButton>
                        <Box  display={"inline-block"} width={'70%'} >
                            {profiler?.noteContent}
                        </Box>
                        <br/>
                        {profiler?.dateModified}
                        <Button onClick={() => remove(profiler?.noteId)}>Delete</Button>
                    </Box>
                )}
            </Box>
        </ScreenLayout>
    )
}