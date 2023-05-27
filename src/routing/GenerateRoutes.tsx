import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import {ReactElement, useEffect} from "react";
import {Breadcrumb, ROUTES, RoutesList} from "./Routes";
import {Layout} from "@src/ui/layout/main-layout/Layout";
import {NotFound} from "@src/ui/pages/not-found/NotFound";
import {Login} from "@src/ui/layout-page/login/Login";
import {Register} from "@src/ui/layout-page/register/Register";

const mapRoutes = (routes: RoutesList): ReactElement[] => {
    const routeList = Object.values(routes)

    return routeList.map(({path, Component}) => {
        const currentRoute = routeList.find((route) => route.path === path)
        let breadcrumbs: Breadcrumb[] = []

        if (currentRoute) {
            const prevBreadcrumbs = currentRoute.breadCrumbs ?? []
            const activeBreadcrumb: Breadcrumb = {label: currentRoute.label, path: currentRoute.path}
            breadcrumbs = [...prevBreadcrumbs, activeBreadcrumb]
        }

        return (
            <Route
                path={path}
                key={path}
                element={
                    <Component key={path} path={path} breadcrumbs={breadcrumbs}/>
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
            <Route element={<Login/>} path="/login"/>
            <Route element={<Register/>} path="/Register"/>
        </Routes>
    )
}