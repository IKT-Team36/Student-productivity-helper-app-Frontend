import React, {FC, ReactElement, useEffect, useState} from "react";
import {PickersDay, PickersDayProps} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {
    Badge,
    Box,
    ClickAwayListener,
    Fade,
    Paper, Popper,
    styled,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

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
    const [open, setOpen] = React.useState(false);

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<StateProperties[]>([]);

    type StateProperties = {
        eventName: string; eventLocation: string; eventDate: string;
    }

    const smallScreen = useMediaQuery(theme.breakpoints.down('md'))
    const selectedDate = !outsideCurrentMonth && dayHasEvent(day);

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:7762/api/v1/event/all')
            .then(response => response.json())
            .then(data => {
                setProfile(data);
                setLoading(false);
            })

    }, []);


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

    const eventPreview = (): ReactElement => {
        let result = <></>
        if (selectedDate && !smallScreen) {
            result = (
                <Box style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                    {/* display first 3 events */}
                    {profile.map(profiler =>
                        <Typography noWrap>
                            {profiler.eventName} <br/>
                        </Typography>
                    )}
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
                    {profile.map(profiler=>
                        <Typography>
                            {profiler.eventLocation} <br/>
                            {profiler.eventDate}
                        </Typography>)}
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
            open={open}
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
        selectedDate && !open ? (
            <Tooltip
                TransitionComponent={Fade}
                title={selectedDate && !open && eventDetails()}
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