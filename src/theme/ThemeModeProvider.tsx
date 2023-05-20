import React, {createContext, FC, PropsWithChildren, ReactElement, useContext, useMemo, useState} from "react";
import {
    blueGrey,
    deepPurple,
    grey,
    lightBlue,
    lightGreen,
    lime,
    orange,
    red,
    teal
} from "@mui/material/colors";
import {PaletteColorOptions} from "@mui/material/styles";
import {PaletteMode, useMediaQuery} from "@mui/material";
import {DEFAULT_COLOR} from "@src/theme/Theme";

export interface ColorPalette {
    color: PaletteColorOptions,
    name: string,
    hexColor: string,
    primary: boolean
}

interface ThemeModeContextValue {
    mode: PaletteMode
    color: PaletteColorOptions
    setThemeMode: () => void
    setSystemMode: () => void
    setThemeColor: (color: PaletteColorOptions) => void,
    colorPalette: ColorPalette[]
    defaultColor: PaletteColorOptions
}

const defaultThemeModeContextValue: ThemeModeContextValue = {
    mode: 'light',
    color: blueGrey,
    setThemeMode: () => null,
    setSystemMode: () => null,
    setThemeColor: () => null,
    colorPalette: [],
    defaultColor: blueGrey
}

export const ThemeModeContext = createContext<ThemeModeContextValue>(defaultThemeModeContextValue)

export const useThemeMode = (): ThemeModeContextValue => {
    const themeMode = useContext(ThemeModeContext)
    return themeMode
}

export const ThemeModeProvider: FC<PropsWithChildren> = ({children}): ReactElement => {
    const defaultColor: PaletteColorOptions = DEFAULT_COLOR
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [mode, setMode] = useState<PaletteMode>('light')
    const [color, setColor] = useState<PaletteColorOptions>(defaultColor)

    const colorPalette: ColorPalette[] = [
        // primary
        {color: red, name: 'Red', hexColor: '#ef5350', primary: true},
        {color: lightBlue, name: 'Blue', hexColor: '#29b6f6', primary: true},
        {color: lightGreen, name: 'Green', hexColor: '#8bc34a', primary: true},
        {color: orange, name: 'Orange', hexColor: '#ffb300', primary: true},
        // secondary
        {color: lime, name: 'Lime', hexColor: '#cddc39', primary: false},
        {color: grey, name: 'Grey', hexColor: '#9e9e9e', primary: false},
        {color: teal, name: 'Teal', hexColor: '#26a69a', primary: false},
        {color: deepPurple, name: 'Purple', hexColor: '#7e57c2', primary: false}
    ]

    const setThemeMode = (): void => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }

    const setSystemMode = (): void => {
        setMode(prefersDarkMode ? 'dark' : 'light')
    }

    const setThemeColor = (colorSelected: PaletteColorOptions): void => {
        if (colorSelected !== color) {
            setColor(colorSelected)
            setMode('light')
        }
    }

    const themeModeContextValue: ThemeModeContextValue = useMemo(() => {
        return {
            mode,
            color,
            setThemeMode,
            setSystemMode,
            setThemeColor,
            colorPalette,
            defaultColor
        }
    }, [mode, color])

    return (
        <ThemeModeContext.Provider value={themeModeContextValue}>
            {children}
        </ThemeModeContext.Provider>
    )

}