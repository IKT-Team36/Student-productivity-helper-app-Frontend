import {
    Box,
    Divider, Drawer,
    Grid,
    IconButton,
    ListSubheader,
    styled,
    Toolbar, Tooltip, Typography, useMediaQuery, useTheme
} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";
import React, {FC, ReactElement} from "react";
import {ROUTES} from "@src/routing/Routes";
import {ListItemLink} from "@src/ui-shared/link/ListItemLink";
import {DRAWER_CLOSE_WIDTH_LG, DRAWER_OPEN_WIDTH} from "@src/ui-shared/constants/Constants";

const StyledListSubheader = styled(ListSubheader)(({theme}) => ({
    lineHeight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: 'normal'
}))

const StyledDrawer = styled(Drawer)<{
    open: boolean,
}>(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            whiteSpace: 'nowrap',
            // match with width of margin left of main content
            width: `${DRAWER_OPEN_WIDTH}px`,
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
                width: `${DRAWER_CLOSE_WIDTH_LG}px`,
            }),
        },
    }),
);


interface Prop {
    open: boolean
    toggleDrawer: () => void
}

export const MainSidebar: FC<Prop> = ({toggleDrawer, open}) => {
    const theme = useTheme()
    const smallScreen = useMediaQuery(theme.breakpoints.down('md'))

    const renderMenuSectionLabel = (
        sectionLabel: string | undefined,
        prevSectionLabel: string | undefined,
    ): ReactElement | null => {
        if (sectionLabel && sectionLabel !== prevSectionLabel && (open || smallScreen)) {
            return <StyledListSubheader color="primary">{sectionLabel}</StyledListSubheader>
        }
        return null
    }

    const renderListItemLink = (
        label: string | undefined,
        path: string,
        icon?: ReactElement,
    ): ReactElement => {
        const linkLabel = label ? label : undefined
        return <ListItemLink to={path} icon={icon} primary={linkLabel}/>
    }

    const displayMenu = Object.values(ROUTES).map(({path, label, sectionLabel, icon}, index) => {
        const prevSectionLabel = ROUTES[index - 1] ? ROUTES[index - 1].sectionLabel : undefined
        return (
            <Grid key={path}>
                <Tooltip arrow
                         title={!open && <Typography variant="subtitle2" fontWeight={'lighter'}>{label}</Typography>}
                         placement={'right'}>
                    <Box>
                        {renderMenuSectionLabel(sectionLabel, prevSectionLabel)}
                        {renderListItemLink(label, path, icon)}
                    </Box>
                </Tooltip>
            </Grid>
        )
    })

    const displayContent = (
        <>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                {open && <IconButton onClick={toggleDrawer}>
                    <ChevronLeft color={'primary'}/>
                </IconButton>}
            </Toolbar>
            <Divider/>
            {displayMenu}
        </>
    )

    return (
        <>
            {smallScreen ?
                <Drawer
                    anchor={"left"}
                    open={open}
                    onClose={toggleDrawer}
                >
                    {displayContent}
                </Drawer> :
                <StyledDrawer variant="permanent" open={open}>
                    {displayContent}
                </StyledDrawer>
            }
        </>
    )
}