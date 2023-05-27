import React, {createContext, FC, PropsWithChildren, ReactElement, useContext, useMemo, useState} from 'react'
import {AlertColor} from '@mui/material'
import {Snackbar} from "@src/ui-shared/base/Snackbar";


interface SnackbarContextValue {
    showSnackbar: (message: string, status: AlertColor) => void
    closeSnackbar: () => void
}

const defaultSnackbarContextValue: SnackbarContextValue = {
    showSnackbar: (_message: string, _status: AlertColor) => null,
    closeSnackbar: () => null,
}

export const SnackbarContext = createContext<SnackbarContextValue>(defaultSnackbarContextValue)

export const useSnackbar = (): SnackbarContextValue => {
    const snackbar = useContext(SnackbarContext)
    return snackbar
}

interface SnackbarState {
    open: boolean
    message: string
    status: AlertColor
}

export const SnackbarProvider: FC<PropsWithChildren> = ({children}): ReactElement => {
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        open: false,
        message: '',
        status: 'info',
    })

    const showSnackbar = (message: string, status: AlertColor) => {
        setSnackbarState({
            open: true,
            message,
            status,
        })
    }

    const closeSnackbar = () => {
        setSnackbarState({
            ...snackbarState,
            open: false,
        })
    }

    const snackbarContextValue: SnackbarContextValue = useMemo(() => {
        return {
            closeSnackbar,
            showSnackbar,
        }
    }, [])

    return (
        <SnackbarContext.Provider value={snackbarContextValue}>
            <>
                {children}
                <Snackbar open={snackbarState.open} onClose={closeSnackbar} severity={snackbarState.status}>
                    {snackbarState.message}
                </Snackbar>
            </>
        </SnackbarContext.Provider>
    )
}
