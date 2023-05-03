import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import {ReactElement, useEffect} from "react";
import {ROUTES, RoutesList} from "./Routes";
import {Layout} from "@src/ui/layout/main-layout/Layout";
import {NotFound} from "@src/ui/pages/NotFound";

const mapRoutes = (routes: RoutesList): ReactElement[] => {
    return Object.values(routes).map(({path, Component}) => {
        return (
            <Route
                path={path}
                key={path}
                element={
                    <Component key={path} path={path}/>
                }
            />
        )
    })
}

export const GenerateRoutes = (): ReactElement => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route element={<Layout/>}>
                {mapRoutes(ROUTES)}
                <Route element={<NotFound/>} path="/*"/>
            </Route>
        </Routes>
    )
}