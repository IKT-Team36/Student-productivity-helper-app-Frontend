import {LinkProps as RouterLinkProps, NavLink} from 'react-router-dom'
import React, {ReactElement} from 'react'
import {ListItemButton, ListItemIcon, ListItemText, styled, useTheme} from '@mui/material'

interface ListItemLinkProps {
    primary?: string
    to: string
    icon?: React.ReactElement
    className?: string
    end?: boolean
}

const StyledListItemIcon = styled(ListItemIcon)(({theme}) => ({
    '& .MuiSvgIcon-root': {
        color: theme.palette.primary.main
    }
}))

export const ListItemLink = ({icon, primary, to, className, ...rest}: ListItemLinkProps): ReactElement => {
    const theme = useTheme()
    const LinkBehavior = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(function LinkBehavior(itemProps, ref) {
                return (
                    <NavLink
                        to={to}
                        ref={ref}
                        {...itemProps}
                        className={({isActive}) => (isActive ? itemProps.className + ' Mui-selected' : itemProps.className)}
                        end={to === ''}
                    />
                )
            }),
        [to],
    )

    return (
        <ListItemButton className={className} component={LinkBehavior} {...rest}>
            {icon ? <StyledListItemIcon>{icon}</StyledListItemIcon> : null}
            {primary && <ListItemText style={{color: theme.palette.primary.main}} primary={primary}/>}
        </ListItemButton>
    )
}
