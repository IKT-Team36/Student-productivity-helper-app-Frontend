import React, {FC, useState, useEffect} from "react";
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
    type StateProperties = {
        id: number;
        firstName: string;
        lastName: string;
    }

    const [profile, setProfile] = useState<StateProperties>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:7762/api/v1/registration/user/27')
            .then(response => response.json())
            .then(data => {
                setProfile(data);
                //console.log(data)
                setLoading(false);
            })

    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
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
                    <Typography variant="subtitle1" fontWeight={'normal'}>
                        {profile?.lastName} &nbsp; {profile?.firstName}
                    </Typography>
                </Box>
                <ListItemLink to={'/login'} icon={<LogoutOutlined/>} primary={'Logout'}/>
            </Box>
        </Drawer>
    )
}