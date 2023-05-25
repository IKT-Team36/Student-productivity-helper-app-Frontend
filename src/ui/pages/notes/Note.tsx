import React from 'react'
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid
} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {DateTimePicker} from "@mui/x-date-pickers";

export const Notes = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const createButton = (
        <Button variant="outlined" startIcon={<AddRounded/>} onClick={handleOpen}>Create new</Button>
    )

    return (
        <ScreenLayout title={'Notes'} action={createButton}>
            <Box>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle color={'primary'}>Create new note</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12}>
                                <TextField color={'primary'}
                                           label="Title"
                                           placeholder={'Title'}
                                           variant="outlined"
                                           fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    multiline
                                    rows={14}
                                    variant="outlined"
                                    placeholder={'Description'}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                        <DemoItem>
                                            <DateTimePicker/>
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                        <DemoItem>
                                            <DateTimePicker/>
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <DialogActions sx={{mt: 3, p: 0}}>
                            <Button variant="outlined"
                                    onClick={handleClose}>Close</Button>
                            <Button variant="contained" sx={{width: '30%'}}
                                    onClick={handleClose}>Save</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </Box>
        </ScreenLayout>
    )
}