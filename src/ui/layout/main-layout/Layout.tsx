import React from 'react'
import {
    AppBar as MuiAppBar,
    Box, ClickAwayListener,
    IconButton, Paper,
    styled,
    Toolbar, Typography, useMediaQuery, useTheme, Popover
} from "@mui/material";
import {Menu, Settings, AccountCircle, LogoutOutlined} from "@mui/icons-material";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import {MainSidebar} from "@src/ui/layout/sidebar/MainSidebar";
import {SettingsSidebar} from "@src/ui/layout/sidebar/SettingsSidebar";
import {DRAWER_CLOSE_WIDTH_LG, DRAWER_OPEN_WIDTH} from "@src/ui-shared/constants/Constants";

const MainContent = styled(Box)<{ open: boolean }>(({theme, open}) => ({
    width: '100vh',
    position: 'relative',
    marginTop: theme.spacing(7),
    // match with width of drawer when open/closed
    marginLeft: open ? `${DRAWER_OPEN_WIDTH}px` : `${DRAWER_CLOSE_WIDTH_LG}px`,
    [theme.breakpoints.down('md')]: {
        marginLeft: open ? `${DRAWER_OPEN_WIDTH}px` : `0px`,
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
    const [openUser, setOpenUser] = useState<boolean>(false);

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

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPop = Boolean(anchorEl);
    const idPop = openPop ? 'simple-popover' : undefined;

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

                                <Box marginLeft={'auto'}>
                                    <IconButton
                                        onClick={toggleSettingsDrawer}
                                        edge="end"
                                        sx={{color: 'white'}}
                                    >
                                        <Settings/>
                                    </IconButton>

                                    <IconButton
                                        onClick={handleClick}
                                        edge="end"
                                        sx={{color: 'white'}}
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Popover
                                        id={idPop}
                                        open={openPop}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Typography sx={{ p: 2, fontSize:'20px' }}>Name Surname</Typography>
                                        <IconButton  sx={{fontSize:'20px', float:'right', borderRadius:'10px', pl:'60px', pr:'20px'}} href={'/login'}>LogOut<LogoutOutlined /></IconButton>
                                    </Popover>
                                </Box>
                            </Toolbar>
                        </AppBar>
                        <MainSidebar toggleDrawer={toggleMenuDrawer} open={openMenu}/>
                    </Paper>
                </ClickAwayListener>

                <SettingsSidebar open={openSettings} toggleDrawer={toggleSettingsDrawer}/>
            </Box>

            <MainContent open={smallScreen ? false : openMenu}>
                <Outlet/>
            </MainContent>
        </Box>
    )
}