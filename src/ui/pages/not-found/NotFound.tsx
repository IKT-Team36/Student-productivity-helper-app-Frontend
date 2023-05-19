import React from 'react'
import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {Alert, Box, Typography} from "@mui/material";

export const NotFound = () => {
    return (
        <ScreenLayout>
            <Box display={'flex'} justifyContent={'center'}>
                <Box>
                    <Typography variant={'h1'} textAlign={'center'}>404</Typography>
                    <Typography variant={'h2'} textAlign={'center'}>Not Found</Typography>
                </Box>
            </Box>
            <Alert variant="outlined" severity="error" sx={{mt: 5}}>
                Error alert — Page not found!
            </Alert>
        </ScreenLayout>
    )
}