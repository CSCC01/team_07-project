import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Grid, Box } from '@material-ui/core';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('Authorization-Token')) {
      setHasToken(true);
    }
  }, []);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  function useExistingToken(event) {
    event.preventDefault();
    const token = localStorage.getItem('Authorization-Token');
    axios.defaults.headers.common['Authorization'] = token;
    setLoggedIn(true);
  }

  function postLogin(event) {
    // Disable the default form submit action
    event.preventDefault();

    // Remove existing login token
    delete axios.defaults.headers.common['Authorization'];

    axios
      .post('http://localhost:1337/auth/local', {
        identifier: userName,
        password: password,
      })
      .then((response) => {
        if (response.status !== 200) console.warn(response);
        axios.defaults.headers.common['Authorization'] = response.data.jwt;
        localStorage.setItem('Authorization-Token', response.data.jwt);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.message[0].messages[0].message);
      });
  }

  return (
    <Grid container direction="column" justify="center" style={{ minHeight: '100vh'}}>
      <Grid item>
        <Container maxWidth="xs">
          <div>
            <Typography component="h1" variant="alignCenter">
              Login
            </Typography>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                autoComplete="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={postLogin}
              >
                Login
              </Button>
              <Box display="flex" justifyContent="center" alignItems="center">
                {hasToken && (
                  <Link variant="body2" href="/" onClick={useExistingToken} style={{ marginTop: 20, textAlign: "center"}}>
                    It seems like that you are already logged in. Click here to continue.
                  </Link>
                )}
              </Box>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Login;
