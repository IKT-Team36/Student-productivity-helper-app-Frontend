import {ScreenLayout} from "@src/ui/layout/main-layout/ScreenLayout";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';
import React, {ReactElement, useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar, DayCalendarSkeleton, PickersDay, PickersDayProps} from "@mui/x-date-pickers";
import {
    Badge,
    Box,
    ClickAwayListener,
    Fade,
    Paper,
    Popper,
    styled,
    Typography, useMediaQuery, useTheme
} from "@mui/material";

const DateCalendarStyled = styled(DateCalendar)(({theme}) => ({
    width: '80%',
    [theme.breakpoints.down('lg')]: {
        width: '100%',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
    minHeight: '700px',
    '& .MuiDayCalendar-header': {
        justifyContent: 'space-between !important',
        padding: '20px',
        marginLeft: '40px',
        marginRight: '40px',
        [theme.breakpoints.down('md')]: {
            padding: '0px',
            margin: '0px'
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
        marginLeft: '40px',
        marginRight: '40px',
        [theme.breakpoints.down('md')]: {
            margin: '5px'
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

const PopperStyled = styled(Popper)(({theme}) => ({
    zIndex: 90000,
    display: "flex",
    justifyContent: 'center',
    width: '300px',
    [theme.breakpoints.down('md')]: {
        width: '200px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100px',
    },
}))

const EventsBody = styled(Paper)(({theme}) => ({
    marginTop: theme.spacing(2),
    zIndex: '90000 !important',
    border: '1px solid rgba(0,0,0,0.1)',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
        padding: '10px'
    },

}))

const EventBadge = styled(Badge)<{ isselected: number }>
(({theme, isselected}) => ({
    '& .MuiBadge-badge': {
        '& .MuiTypography-root': {
            fontSize: '9px !important',
        },
        top: '-4px',
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: isselected ? theme.palette.primary.light : '',
        [theme.breakpoints.up('md')]: {
            height: isselected ? '50px' : '',
            width: isselected ? '90px' : '',
            fontSize: '10px',
            top: '-12px',
            left: '-53px',
        },
    },
}))

export const Calendar = () => {
    const theme = useTheme()

    // state
    const [loadingCalendar, setLoadingCalendar] = useState<boolean>(false)

    // derived state
    const initialValue = dayjs();
    // TODO to be returned from backend
    const daysWithEvents = [dayjs('2023-05-16'), dayjs('2023-05-21'), dayjs('2023-05-12'), dayjs('2023-05-11'), dayjs('2023-05-13')]

    const handleCalendarChange = () => {
        setLoadingCalendar(true)
        setTimeout(() => {
            setLoadingCalendar(false)
        }, 1500)
    }

    const dayHasEvents = (day: Dayjs) => {
        return daysWithEvents.findIndex((dayWithEvent) => day.isSame(dayWithEvent)) !== -1
    }

    const displayDayOnCalendar = (props: PickersDayProps<Dayjs>): ReactElement => {
        const {day, outsideCurrentMonth, ...other} = props;

        const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
        const [open, setOpen] = React.useState(false);

        const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
        const selectedDate = !outsideCurrentMonth && dayHasEvents(day);

        const handleDaySelect = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (selectedDate && !open) {
                setAnchorEl(event.currentTarget);
                setOpen(true);
            }
        };

        const handleDayUnselect = () => {
            if (open && anchorEl !== null) {
                setAnchorEl(null);
                setOpen(false);
            }
        };

        const eventsPreview = (): ReactElement => {
            let result = <></>
            if (selectedDate && !smallScreen) {
                result = (
                    <Box style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                        {/* display first 3 events */}
                        <Typography noWrap>
                            areallyreallylongaddress@email.example.com
                        </Typography>
                        <Typography noWrap>
                            areallyreallylongaddress@email.example.com
                        </Typography>
                        <Typography noWrap>
                            areallyreallylongaddress@email.example.com
                        </Typography>
                    </Box>
                )

            }
            return result
        }

        const eventsDetails = (): ReactElement => {
            let result = <></>
            if (selectedDate) {
                result = (
                    <EventsBody>
                        <Typography variant={'subtitle2'}>
                            Events displayed here.
                        </Typography>
                    </EventsBody>
                )
            }
            return result
        }

        return (
            <ClickAwayListener onClickAway={handleDayUnselect}>
                <Box>
                    <PopperStyled
                        open={open}
                        anchorEl={anchorEl}
                        placement={'bottom'}
                        transition
                    >
                        {({TransitionProps}) => (
                            <Fade {...TransitionProps} timeout={250}>
                                {eventsDetails()}
                            </Fade>
                        )}
                    </PopperStyled>

                    <EventBadge
                        isselected={selectedDate ? 1 : 0}
                        overlap={"rectangular"}
                        color={selectedDate ? "primary" : undefined}
                        variant={selectedDate && smallScreen ? 'dot' : undefined}
                        badgeContent={eventsPreview()}
                    >
                        <PickersDay {...other}
                                    onClick={handleDaySelect}
                                    outsideCurrentMonth={outsideCurrentMonth}
                                    day={day}
                                    centerRipple
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple/>
                    </EventBadge>
                </Box>
            </ClickAwayListener>
        );
    }

    return (
        <ScreenLayout title={'Calendar'}>
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
                        day: displayDayOnCalendar
                    }}
                />
            </LocalizationProvider>
        </ScreenLayout>
    )
}