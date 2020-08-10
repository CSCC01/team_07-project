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
  const [rName, setRName] = useState('');
  const [lng, setLng] = useState(-79.2882);
  const [lat, setLat] = useState(43.8041);
  const [password, setPassword] = useState('');
  const [passwordDup, setPasswordDup] = useState('');
  const [email, setEmail] = useState('');

  async function postRegister(event) {
    // Disable the default form submit action
    event.preventDefault();
    if (password !== passwordDup) {
      alert("Your passwords don't match.");
    } else {
      // User Input is valid. Update the information to the backend
      const restaurantResponse = await axios.post('/restaurants', {
        name: rName,
        location: { lat: Number(lat), lng: Number(lng) },
      });
      axios
        .post('/auth/local/register', {
          username: userName,
          email: email,
          password: password,
          restaurant: restaurantResponse.data.id,
        })
        .then((response) => {
          console.log(response);
          if (response.status !== 200) console.warn(response);
          localStorage.setItem('Authorization-Token', response.data.jwt);
          window.alert('Registration is successful. You can log in with this account.');
          window.location.href = '/login';
        })
        .catch((error) => {
          console.warn(error);
          alert('An unexpected error has occurred');
        });
    }
  }

  return (
    <Grid container direction="column" justify="center" style={{ minHeight: '100vh' }}>
      <Grid item>
        <Container maxWidth="xs">
          <div>
            <Typography component="h1" variant="h5">
              Restaurant Register
            </Typography>
            <form noValidate>
              <TextField
                name="Restaurant Name"
                variant="outlined"
                required
                fullWidth
                id="restaurant-name"
                label="Restaurant Name"
                style={{ marginTop: 20 }}
                onChange={(e) => setRName(e.target.value)}
              />
              <TextField
                name="Restaurant Location Latitude"
                variant="outlined"
                required
                fullWidth
                type="number"
                id="restaurant-lat"
                label="Restaurant Location Latitude"
                inputProps={{ step: 0.0001 }}
                style={{ marginTop: 20 }}
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
              <TextField
                name="Restaurant Location Longitude"
                variant="outlined"
                required
                fullWidth
                type="number"
                id="restaurant-lng"
                label="Restaurant Location Longitude"
                inputProps={{ step: 0.0001 }}
                style={{ marginTop: 20 }}
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
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
