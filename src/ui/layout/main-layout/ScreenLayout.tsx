import React, {ReactElement} from 'react'
import {Box, Breadcrumbs, Link, styled, Typography} from "@mui/material";
import {FC, PropsWithChildren} from "react";
import {Link as RouterLink} from "react-router-dom";
import {Breadcrumb} from "@src/routing/Routes";

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
    breadcrumbs?: Breadcrumb[]
    action?: ReactElement
}

export const ScreenLayout: FC<Props> = ({children, title, breadcrumbs, action}) => {

    const displayBreadcrumbs = (): ReactElement => {
        const items = breadcrumbs?.slice(0, breadcrumbs?.length - 1)
        const currentRoute = breadcrumbs ? breadcrumbs[breadcrumbs.length - 1] : undefined

        return (
            <>
                {
                    currentRoute && items ? (
                            <Box sx={{height: '30px'}}>
                                {items.length > 0 ? (
                                        <StyledBreadcrumbs maxItems={2} separator={'/'}>
                                            {items.map((breadcrumb, index) => (
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
                                    ) :
                                    <></>}
                            </Box>
                        ) :
                        <></>
                }
            </>
        )
    }

    return (
        <ScreenBody>
            {(title !== undefined || action !== undefined) &&
                <Box flexGrow={1} display={'flex'} justifyContent={'space-between'} height={'40px'}
                     alignItems={'center'}>
                    {title && <Typography variant={'h5'} color={'primary'} fontWeight={500}>{title}</Typography>}
                    {action && <Box mt={1}>{action}</Box>}
                </Box>
            }

            {displayBreadcrumbs()}

            <Box mt={1}>
                {children}
            </Box>
        </ScreenBody>
    )
}