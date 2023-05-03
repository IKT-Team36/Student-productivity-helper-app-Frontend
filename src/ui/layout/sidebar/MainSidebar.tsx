import {
    Box,
    Divider,
    Grid,
    IconButton,
    ListSubheader,
    styled,
    Toolbar, Tooltip, Typography
} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";
import React, {FC, ReactElement} from "react";
import {ROUTES} from "@src/routing/Routes";
import {ListItemLink} from "@src/ui/layout/sidebar/ListItemLink";

const StyledListSubheader = styled(ListSubheader)(({theme}) => ({
    lineHeight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: 'normal'
}))

interface Prop {
    open: boolean
    toggleDrawer: () => void
}

export const MainSidebar: FC<Prop> = ({toggleDrawer, open}) => {

    const renderMenuSectionLabel = (
        sectionLabel: string | undefined,
        prevSectionLabel: string | undefined,
    ): ReactElement | null => {
        if (sectionLabel && sectionLabel !== prevSectionLabel && open) {
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
                <Tooltip arrow title={!open && <Typography variant="subtitle2" fontWeight={'lighter'}>{label}</Typography>} placement={'right'}>
                    <Box>
                        {renderMenuSectionLabel(sectionLabel, prevSectionLabel)}
                        {renderListItemLink(label, path, icon)}
                    </Box>
                </Tooltip>
            </Grid>
        )
    })
    return (
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
}