import React from 'react'
import {ThemeModeProvider} from "./theme/ThemeModeProvider";
import {ThemeMode} from "./theme/ThemeMode";
import {GenerateRoutes} from "./routing/GenerateRoutes";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";

function App() {
    return (
        <ThemeModeProvider>
            <ThemeMode>
                <CssBaseline/>
                <BrowserRouter>
                    <GenerateRoutes/>
                </BrowserRouter>
            </ThemeMode>
        </ThemeModeProvider>
    )
}

export default App
