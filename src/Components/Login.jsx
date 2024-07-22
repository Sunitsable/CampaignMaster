import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const paperStyle = {
        padding: 20,
        width: 350,
        margin: '20px auto',
        borderRadius: 15
    };

    const avatarStyle = {
        backgroundColor: '#1bbd7e',
        marginBottom: 10
    };

    const btnStyle = {
        margin: '20px 0'
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            if (!response.ok) {
                setErrorMessage(result.message);
                throw new Error(result.message);
            }

            console.log('Login successful');
            navigate("/homepage");
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <Grid container justifyContent="center">
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleLogin}>
                    <TextField
                        label='Email'
                        placeholder='Enter email'
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label='Password'
                        placeholder='Enter password'
                        type='password'
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <Typography align="center" color="error">
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnStyle}
                        fullWidth
                    >
                        Sign in
                    </Button>
                </form>
                <Typography align="center">
                    <Link href="#" >
                        Forgot password?
                    </Link>
                </Typography>
                <Typography align="center">
                    Do not have an account?&nbsp;
                    <Link href="/signup" >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Login;
