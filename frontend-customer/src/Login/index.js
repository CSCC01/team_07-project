import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Grid, Box } from "@material-ui/core";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isCusLoggedIn, setCusLoggedIn] = useState(false);
  const [isRsLoggedIn, setRsLoggedIn] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("Authorization-Token")) {
      setHasToken(true);
    }
  }, []);

  if (isCusLoggedIn) {
    return <Redirect to="/" />;
  }

  if (isRsLoggedIn) {
    return <Redirect to="/validation" />;
  }

  function useExistingToken(event) {
    event.preventDefault();
    const token = localStorage.getItem("Authorization-Token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const stored_role = localStorage.getItem("role");
    if (stored_role.localeCompare("Restaurant Staff") === 0) {
      setRsLoggedIn(true);
    } else if (stored_role.localeCompare("Customer") === 0) {
      setCusLoggedIn(true);
    }
  }

  function postLogin(event) {
    // Disable the default form submit action
    event.preventDefault();

    // Remove existing login token
    delete axios.defaults.headers.common["Authorization"];

    axios
      .post("/auth/local", {
        identifier: userName,
        password: password,
      })
      .then((response) => {
        if (response.status !== 200) console.warn(response);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("Authorization-Token", response.data.jwt);
        var role = response.data.user.role.name;
        localStorage.setItem("role", role);
        localStorage.setItem("name", response.data.user.username);
        if (role.localeCompare("Restaurant Staff") === 0) {
          setRsLoggedIn(true);
        } else if (role.localeCompare("Customer") === 0) {
          setCusLoggedIn(true);
        } else if (role.localeCompare("Restaurant Owner") === 0) {
          window.alert("Please use Restaurant owner frontend to login.");
          localStorage.clear("Authorization-Token");
          localStorage.clear("role");
          localStorage.clear("name");
          delete axios.defaults.headers.common["Authorization"];
          setHasToken(false);
        } else {
          // Should not reach here
          window.alert("Something weird happened");
          localStorage.clear("Authorization-Token");
          localStorage.clear("role");
          localStorage.clear("name");
          delete axios.defaults.headers.common["Authorization"];
          setHasToken(false);
        }
      })
      .catch((error) => {
        alert(error.response.data.message[0].messages[0].message);
      });
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Container maxWidth="xs">
          <div>
            <Typography
              variant="h4"
              align="center"
              style={{ fontWeight: 'bold' }}
            >
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
                  <Link
                    variant="body2"
                    href="/"
                    onClick={useExistingToken}
                    style={{ marginTop: 20, textAlign: "center" }}
                  >
                    It seems like that you are already logged in. Click here to
                    continue.
                  </Link>
                )}
              </Box>
              <div style={{marginTop: 10, textAlign: 'center'}}>
                  <Link variant="body2" href="/register">
                    Do not have an account? Click here to sign up.
                  </Link>
                </div>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Login;
