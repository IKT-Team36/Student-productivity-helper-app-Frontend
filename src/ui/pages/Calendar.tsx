import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';
import React, {useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar, DayCalendarSkeleton, PickersDay, PickersDayProps} from "@mui/x-date-pickers";
import {Badge, styled} from "@mui/material";

const DateCalendarStyled = styled(DateCalendar)(({theme}) => ({
    width: '80%',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
    minHeight: '700px',
    '& .MuiDayCalendar-header': {
        justifyContent: 'space-between !important',
        padding: '20px',
        [theme.breakpoints.down('md')]: {
            padding: '0px',
        },
    },
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
    '& .MuiPickersSlideTransition-root': {
        minHeight: '700px',
        overflowX: 'none',
    },
    '& .MuiDayCalendar-weekContainer': {
        justifyContent: 'space-between !important',
        margin: '5px',
        marginTop: '20px',
        marginBottom: '20px',
        '& .MuiButtonBase-root': {
            padding: '30px',
            [theme.breakpoints.down('md')]: {
                padding: '0px',
            },
            borderRadius: '20px',
            border: 'none',

        },
        '& .MuiPickersDay-root': {
            padding: '30px',
            [theme.breakpoints.down('md')]: {
                padding: '0px',
            },
            borderRadius: '20px'
        },
    },
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


export const Calendar = () => {
    const initialValue = dayjs();
    const [loading, setLoading] = useState<boolean>(false)
    const [daysWithEvents, setDaysWithEvents] = useState<Set<number>>(new Set([1, 2, 15]));

    const handleMonthChange = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }

    function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
        const {highlightedDays = [], day, outsideCurrentMonth, ...other} = props;

        const isSelected =
            !props.outsideCurrentMonth && daysWithEvents.has(props.day.date());

        return (
            <Badge
                overlap="rectangular"
                color={"primary"}
                variant={isSelected ? 'dot' : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}/>
            </Badge>
        );
    }

    return (
        <ScreenLayout title={'Calendar'}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendarStyled
                    defaultValue={initialValue}
                    autoFocus={true}
                    loading={loading}
                    onMonthChange={handleMonthChange}
                    renderLoading={() => <DayCalendarSkeleton/>}
                    slots={{
                        // @ts-ignore
                        day: ServerDay
                    }}
                    slotProps={{
                        day: {
                            highlightedDays2: daysWithEvents,
                        } as any,
                    }}
                />
            </LocalizationProvider>
        </ScreenLayout>
    )
}