import {createTheme, PaletteColorOptions, Theme, ThemeOptions} from "@mui/material/styles";
import {blueGrey} from "@mui/material/colors";
import PlusJakartaSansBold from '@src/assets/font/PlusJakartaSans-Bold.ttf';
import PlusJakartaSansBoldItalic from '@src/assets/font/PlusJakartaSans-BoldItalic.ttf';
import PlusJakartaSansExtraBold from '@src/assets/font/PlusJakartaSans-ExtraBold.ttf';
import PlusJakartaSansExtraBoldItalic from '@src/assets/font/PlusJakartaSans-ExtraBoldItalic.ttf';
import PlusJakartaSansExtraLight from '@src/assets/font/PlusJakartaSans-ExtraLight.ttf';
import PlusJakartaSansExtraLightItalic from '@src/assets/font/PlusJakartaSans-ExtraLightItalic.ttf';
import PlusJakartaSansMediumItalic from '@src/assets/font/PlusJakartaSans-MediumItalic.ttf';
import PlusJakartaSansRegular from '@src/assets/font/PlusJakartaSans-Regular.ttf';

export const DEFAULT_COLOR = blueGrey

const sharedThemeOptions: ThemeOptions = {
    typography: {
        fontSize: 15,
        fontFamily: "'PlusJakartaSans', 'Arial', 'sans-serif'",
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                  font-family: 'PlusJakartaSans';
                  font-style: normal;
                  font-weight: 300;
                  src: url(${PlusJakartaSansExtraLight}) format("truetype");
                }
                @font-face {
                  font-family: 'PlusJakartaSans';
                  font-style: normal;
                  font-weight: 400;
                  src: url(${PlusJakartaSansRegular}) format("truetype");
                }
                @font-face {
                  font-family: 'PlusJakartaSans';
                  font-style: normal;
                  font-weight: 600;
                  src: url(${PlusJakartaSansBold}) format("truetype");
                }
                @font-face {
                  font-family: 'PlusJakartaSans';
                  font-style: normal;
                  font-weight: 700;
                  src: url(${PlusJakartaSansExtraBold}) format("truetype");
                }
                 @font-face {
                  font-family: 'PlusJakartaSans';
                  font-style: italic;
                  font-weight: 300;
                  src: url(${PlusJakartaSansExtraLightItalic}) format("truetype");
                }
                @font-face {
                  font-family: 'PlusJakartaSans';
                  font-style: italic;
                  font-weight: 400;
                  src: url(${PlusJakartaSansMediumItalic}) format("truetype");
                }
                @font-face {
                  font-family: 'PlusJakartaSans';
                  font-style: italic;
                  font-weight: 600;
                  src: url(${PlusJakartaSansBoldItalic}) format("truetype");
                }
                @font-face {
                  font-family: 'PlusJakartaSans';
                  font-style: italic;
                  font-weight: 700;
                  src: url(${PlusJakartaSansExtraBoldItalic}) format("truetype");
                }
            `
        }
    }
}
const themeOptionsLight: ThemeOptions = {
    ...sharedThemeOptions,
    palette: {
        mode: 'light',
        primary: DEFAULT_COLOR,
        text: {
            primary: '#000',
        }
    },
}

const themeOptionsDark: ThemeOptions = {
    ...sharedThemeOptions,
    palette: {
        mode: 'dark',
        primary: {
            main: '#fff',
        },
        text: {
            primary: '#fff',
        }
    },
}

// export two types of Themes
export const THEME_LIGHT = (color: PaletteColorOptions): Theme => (
    createTheme({
        ...themeOptionsLight,
        palette: {
            ...themeOptionsLight.palette,
            primary: color
        }
    })
)
export const THEME_DARK = createTheme(themeOptionsDark)