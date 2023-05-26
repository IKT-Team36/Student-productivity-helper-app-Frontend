import React, {ReactElement} from "react";
import {
    HomeOutlined,
    ChecklistOutlined,
    BookOutlined,
    SpeakerNotesOutlined,
    EventNoteRounded
} from "@mui/icons-material";
import {Home} from "@src/ui/pages/home/Home";
import {Courses} from "@src/ui/pages/courses/Courses";
import {Todos} from "@src/ui/pages/todos/Todos";
import {Notes} from "@src/ui/pages/notes/Notes";
import {Calendar} from "@src/ui/pages/calendar/Calendar";

export type Breadcrumb = Pick<RouteModel, 'path' | 'label'>

export interface RouteModel {
    path: string
    Component: React.FC<any>
    label?: string
    sectionLabel?: string
    icon?: ReactElement
    breadCrumbs?: Breadcrumb[]
}

export interface RoutesList {
    [key: string]: RouteModel
}

const HomeRoute: RouteModel = {
    path: '/home',
    Component: Home,
    label: 'Home',
    sectionLabel: 'Overview',
    icon: <HomeOutlined/>
}

const CourseRoute: RouteModel = {
    path: '/courses',
    Component: Courses,
    label: 'Courses',
    icon: <BookOutlined/>,
    breadCrumbs: [{path: HomeRoute.path, label: HomeRoute.label}]
}

const TodosRoute: RouteModel = {
    path: '/todos',
    Component: Todos,
    label: 'Todos',
    icon: <ChecklistOutlined/>,
    breadCrumbs: [{path: HomeRoute.path, label: HomeRoute.label}, {path: CourseRoute.path, label: CourseRoute.label}]
}

const NotesRoute: RouteModel = {
    path: '/notes',
    Component: Notes,
    label: 'Notes',
    icon: <SpeakerNotesOutlined/>,
    breadCrumbs: [{path: HomeRoute.path, label: HomeRoute.label}, {path: CourseRoute.path, label: CourseRoute.label}]
}

const CalendarRoute: RouteModel = {
    path: '/calendar',
    Component: Calendar,
    label: 'Calendar',
    icon: <EventNoteRounded/>,
    breadCrumbs: [{path: HomeRoute.path, label: HomeRoute.label}, {path: CourseRoute.path, label: CourseRoute.label}]
}

export const ROUTES: RoutesList = {
    HomeRoute,
    CourseRoute,
    TodosRoute,
    NotesRoute,
    CalendarRoute,
}