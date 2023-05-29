import React, {FC, useEffect, useState} from "react";
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {AddRounded} from "@mui/icons-material";
import {Breadcrumb} from "@src/routing/Routes";
import SwitchableView from "./SwitchableView";
import {
    Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid
} from "@mui/material";
import {CardInfo} from "@src/ui/pages/courses/CardComponent";
import {useSnackbar} from "@src/ui-shared/base/SnackbarProvider";

interface Prop {
    breadcrumbs: Breadcrumb[];
}

export const Courses: FC<Prop> = ({breadcrumbs}) => {

    const [profile, setProfile] = useState<CardInfo[]>([]);
    const [reloadFlag, setReloadFlag] = useState(false);
    const [dataSubmit, setDataSubmit] = useState<CardInfo>({
        name: '',
        semester: '',
        description: '',
        courseStatus: 'In Progress',
        user: 27
    });
    const {showSnackbar} = useSnackbar()

    useEffect(() => {

        fetch('http://localhost:7762/api/v1/course/all')
            .then(response => response.json())
            .then(data => {
                setProfile(data);
            })
    }, [reloadFlag]);
    const handleSubmit = async (e: any) => {
        handleClose()
        e.preventDefault()
        await fetch('http://localhost:7762/api/v1/course/add', {
            method: 'POST', body: JSON.stringify(dataSubmit), headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                console.log(dataSubmit)
                showSnackbar('Successfully added course', "success")
                setReloadFlag(prev => !prev)
            })
            .catch(() => {
                showSnackbar('Error creating course', "error")
            });
    }

    function handleChange(e: any) {
        const newData = {...dataSubmit}
        // @ts-ignore
        newData[e.target.id] = e.target.value
        setDataSubmit(newData)
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const createButton = (
        <Button variant="outlined" onClick={handleOpen} startIcon={<AddRounded/>}>
            Create new
        </Button>
    );



    return (
        <ScreenLayout
            title={"Courses"}
            action={createButton}
            breadcrumbs={breadcrumbs}
        >
            <Box>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Dialog onClose={handleClose} open={open} maxWidth={'sm'}>
                        <DialogTitle color={'primary'}>Create new course</DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField color={'primary'}
                                               label="Name"
                                               placeholder={'Name'}
                                               variant="outlined"
                                               fullWidth
                                               id={'name'}
                                               onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField color={'primary'}
                                               label="Semester"
                                               placeholder={'Semester'}
                                               variant="outlined"
                                               fullWidth
                                               id={'semester'}
                                               onChange={(e) => handleChange(e)}
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
                                        id={'description'}
                                        onChange={(e) => handleChange(e)}
                                    />
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
            <SwitchableView title="" data={profile}/>
        </ScreenLayout>
    );
};
