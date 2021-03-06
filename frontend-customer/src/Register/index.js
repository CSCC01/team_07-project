import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordDup, setPasswordDup] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("4");

  function postRegister(event) {
    // Disable the default form submit action
    event.preventDefault();
    if (password !== passwordDup) {
      alert("Your passwords don't match.");
    } else {
      localStorage.clear("Authorization-Token");
      axios
        .post("/auth/local/register", {
          username: userName,
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status !== 200) console.warn(response);
          localStorage.setItem("Authorization-Token", response.data.jwt);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          const userId = response.data.user.id;
          //Set role to customer
          axios
            .put("/users/" + userId, {
              // Set role to customer
              role: Number(role),
            })
            .then((response) => {
              if (response.status !== 200) console.warn(response);
              window.alert(
                "Registration is successful. You can log in with this account."
              );
              window.location.href = "/login";
            })
            .catch((error) => {
              // Alert the error message fetched from backend
              alert(error.response.data.message);
            });
        })
        .catch((error) => {
          // Alert the error message fetched from backend
          alert(error.response.data.message[0].messages[0].message);
        });
    }
  }

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

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
              style={{ fontWeight: "bold" }}
            >
              Register
            </Typography>
            <FormControl
              component="fieldset"
              align="center"
              margin="normal"
              fullWidth
              style={{
                justifySelf: "center",
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <FormLabel
                component="legend"
                style={{ fontSize: "1.5em", color: "black" }}
              >
                Role
              </FormLabel>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                style={{ justifyContent: "center" }}
              >
                <FormControlLabel value="4" control={<Radio />} label="Staff" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Customer"
                />
              </RadioGroup>
            </FormControl>
            <form noValidate>
              <TextField
                autoComplete="username"
                name="UserName"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
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
