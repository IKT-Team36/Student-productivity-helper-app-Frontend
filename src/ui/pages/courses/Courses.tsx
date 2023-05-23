import React from 'react'
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {Box, Button} from "@mui/material";
import {AddRounded} from "@mui/icons-material";

export const Courses = () => {

    const createButton = (
        <Button variant="outlined" startIcon={<AddRounded/>}>Create new</Button>
    )

    return (
        <ScreenLayout title={'Courses'} action={createButton}>
            <Box textAlign={'justify'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar nunc eu mi volutpat, eu
                tincidunt lectus interdum. Fusce interdum dolor eu felis placerat, sit amet aliquet enim aliquam.
                Aliquam quis ultricies erat, sit amet pellentesque quam. Vestibulum volutpat auctor quam, id blandit
                ipsum vestibulum nec. Nunc accumsan egestas est. Nunc in augue neque. Proin nec enim fringilla,
                imperdiet libero vel, tristique neque. Ut facilisis mi et orci porta, ut auctor mi fringilla. Sed
                pretium leo at ligula dictum, tincidunt imperdiet arcu tristique. Vivamus suscipit augue eget ex
                suscipit, eget suscipit orci vehicula. Vivamus ultrices imperdiet eros, id tempor quam gravida non. In
                mauris sapien, tempus et nisi vel, vestibulum consequat felis. Quisque volutpat rutrum quam vitae
                suscipit.
            </Box>
        </ScreenLayout>
    )
}