import { Link } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useState } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import "../../../style/App.css";

const LoginButton = styled(Button)({
  backgroundColor: "#7C3E3D",
  borderRadius: 6,
  "&:hover": {
    backgroundColor: "#FFFFFF",
    color: "#7C3E3D",
  },
});

const RegisterButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#7C3E3D",

  borderRadius: 6,
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: "#7C3E3D",
  },
});

const LogTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#7C3E3D",
    borderBottomColor: "#7C3E3D",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "grey",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7C3E3D",
    },
  },
});

const theme = createTheme({
  typography: {
    subtitle: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: 400,
    },
  },
});

async function loginUser(credentials) {
  const url = "http://api.fittinghome.fr/user/connect";

  console.log("data sent :", credentials);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await loginUser({
      username,
      password,
    });
    if ("accessToken" in response) {
      console
        .log("Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        })
        .then((value) => {
          localStorage.setItem("accessToken", response["accessToken"]);
          localStorage.setItem("user", JSON.stringify(response["user"]));
          window.location.href = "/profile";
        });
    } else {
      console.log("Failed :", response.message, "error");
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              bgcolor: "background.paper",
              padding: 5,
              marginTop: 8,
              border: 1,
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ color: "#7C3E3D" }}>
              Se connecter
            </Typography>
            <Typography component="h1" variant="subtitle">
              FittingHome, le mannequin c'est vous !
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid
                container
                spacing={2}
                sx={{ marginTop: 2, marginBottom: 5 }}
              >
                <Grid item xs={12}>
                  <LogTextField
                    required
                    fullWidth
                    id="email"
                    label="Adresse email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LogTextField
                    required
                    fullWidth
                    name="Mot de passe"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Connection
              </LoginButton>
              <RegisterButton
                type="submit"
                fullWidth
                variant="contained"
                onClick={navigateRegister}
              >
                S'inscrire ?
              </RegisterButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
export default Login;
