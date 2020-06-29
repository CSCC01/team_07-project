import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function LoginForm() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  /*
  const [isError, setIsError] = useState(false);
  */

  function postLogin(event) {
    event.preventDefault();
    axios
      .post('http://localhost:1337/auth/local', {
        identifier: userName,
        password: password,
      })
      .then((reponse) => {
        if (reponse.status === 200) {
          axios.defaults.headers.common['Authorization'] = reponse.data.jwt;
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        alert('The username or password provided were incorrect!');
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/create-promotion" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Log in
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
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
