import {FormEventHandler, useContext, useState} from "react";
import {AppContext} from "../App";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert, Paper} from "@mui/material";
import axios from 'axios'

const LoginPage = () => {
    const state = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState(false)

    const handleError = (secs: number) => {
        setError(true)
        window.setTimeout(() => {
            setError(false)
        }, secs*1000)
    }
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        axios({
            url: '/login',
            method: 'POST',
            data: JSON.stringify({
                username, password
            }),
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'json'
        }).then(res => {
            if (res.status !== 200) {
                handleError(3)
            }
            state.setCurrentUser(res.data)
            localStorage.setItem("currentUser", JSON.stringify(res.data))
        }).catch(err => {
            handleError(3)
        })
    }

    return (
        <Container component={Paper}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error ? <Alert severity={'error'}>Username or Password incorrect. Please try again.</Alert> : <></>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={username}
                        onChange={(e) => {
                            e.preventDefault()
                            setUsername(e.target.value)
                        }}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => {
                            e.preventDefault()
                            setPassword(e.target.value)
                        }}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" checked={remember} onClick={(e) => {
                            e.preventDefault()
                            setRemember(!remember)
                        }} color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginPage