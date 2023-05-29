import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';
import React, {FC, useEffect, useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar, DayCalendarSkeleton} from "@mui/x-date-pickers";
import {styled} from "@mui/material";
import {CalendarDay} from "@src/ui/pages/calendar/CalendarDay";
import {Breadcrumb} from "@src/routing/Routes";
import {useSnackbar} from "@src/ui-shared/base/SnackbarProvider";

const DateCalendarStyled = styled(DateCalendar)(({theme}) => ({
    width: '80%',
    minHeight: '900px',
    [theme.breakpoints.down('lg')]: {
        width: '100%',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        minHeight: '200px',
    },

    // whole calendar without month switch and arrows
    '& .MuiPickersSlideTransition-root': {
        minHeight: '900px',
        overflowX: 'none',
    },


    // header style of calendar
    '& .MuiDayCalendar-header': {
        justifyContent: 'space-between !important',
        padding: '20px',
        paddingBottom: 0,
        marginLeft: '40px',
        marginRight: '40px',
        [theme.breakpoints.down('md')]: {
            padding: '0px',
            margin: '0px'
        },
    },

    // typography in calendar header style
    '& .MuiDayCalendar-header .MuiTypography-root': {
        color: theme.palette.primary.main + '!important',
        marginTop: '20px',
        marginBottom: '20px',
        [theme.breakpoints.down('md')]: {
            margin: '5px',
        },
        fontWeight: 'bold',
        fontSize: '12px',
        alignItems: 'center'
    },

    // week row in calendar style
    '& .MuiDayCalendar-weekContainer': {
        justifyContent: 'space-between !important',
        margin: '5px',
        marginTop: '40px',
        marginBottom: '20px',
        marginLeft: '40px',
        marginRight: '40px',
        [theme.breakpoints.down('md')]: {
            margin: '5px',
            marginTop: '15px'
        },
        '& .MuiButtonBase-root': {
            padding: '10px',
            [theme.breakpoints.down('md')]: {
                padding: '0px',
                margin: '0px'
            },
            borderRadius: '20px',
            border: 'none',
        },
        '& .MuiPickersDay-root': {
            margin: '20px',
            padding: '10px',
            [theme.breakpoints.down('md')]: {
                padding: '0px',
                margin: '0px'
            },
            borderRadius: '10px'
        },
        '& :focus.Mui-selected': {
            backgroundColor: theme.palette.primary.main
        }
    },

    // skeleton week row in calendar style
    '& .MuiDayCalendarSkeleton-week': {
        justifyContent: 'space-between !important',
        '& .MuiSkeleton-root': {
            margin: '20px',
            width: '40px !important',
            height: '40px !important',
            [theme.breakpoints.down('md')]: {
                margin: '0px',
            },
        }
    }
}))

interface Prop {
    breadcrumbs: Breadcrumb[]
}

export const Calendar: FC<Prop> = ({breadcrumbs}) => {
    const {showSnackbar} = useSnackbar()
    const [profile, setProfile] = useState<StateProperties[]>([]);
    const [loading, setLoading] = useState(false);

    type StateProperties = {
        eventName: string; eventLocation: string; eventDate: string;
    }
    // state
    const [loadingCalendar, setLoadingCalendar] = useState<boolean>(false)

    // derived state
    const initialValue = dayjs();

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        fetch('http://localhost:7762/api/v1/event/all')
            .then(response => response.json())
            .then(data => {
                setProfile(data);
                setLoading(false);
            })
            .catch(() => {
                showSnackbar('Server not available', "error")
                setLoading(false);
            })
    }, []);

    // TODO to be returned from backend
    const daysWithEvents = [
        dayjs('2023-05-01'),
        dayjs('2023-05-31'),
        dayjs('2023-05-16'),
        dayjs('2023-05-21'),
        dayjs('2023-05-12'),
        dayjs('2023-05-11'),
        dayjs('2023-05-13')
    ]

    const handleCalendarChange = () => {
        setLoadingCalendar(true)
        setTimeout(() => {
            setLoadingCalendar(false)
        }, 1500)
    }

    const dayHasEvent = (day: Dayjs): boolean => {
        return daysWithEvents.findIndex((dayWithEvent) => day.isSame(dayWithEvent)) !== -1
    }

    const getEventsForDay = (day: Dayjs): StateProperties | undefined => {

        const event = profile.find((item) => {
                return dayjs(item.eventDate).format('DD/MM/YYYY') === day.format('DD/MM/YYYY')
            }
        )
        return event
    }

    return (
        <ScreenLayout title={'Calendar'} breadcrumbs={breadcrumbs}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendarStyled
                    defaultValue={initialValue}
                    autoFocus={true}
                    loading={loadingCalendar}
                    onMonthChange={handleCalendarChange}
                    onYearChange={handleCalendarChange}
                    renderLoading={() => <DayCalendarSkeleton/>}
                    slots={{
                        // @ts-ignore
                        day: ((prop) => <CalendarDay dayProps={prop} dayHasEvent={dayHasEvent} loading={loading}
                                                     getEventsForDay={getEventsForDay}/>)
                    }}
                />
            </LocalizationProvider>
        </ScreenLayout>
    )
}