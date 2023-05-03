import React from 'react'
import {Box, styled, Typography} from "@mui/material";
import {FC, PropsWithChildren} from "react";

const ScreenBody = styled(Box)(({theme}) => ({
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
}))

const ScreenHeader = styled(Typography)(({theme}) => ({
    paddingBottom: theme.spacing(3),
}))

interface Props extends PropsWithChildren {
    title?: string
}


export const ScreenLayout: FC<Props> = ({children, title}) => {
    return (
        <ScreenBody>
            {title && <ScreenHeader variant={'h5'} color={'primary'} fontWeight={500}>{title}</ScreenHeader>}
            {children}
        </ScreenBody>
    )
}