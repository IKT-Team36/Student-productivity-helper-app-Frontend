import React, {ReactElement} from 'react'
import {Box, Breadcrumbs, Link, styled, Typography} from "@mui/material";
import {FC, PropsWithChildren} from "react";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {ROUTES} from "@src/routing/Routes";

const ScreenBody = styled(Box)(({theme}) => ({
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
}))

const StyledBreadcrumbs = styled(Breadcrumbs)(({theme}) => ({
    '& .MuiBreadcrumbs-li .MuiTypography-root': {
        fontSize: '13px',
        color: theme.palette.primary.main
    },
    '& .MuiBreadcrumbs-separator': {
        color: theme.palette.primary.main
    }
}))


interface Props extends PropsWithChildren {
    title?: string
    showBreadcrumbs?: boolean
}

export const ScreenLayout: FC<Props> = ({children, title, showBreadcrumbs = true}) => {
    const location = useLocation();

    const displayBreadcrumbs = (): ReactElement => {
        const routes = Object.values(ROUTES)
        const currentRoute = routes.find((route) => route.path === location.pathname)
        const breadcrumbs = currentRoute?.breadCrumbs

        return (
            <>
                {
                    breadcrumbs && breadcrumbs.length > 0 && (
                        <StyledBreadcrumbs maxItems={2} separator={'/'}>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <Link
                                    key={index}
                                    underline={'hover'}
                                    to={breadcrumb.path}
                                    component={RouterLink as any}
                                >
                                    {breadcrumb.label}
                                </Link>
                            ))}
                            <Typography
                                mt={'4px'}
                                fontWeight={'bold'}
                            >
                                {currentRoute.label}
                            </Typography>
                        </StyledBreadcrumbs>
                    )
                }
            </>
        )
    }

    return (
        <ScreenBody>
            {title && <Typography variant={'h5'} color={'primary'} fontWeight={500}>{title}</Typography>}
            {showBreadcrumbs &&
                <Box sx={{height: '30px'}}>
                    {displayBreadcrumbs()}
                </Box>
            }
            {children}
        </ScreenBody>
    )
}