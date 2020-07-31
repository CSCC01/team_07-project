import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDup, setPasswordDup] = useState('');
  const [email, setEmail] = useState('');

  function postRegister(event) {
    // Disable the default form submit action
    event.preventDefault();
    if (password !== passwordDup) {
      alert("Your passwords don't match.");
    } else {
      var userid;
      axios
        .post('/auth/local/register', {
          username: userName,
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status !== 200) console.warn(response);
          localStorage.setItem('Authorization-Token', response.data.jwt);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.jwt;
          userid = response.data.user.id;
          //Set role to customer
          axios
            .put('/users/' + userid, {
              // Set role to customer
              role: 3
            })
            .then((response) => {
              if (response.status !== 200) console.warn(response);
              window.alert('Registration is successful. You can log in with this account.');
              window.location.href = '/login';
            })
            .catch((error) => {
              console.log(error.response);
              // Alert the error message fetched from backend
              alert(error.response.data.message);
            });
            })
          .catch((error) => {
            console.log(error.response);
            // Alert the error message fetched from backend
            alert(error.response.data.message[0].messages[0].message);
          });
    }
  }

  return (
    <Grid container direction="column" justify="center" style={{ minHeight: '100vh' }}>
      <Grid item>
        <Container maxWidth="xs">
          <div>
            <Typography variant="h4" align="center" style={{fontWeight: "bold"}}>
              Register
            </Typography>
            <form noValidate>
              <TextField
                autoComplete="username"
                name="UserName"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                style={{ marginTop: 20 }}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                autoFocus
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{ marginTop: 20 }}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{ marginTop: 20 }}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordDup"
                label="Confirm Password"
                type="password"
                id="passwordDup"
                autoComplete="current-password"
                onChange={(e) => {
                  setPasswordDup(e.target.value);
                }}
                style={{ marginTop: 20 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={postRegister}
              >
                Register
              </Button>
              <Grid container justify="center" style={{ marginTop: 20 }}>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Register;
