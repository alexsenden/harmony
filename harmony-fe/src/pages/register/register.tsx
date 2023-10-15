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

import registerUser from '../../hooks/registerUser'
import { HttpMethod } from '../../hooks/httpRequest'

const RegisterPage = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0)

    const [httpRequestInput, setHttpRequestInput] = useState({
        url: "register",
        method: HttpMethod.POST,
        body: {},
        headers: {}
    })

    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    })

    const onChangeUserData = (firstName: string, lastName: string, username: string, password: string) =>
        {setNewUser({firstName, lastName, username, password})}

    return (
        <>
            <HarmonyAppBar />
            <Container maxWidth="sm" sx={{ justifyContent: "center", display: "flex", alignItems: 'center', minHeight: '80vh' }}>
                <Paper
                    elevation={3}
                    style={{ padding: 50 }}
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
                        <TextField sx={{ margin: 1 }} onChange = {(firstName, newUser.lastName, newUser.username, newUser.password) => onChangeUserData()}
                             label='First Name' placeholder='Enter First Name' variant="outlined" fullWidth required />
                        <TextField sx={{ margin: 1 }} label='Last Name' placeholder='Enter Last Name' variant="outlined" fullWidth required />
                        <TextField sx={{ margin: 1 }} label='Username' placeholder='Enter username' variant="outlined" fullWidth required />
                        <TextField sx={{ margin: 1 }} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required />
                        <Button sx={{ margin: 1 }} onClick={() => { registerUser(httpRequestInput, newUser) }}
                            type='submit' color='primary' variant="contained" fullWidth>Sign up</Button>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}

export default RegisterPage
