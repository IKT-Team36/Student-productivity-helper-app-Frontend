import React, {FC, ReactElement} from 'react'
import {
    AlertColor,
    Snackbar as SnackBar,
    SnackbarCloseReason,
    SnackbarContentProps,
    SnackbarOrigin,
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'

interface Props {
    children?: React.ReactNode
    open?: boolean
    severity?: AlertColor | undefined
    anchorOrigin?: SnackbarOrigin | undefined
    onClose: ((event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => void) | undefined
    action?: SnackbarContentProps['action']
    persistent?: boolean
}

export const Snackbar: FC<Props> = ({
                                        children,
                                        open,
                                        anchorOrigin,
                                        severity,
                                        onClose,
                                        action,
                                        persistent,
                                    }): ReactElement => {


    return (
        <SnackBar
            anchorOrigin={anchorOrigin || {vertical: 'bottom', horizontal: 'right'}}
            onClose={onClose}
            open={open}
            autoHideDuration={persistent ? null : 5000}
        >
            <MuiAlert
                elevation={6}
                onClose={(e) => {
                    if (onClose) {
                        onClose(e, 'clickaway')
                    }
                }}
                variant="filled"
                severity={severity}
                action={action}
            >
                {children}
            </MuiAlert>
        </SnackBar>
    )
}
