import React from 'react'
import {
    Box,
    Button,
    ButtonGroup, Checkbox,
    Divider, FormControlLabel, FormGroup, Grid,
    List,
    ListItemAvatar, ListItemButton, ListItemText,
    styled,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import {DarkMode, LightMode, ColorLens} from "@mui/icons-material";
import {useThemeMode} from "@src/theme/ThemeModeProvider";


export const SettingsTitle = styled(Box)(({theme}) => ({
    zIndex: 500,
    width: '100%',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'start',
    flexGrow: 1,
}))


export const SettingsSidebar = () => {
    const {mode, color, colorPalette, setThemeMode, setThemeColor, defaultColor} = useThemeMode()
    const theme = useTheme()
    const smallScreen = useMediaQuery(theme.breakpoints.down('lg'))

    return (
        <Box sx={{marginTop: 8, width: smallScreen ? '300px' : '500px'}}>
            <SettingsTitle mb={0}>
                <Typography variant="h6" fontWeight={'normal'}>Settings</Typography>
            </SettingsTitle>

            <Divider/>

            {/* theme mode */}
            <Box sx={{padding: 2}}>
                <Box mb={2} mt={2}>
                    <Typography variant="subtitle1" fontWeight={'normal'}>Theme Mode: </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <ButtonGroup size={'large'} variant={'text'}>
                        <Button onClick={setThemeMode} startIcon={<LightMode/>} disabled={mode === "light"}>
                            <Typography variant={"caption"}>Light</Typography>
                        </Button>
                        <Button onClick={setThemeMode} startIcon={<DarkMode/>} disabled={mode === 'dark'}>
                            <Typography variant={"caption"}>Dark</Typography>
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>

            {/* theme color */}
            <Box sx={{padding: 2}}>
                <Box mb={2} mt={2}>
                    <Typography variant="subtitle1" fontWeight={'normal'}>Theme Color: </Typography>
                </Box>

                <Grid container>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={color === defaultColor}
                                              color={'primary'}
                                              sx={{color: 'inherit'}}
                                              disabled={color === defaultColor}/>
                                }
                                label="Default color"
                                onClick={() => setThemeColor(defaultColor)}/>
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} lg={5}>
                        <Box>
                            <Typography variant="subtitle2" textAlign={'center'}>
                                Primary
                            </Typography>
                        </Box>
                        <Box display={'flex'} justifyContent={'center'}>
                            <List dense={false}>
                                {colorPalette.filter(colorTheme => colorTheme.primary).map((colorTheme) => {
                                    return (
                                        <ListItemButton
                                            selected={color === colorTheme.color && mode === 'light'}
                                            onClick={() => setThemeColor(colorTheme.color)}
                                        >
                                            <ListItemAvatar>
                                                <ColorLens sx={{color: colorTheme.hexColor}}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={colorTheme.name}
                                            />
                                        </ListItemButton>
                                    )
                                })}
                            </List>
                        </Box>

                    </Grid>

                    <Grid item xs={12} md={2} display={!smallScreen ? 'flex' : ''} justifyContent={'center'} p={2}>
                        <Divider orientation={smallScreen ? 'horizontal' : 'vertical'}/>
                    </Grid>

                    <Grid item xs={12} lg={5}>
                        <Box>
                            <Typography variant="subtitle2" textAlign={'center'}>
                                Secondary
                            </Typography>
                        </Box>

                        <Box display={'flex'} justifyContent={'center'}>
                            <List dense={false}>
                                {colorPalette.filter(colorTheme => !colorTheme.primary).map((colorTheme) => {
                                    return (
                                        <ListItemButton
                                            selected={color === colorTheme.color && mode === 'light'}
                                            onClick={() => setThemeColor(colorTheme.color)}
                                        >
                                            <ListItemAvatar>
                                                <ColorLens sx={{color: colorTheme.hexColor}}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={colorTheme.name}
                                            />
                                        </ListItemButton>
                                    )
                                })}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    )
}