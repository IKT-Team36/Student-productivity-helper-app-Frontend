import React from 'react'
import {ThemeProvider} from "@mui/material";
import {FC, PropsWithChildren} from "react";
import {useThemeMode} from "@src/theme/ThemeModeProvider";
import {THEME_DARK, THEME_LIGHT} from "@src/theme/Theme";

export const ThemeMode: FC<PropsWithChildren> = ({children}) => {
    const {mode, color} = useThemeMode()
    return (
        <ThemeProvider theme={mode === 'light' ? THEME_LIGHT(color) : THEME_DARK}>
            {children}
        </ThemeProvider>
    )
}