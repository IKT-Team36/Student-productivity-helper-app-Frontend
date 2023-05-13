import React from 'react'
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {Box, Button, TextField, Modal, Typography, styled, useTheme} from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";

const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '5px',
    boxShadow: '1px 1px 50px #8e8e8e',
    p: 4,
};
const TextFieldStyled = styled(TextField)(({theme}) => ({
    '& #outlined-multiline-static-label, #standard-basic-label': {
        color: '#dfdfdf'
    }
}));
const DatepPickerStyled = styled(DateRangePicker)(({theme}) => ({
    '& .MuiFormControl-root label': {
        color: '#dfdfdf'
    }
}));


export const Notes = () => {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <ScreenLayout title={'Notes'}>
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create New Note
                </Typography>
                <Box textAlign={'center'} border={"2px solid lightgray"} borderRadius={"10px"} width={"400px"}
                     height={"420px"}>
                    <Button onClick={handleOpen} sx={{position: 'relative', py: '165px', px: '155px'}}>
                        <ControlPointIcon style={{opacity: '20%'}} sx={{fontSize: 84}}/>
                    </Button>
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{scale: '100%'}}
                    >
                        <Box component="form" sx={style} noValidate autoComplete="off">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Create New Note
                            </Typography>
                            <TextFieldStyled sx={{mt: 3}} id="standard-basic" label="Title" variant="outlined"/>
                            <Typography id="modal-modal-description" sx={{mt: 4}}>
                                <TextFieldStyled
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={14}
                                    variant="outlined"
                                    sx={{width: '600px'}}/>
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                    <DatepPickerStyled sx={{mt: 3}} slotProps={{
                                        fieldSeparator: {
                                            sx: {
                                                opacity: 0.5,
                                                color: 'gray'
                                            }
                                        }
                                    }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                            < Button variant="outlined" sx={{float:'right',mt:3}} onClick={handleClose}>Close</Button>
                            < Button variant="outlined" sx={{float:'right',mt:3, mr:1}} onClick={handleClose}>Save</Button>
                        </Box>

                    </Modal>
                </Box>
            </Box>
        </ScreenLayout>
    )
}