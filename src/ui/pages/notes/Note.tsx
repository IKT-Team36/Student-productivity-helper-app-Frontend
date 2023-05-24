import React from 'react'
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {
    Box, Button, TextField, Typography, styled, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";

const TextFieldStyled = styled(TextField)(() => ({
    '& #outlined-multiline-static-label, #standard-basic-label': {
        color: '#dfdfdf'
    }
}));
const DatepPickerStyled = styled(DateRangePicker)(() => ({
    '& .MuiFormControl-root label': {
        color: '#dfdfdf'
    }
}));


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
                        <Box component="form" noValidate autoComplete="off">
                            <TextFieldStyled sx={{width: '50%', mt: 1}} id="standard-basic" label="Title"
                                             variant="outlined"/>
                            <Typography id="modal-modal-description" sx={{mt: 4}}>
                                <TextFieldStyled
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={14}
                                    variant="outlined"
                                    sx={{width: '100%'}}/>
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                    <DatepPickerStyled sx={{mt: 4}} slotProps={{
                                        fieldSeparator: {
                                            sx: {
                                                opacity: 0.5, color: 'gray'
                                            }
                                        }
                                    }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                            <DialogActions sx={{mt: 3, p: 0}}>
                                <Button variant="outlined"
                                        onClick={handleClose}>Close</Button>
                                <Button variant="contained" sx={{width: '30%'}}
                                        onClick={handleClose}>Save</Button>
                            </DialogActions>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>
        </ScreenLayout>
    )
}