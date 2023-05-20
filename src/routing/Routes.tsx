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
import {Notes} from "@src/ui/pages/notes/Note";
import {Calendar} from "@src/ui/pages/calendar/Calendar";

export interface RouteModel {
    path: string
    Component: React.FC<any>
    label?: string
    sectionLabel?: string
    icon?: ReactElement
    breadCrumbs?: RouteModel[]
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
    breadCrumbs: [HomeRoute]
}

const TodosRoute: RouteModel = {
    path: '/todos',
    Component: Todos,
    label: 'Todos',
    icon: <ChecklistOutlined/>,
    breadCrumbs: [HomeRoute, CourseRoute]
}

const NotesRoute: RouteModel = {
    path: '/notes',
    Component: Notes,
    label: 'Notes',
    icon: <SpeakerNotesOutlined/>,
    breadCrumbs: [HomeRoute, CourseRoute]
}

const CalendarRoute: RouteModel = {
    path: '/calendar',
    Component: Calendar,
    label: 'Calendar',
    icon: <EventNoteRounded/>,
    breadCrumbs: [HomeRoute, CourseRoute]
}

export const ROUTES: RoutesList = {
    HomeRoute,
    CourseRoute,
    TodosRoute,
    NotesRoute,
    CalendarRoute,
}