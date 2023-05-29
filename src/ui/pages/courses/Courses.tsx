import React, { FC } from "react";
import { ScreenLayout } from "@src/ui/layout/main-layout/ScreenLayout";
import { AddRounded } from "@mui/icons-material";
import { Breadcrumb } from "@src/routing/Routes";
import SwitchableView from "./SwitchableView";
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid
} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {DateTimePicker} from "@mui/x-date-pickers";

interface Prop {
  breadcrumbs: Breadcrumb[];
}

const cardData = [
  {
    id: "9",
    image: "https://via.placeholder.com/150",
    title: "Card 4",
    description: "This is card 4",
    createdDate: "2023-06-01",
    isFinished: true,
  },
  {
    id: "2",
    image: "https://via.placeholder.com/150",
    title: "Card 1",
    description: "This is card 1",
    createdDate: "2023-01-02",
    isFinished: false,
  },
  {
    id: "5",
    image: "https://via.placeholder.com/150",
    title: "Card 3",
    description: "This is card 3",
    createdDate: "2023-02-01",
    isFinished: true,
  },
  {
    id: "3",
    image: "https://via.placeholder.com/150",
    title: "Card 7",
    description: "This is card 7",
    createdDate: "2023-03-01",
    isFinished: true,
  },
  {
    id: "1",
    image: "https://via.placeholder.com/150",
    title: "Card 5",
    description: "This is card 5",
    createdDate: "2023-01-02",
    isFinished: true,
  },
  {
    id: "7",
    image: "https://via.placeholder.com/150",
    title: "Card 10",
    description: "This is card 10",
    createdDate: "2023-05-01",
    isFinished: true,
  },
  {
    id: "4",
    image: "https://via.placeholder.com/150",
    title: "Card 8",
    description: "This is card 8",
    createdDate: "2023-03-01",
    isFinished: false,
  },

  {
    id: "6",
    image: "https://via.placeholder.com/150",
    title: "Card 2",
    description: "This is card 2",
    createdDate: "2023-04-01",
    isFinished: false,
  },

  {
    id: "8",
    image: "https://via.placeholder.com/150",
    title: "Card 6",
    description: "This is card 6",
    createdDate: "2023-05-01",
    isFinished: false,
  },

  {
    id: "10",
    image: "https://via.placeholder.com/150",
    title: "Card 9",
    description: "This is card 9",
    createdDate: "2023-06-01",
    isFinished: false,
  },
];

export const Courses: FC<Prop> = ({ breadcrumbs }) => {
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const createButton = (
    <Button variant="outlined" onClick={handleOpen} startIcon={<AddRounded />}>
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField color={'primary'}
                                       label="Semester"
                                       placeholder={'Semester'}
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
                    </Grid>
                </DialogContent>
                <DialogActions sx={{p: 3}}>
                    <Button variant="outlined"
                            onClick={handleClose}>Close</Button>
                    <Button variant="contained" sx={{width: '30%'}}
                            onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
      <SwitchableView title="" data={cardData} />
    </ScreenLayout>
  );
};
