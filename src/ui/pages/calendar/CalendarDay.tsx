import React, {FC, ReactElement, useEffect, useState} from "react";
import {PickersDay, PickersDayProps} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {
    alpha,
    Badge,
    Box, CircularProgress,
    ClickAwayListener,
    Fade,
    Paper, Popper,
    styled,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {useSnackbar} from "@src/ui-shared/base/SnackbarProvider";

const EventPopperStyled = styled(Popper)(() => ({
    zIndex: 90000,
    display: "flex",
    justifyContent: 'center',
}))

const EventsBody = styled(Box)(({theme}) => ({
    zIndex: '90000 !important',
    padding: '14px',
    '& .MuiTypography-root': {
        textAlign: 'center',
        fontSize: '14px',
        [theme.breakpoints.down('md')]: {
            fontSize: '12px'
        },
    },
    width: '180px',
    [theme.breakpoints.down('md')]: {
        width: '150px',
        padding: '10px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100px',
        padding: '10px',
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
        color: isselected ? theme.palette.getContrastText(theme.palette.primary.light) : '',
        '& .MuiCircularProgress-root': {
            color: isselected ? alpha(theme.palette.getContrastText(theme.palette.primary.light), .3) : '',
        },
        [theme.breakpoints.up('md')]: {
            height: isselected ? '50px' : '',
            width: isselected ? '90px' : '',
            fontSize: '10px',
            top: '-12px',
            left: '-53px',
        },
    },
}))

interface Prop {
    dayProps: PickersDayProps<Dayjs>
    dayHasEvent: (dat: Dayjs) => boolean
}

export const CalendarDay: FC<Prop> = ({dayProps, dayHasEvent}): ReactElement => {
    const {day, outsideCurrentMonth, ...other} = dayProps;
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [openCalendar, setOpenCalendar] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const {showSnackbar, open} = useSnackbar()

    const [profile, setProfile] = useState<StateProperties[]>([]);

    type StateProperties = {
        eventName: string; eventLocation: string; eventDate: string;
    }

    const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
    const selectedDate = !outsideCurrentMonth && dayHasEvent(day);

    useEffect(() => {
        if (!open && selectedDate) {
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
        }
    }, []);


    const handleDaySelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedDate && !openCalendar) {
            setAnchorEl(event.currentTarget);
            setOpenCalendar(true);
        }
    };

    const handleDayUnselect = () => {
        if (openCalendar && anchorEl !== null) {
            setAnchorEl(null);
            setOpenCalendar(false);
        }
    };

    const eventPreview = (): ReactElement => {
        let result = <></>
        if (selectedDate && !smallScreen) {
            result = (
                <Box>
                    {
                        loading ?
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <CircularProgress size="2rem"/>
                            </Box> :
                            <Box style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                                {profile.map((profiler, index) =>
                                    <Box key={index}>
                                        {parseInt(day.format('DD')) == parseInt(dayjs(profiler.eventDate).format('DD')) ?
                                            <Typography
                                                sx={{textAlign: 'center'}}>{profiler.eventName} </Typography> : ''}
                                    </Box>
                                )}
                            </Box>
                    }
                </Box>
            )
        }
        return result
    }

    const eventDetails = (): ReactElement => {
        let result = <></>
        if (selectedDate) {
            result = (
                <EventsBody>
                    {loading ?
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <CircularProgress size={smallScreen ? "2rem" : "5rem"}/>
                        </Box> :
                        <>
                            {
                                profile.map((profiler, index) =>
                                    <Box key={index}>
                                        {parseInt(day.format('DD')) == parseInt(dayjs(profiler.eventDate).format('DD')) ?
                                            <Typography>{profiler.eventLocation} <br/>
                                                {dayjs(profiler.eventDate).format('HH:mm DD/MMMM/YYYY').toString()}
                                            </Typography> : ''}
                                    </Box>)
                            }
                        </>

                    }
                </EventsBody>
            )
        }
        return result
    }

    // JSX
    const displayCalendarDay = (
        <PickersDay {...other}
                    onClick={smallScreen ? handleDaySelect : () => undefined}
                    outsideCurrentMonth={outsideCurrentMonth}
                    day={day}
                    selected={selectedDate}
                    centerRipple
                    disableRipple
                    disableTouchRipple
                    focusRipple/>
    )

    const smallScreenEventDetails = (
        <EventPopperStyled
            open={openCalendar}
            anchorEl={anchorEl}
            placement={'bottom'}
            transition
            modifiers={[
                {
                    name: 'flip',
                    enabled: false,
                },
            ]}
        >
            {({TransitionProps}) => (
                <Fade {...TransitionProps} timeout={150}>
                    <Paper sx={{mt: 2}}>
                        {eventDetails()}
                    </Paper>
                </Fade>
            )}
        </EventPopperStyled>
    )

    const displayTooltipWithCalendarDay = (
        selectedDate && !openCalendar ? (
            <Tooltip
                TransitionComponent={Fade}
                title={selectedDate && !openCalendar && eventDetails()}
                TransitionProps={{timeout: 200}}
                arrow
            >
                {displayCalendarDay}
            </Tooltip>
        ) : displayCalendarDay
    )

    return (
        <ClickAwayListener onClickAway={smallScreen ? handleDayUnselect : () => undefined}>
            <Box>
                {smallScreen && smallScreenEventDetails}

                <EventBadge
                    isselected={selectedDate ? 1 : 0}
                    overlap={"rectangular"}
                    color={selectedDate ? "primary" : undefined}
                    variant={selectedDate && smallScreen ? 'dot' : undefined}
                    badgeContent={eventPreview()}
                >
                    {smallScreen ? displayCalendarDay : displayTooltipWithCalendarDay}
                </EventBadge>
            </Box>
        </ClickAwayListener>
    );
}