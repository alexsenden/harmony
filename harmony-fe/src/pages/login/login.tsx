import React, { useState } from 'react'
import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    Tab,
    Tabs,
    Typography,
    Input,
    TextField,
    Link,
    Checkbox,
    Box
} from '@mui/material'

import HarmonyAppBar from '../../components/appBar/appBar'
import TextBlock from '../../components/text'

const LoginPage = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0)

    const handleTabChange = (
        event: React.SyntheticEvent,
        tabIndex: React.SetStateAction<number>
    ) => {
        setCurrentTabIndex(tabIndex)
    }

    return (
        <>
            <HarmonyAppBar />
            <Container maxWidth="sm" sx={{justifyContent: "center", display: "flex",  alignItems: 'center',  minHeight: '80vh'}}>
                <Paper
                    elevation={3}
                    style={{padding: 50}}
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 'auto',
                        flexGrow: 1,
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Box
                            component="img"
                            sx={{
                            height: 64,
                            }}
                            alt="Harmony Logo"
                            src={'/harmony1.png'}
                        />
                        <TextField sx={{margin: 1}} label='Username'placeholder='Enter username' variant="outlined" fullWidth required />
                        <TextField sx={{margin: 1}} label='Password'placeholder='Enter password' type='password' variant="outlined" fullWidth required />
                        <Button sx={{margin: 1}} type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>

                        <Typography > Do you have an account ?
                            <Link href="/register" >
                                Sign Up
                            </Link>
                        </Typography>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}

export default LoginPage
