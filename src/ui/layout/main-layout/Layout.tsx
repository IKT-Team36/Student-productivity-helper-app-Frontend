import React from 'react'
import {
    AppBar as MuiAppBar,
    Box, ClickAwayListener,
    IconButton, Paper,
    styled,
    Toolbar, Typography, useMediaQuery, useTheme
} from "@mui/material";
import {Menu, Settings, AccountCircle} from "@mui/icons-material";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import {MainSidebar} from "@src/ui/layout/sidebar/MainSidebar";
import {SettingsSidebar} from "@src/ui/layout/sidebar/SettingsSidebar";
import {DRAWER_CLOSE_WIDTH_LG, DRAWER_OPEN_WIDTH} from "@src/ui-shared/constants/Constants";
import {ProfileSidebar} from "@src/ui/layout/sidebar/ProfileSidebar";

const MainContent = styled(Box)<{ open: boolean }>(({theme, open}) => ({
    width: '100vh',
    position: 'relative',
    marginTop: theme.spacing(7),
    // match with width of drawer when open/closed
    marginLeft: open ? `${DRAWER_OPEN_WIDTH}px` : `${DRAWER_CLOSE_WIDTH_LG}px`,
    [theme.breakpoints.down('md')]: {
        marginLeft: open ? `${DRAWER_OPEN_WIDTH}px` : `0px`,
    },
    flexGrow: 1,
}))

const AppBar = styled(MuiAppBar)<{
    open: boolean
}>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: `${DRAWER_OPEN_WIDTH}px`,
        width: `calc(100% - ${DRAWER_OPEN_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Layout = () => {
    const theme = useTheme()
    const smallScreen = useMediaQuery(theme.breakpoints.down('md'))

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    const toggleMenuDrawer = () => {
        setOpenMenu(!openMenu);
        setOpenSettings(false)
        setOpenProfile(false)
    };

    const closeMenuDrawer = () => {
        if (openMenu) {
            setOpenMenu(false)
        }
    }

    const toggleSettingsDrawer = () => {
        setOpenSettings(!openSettings);
        setOpenMenu(false)
        setOpenProfile(false)
    };

    const toggleProfileDrawer = () => {
        setOpenProfile(!openProfile);
        setOpenSettings(false);
        setOpenMenu(false)
    };

    return (
        <Box sx={{display: 'flex'}}>
            <Box sx={{display: 'flex'}}>
                <ClickAwayListener onClickAway={!smallScreen ? closeMenuDrawer : () => undefined}>
                    <Paper elevation={0}>
                        <AppBar position="fixed" open={smallScreen ? false : openMenu}>
                            <Toolbar>
                                {(smallScreen || !openMenu) && (
                                    <IconButton
                                        onClick={toggleMenuDrawer}
                                        edge="start"
                                        sx={{mr: 2, color: 'white'}}>
                                        <Menu/>
                                    </IconButton>
                                )}
                                <Typography variant="subtitle1"
                                            fontWeight={500} letterSpacing={1}>
                                    Student helper app

                                </Typography>

                                <Box marginLeft={'auto'} marginRight={0}>
                                    <IconButton
                                        onClick={toggleSettingsDrawer}
                                        edge="end"
                                        sx={{color: 'white', borderRadius: 0, p: '18px'}}
                                    >
                                        <Settings/>
                                    </IconButton>

                                    <IconButton
                                        onClick={toggleProfileDrawer}
                                        edge="end"
                                        sx={{color: 'white', borderRadius: 0, ml: 2, p: '18px'}}
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                </Box>
                            </Toolbar>
                        </AppBar>
                        <MainSidebar toggleDrawer={toggleMenuDrawer} open={openMenu}/>
                    </Paper>
                </ClickAwayListener>

                <SettingsSidebar open={openSettings} toggleDrawer={toggleSettingsDrawer}/>
                <ProfileSidebar open={openProfile} toggleDrawer={toggleProfileDrawer}/>
            </Box>

            <MainContent open={smallScreen ? false : openMenu}>
                <Outlet/>
            </MainContent>
        </Box>
    )
}