import React, {FC} from "react";
import {Box, Divider, Drawer, styled, Typography} from "@mui/material";
import {ListItemLink} from "@src/ui-shared/link/ListItemLink";
import {LogoutOutlined} from "@mui/icons-material";

export const ProfileTitle = styled(Box)(({theme}) => ({
    zIndex: 500,
    width: '100%',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'start',
    flexGrow: 1,
}))

interface Prop {
    open: boolean
    toggleDrawer: () => void
}

export const ProfileSidebar: FC<Prop> = ({toggleDrawer, open}) => {
    return (
        <Drawer
            anchor={"right"}
            open={open}
            onClose={toggleDrawer}
        >
            <Box sx={{marginTop: 8, width: '200px'}}>
                <ProfileTitle mb={0}>
                    <Typography variant="h6" fontWeight={'normal'}>Profile</Typography>
                </ProfileTitle>

                <Divider/>

                <Box p={2} mt={2}>
                    <Typography variant="subtitle1" fontWeight={'normal'}>Name Surname</Typography>
                </Box>
                <ListItemLink to={'/login'} icon={<LogoutOutlined/>} primary={'Logout'}/>
            </Box>
        </Drawer>
    )
}