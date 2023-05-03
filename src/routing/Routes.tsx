import React, {ReactElement} from "react";
import {
    HomeOutlined,
    ChecklistOutlined,
    BookOutlined,
    SpeakerNotesOutlined,
    EventNoteRounded
} from "@mui/icons-material";
import {Home} from "@src/ui/pages/Home";
import {Courses} from "@src/ui/pages/Courses";
import {Todos} from "@src/ui/pages/Todos";
import {Notes} from "@src/ui/pages/Notes";
import {Calendar} from "@src/ui/pages/Calendar";

export interface RouteModel {
    path: string
    Component: React.FC<any>
    label?: string
    sectionLabel?: string
    icon?: ReactElement
}

export interface RoutesList {
    [key: string]: RouteModel
}

export const ROUTES: RoutesList = {
    Home: {
        path: '/home',
        Component: Home,
        label: 'Home',
        sectionLabel: 'Overview',
        icon: <HomeOutlined/>
    },
    Courses: {
        path: '/courses',
        Component: Courses,
        label: 'Courses',
        icon: <BookOutlined/>
    },
    Todos: {
        path: '/todos',
        Component: Todos,
        label: 'Todos',
        icon: <ChecklistOutlined/>
    },
    Notes: {
        path: '/notes',
        Component: Notes,
        label: 'Notes',
        icon: <SpeakerNotesOutlined/>
    },
    Calendar: {
        path: '/calendar',
        Component: Calendar,
        label: 'Calendar',
        icon: <EventNoteRounded/>
    }
}