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
import { useEffect } from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

const LoginButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#7C3E3D",

  borderRadius: 6,
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: "#7C3E3D",
  },
});

const RegisterButton = styled(Button)({
  backgroundColor: "#7C3E3D",
  borderRadius: 6,
  "&:hover": {
    backgroundColor: "#FFFFFF",
    color: "#7C3E3D",
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

theme.typography.h1 = {
  fontWeight: "200",
  fontSize: "3.2rem",
  "@media (min-width:600px)": {
    fontWeight: "200",
    fontSize: "6.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontWeight: "200",
    fontSize: "8rem",
  },
};

theme.typography.h2 = {
  fontWeight: "200",
  fontSize: "2.2rem",
  "@media (min-width:600px)": {
    fontWeight: "200",
    fontSize: "4.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontWeight: "200",
    fontSize: "6rem",
  },
};

function Home() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };
  const navigateRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          justifyContent="flex-end"
          sx={{
            marginTop: "2%",
            marginBottom: "4%",
          }}
        >
          <Box
            sx={{
              marginTop: "8%",
              marginBottom: "4%",
              marginRight: "10%",
              width: "80%",
            }}
          >
            <Box
              sx={{
                marginBottom: "4%",
              }}
            >
              <Grid container justifyContent="flex-end">
                <Typography variant="h2">Bienvenue sur </Typography>
              </Grid>

              <Grid container justifyContent="flex-end">
                <Typography variant="h1">FittingHome </Typography>
              </Grid>
            </Box>
            <Grid container justifyContent="flex-end">
              <Box
                sx={{
                  width: "60%",
                }}
              >
                <Typography variant="body2">
                  FittingHome vous donne la posibilité d'accéder à votre propre
                  cabine d'essayage virtuel grace à une technologie dernier cri
                  !
                </Typography>
              </Box>
            </Grid>
            <Grid
              container
              sx={{
                marginTop: "2%",
                marginBottom: "4%",
                justifyContent: "right",
              }}
            >
              <Stack spacing={2} direction="row">
                <LoginButton variant="contained" onClick={navigateLogin}>
                  Connexion
                </LoginButton>
                <RegisterButton variant="contained" onClick={navigateRegister}>
                  S'inscrire ?
                </RegisterButton>
              </Stack>
            </Grid>
          </Box>
        </Grid>
      </ThemeProvider>
    </>
  );
}
export default Home;
