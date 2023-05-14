import React from 'react'
import {
    AppBar as MuiAppBar,
    Box, ClickAwayListener,
    Drawer as MuiDrawer,
    IconButton, Paper,
    styled,
    Toolbar,
} from "@mui/material";
import {Menu, Settings} from "@mui/icons-material";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import {MainSidebar} from "@src/ui/layout/sidebar/MainSidebar";
import {SettingsSidebar} from "@src/ui/layout/appbar-menu/SettingsSidebar";

const drawerOpenWidth = 230;
const drawerCloseWidthSmallScreen = 60;
const drawerCloseWidthBigScreen = 70;

const MainContent = styled(Box)<{ open: boolean }>(({theme, open}) => ({
    width: '100vh',
    position: 'relative',
    marginTop: theme.spacing(7),
    // match with width of drawer when open/closed
    marginLeft: open ? `${drawerOpenWidth}px` : `${drawerCloseWidthBigScreen}px`,
    [theme.breakpoints.down('xs')]: {
        marginLeft: open ? `${drawerOpenWidth}px` : `${drawerCloseWidthSmallScreen}px`,
        // prevent horizontal scrollbar on mobile
        overflow: 'scroll',
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
        marginLeft: `${drawerOpenWidth}px`,
        width: `calc(100% - ${drawerOpenWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer)<{
    open: boolean,
}>(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            whiteSpace: 'nowrap',
            // match with width of margin left of main content
            width: `${drawerOpenWidth}px`,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                // match with width of margin left of main content
                width: `${drawerCloseWidthBigScreen}px`,
                [theme.breakpoints.down('sm')]: {
                    width: `${drawerCloseWidthSmallScreen}px`,
                },
            }),
        },
    }),
);


export const Layout = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openSettings, setOpenSettings] = useState<boolean>(false);

    const toggleMenuDrawer = () => {
        setOpenMenu(!openMenu);
        setOpenSettings(false)
    };

    const closeMenuDrawer = () => {
        if (openMenu) {
            setOpenMenu(false)
        }
    }

    const toggleSettingsDrawer = () => {
        setOpenSettings(!openSettings);
        setOpenMenu(false)
    };

    return (
        <Box sx={{display: 'flex'}}>
            <Box sx={{display: 'flex'}}>
                <ClickAwayListener onClickAway={closeMenuDrawer}>
                    <Paper elevation={0}>
                        <AppBar position="fixed" open={openMenu}>
                            <Toolbar>
                                {!openMenu &&
                                    <IconButton
                                        onClick={toggleMenuDrawer}
                                        edge="start"
                                        sx={{mr: 2, color: 'white'}}>
                                        <Menu/>
                                    </IconButton>
                                }
                                <Box marginLeft={'auto'}>
                                    <IconButton
                                        onClick={toggleSettingsDrawer}
                                        edge="end"
                                        sx={{color: 'white'}}
                                    >
                                        <Settings/>
                                    </IconButton>
                                </Box>
                            </Toolbar>
                        </AppBar>

                        <Drawer variant="permanent" open={openMenu}>
                            <MainSidebar toggleDrawer={toggleMenuDrawer} open={openMenu}/>
                        </Drawer>
                    </Paper>
                </ClickAwayListener>

                <MuiDrawer
                    anchor={"right"}
                    open={openSettings}
                    onClose={toggleSettingsDrawer}
                >
                    <SettingsSidebar/>
                </MuiDrawer>
            </Box>

            <MainContent open={openMenu}>
                <Outlet/>
            </MainContent>
        </Box>
    )
}