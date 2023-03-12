import { Link } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    subtitle: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: 400,
    },
  },
});

const LoginButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#7C3E3D",
  width: 100,
  fontSize: "0.8rem",
  border: "solid 1px",
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: "#7C3E3D",
  },
  "@media (min-width:600px)": {
    width: 140,
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("md")]: {
    width: 160,
    fontSize: "1.2rem",
  },
});

const RegisterButton = styled(Button)({
  backgroundColor: "#7C3E3D",
  borderRadius: 6,
  width: 100,
  fontSize: "0.6rem",
  "&:hover": {
    backgroundColor: "#FFFFFF",
    color: "#7C3E3D",
  },
  "@media (min-width:600px)": {
    width: 140,
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("md")]: {
    width: 160,
    fontSize: "1.2rem",
  },
});

theme.typography.body2 = {
  fontWeight: "200",
  fontSize: "1rem",
  "@media (min-width:600px)": {
    fontWeight: "200",
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontWeight: "200",
    fontSize: "1.6rem",
  },
};

theme.typography.h1 = {
  fontWeight: "200",
  fontSize: "3.6rem",
  "@media (min-width:600px)": {
    fontWeight: "200",
    fontSize: "5.6rem",
  },
  [theme.breakpoints.up("md")]: {
    fontWeight: "200",
    fontSize: "6.8rem",
  },
};

theme.typography.h2 = {
  fontWeight: "200",
  fontSize: "3.2rem",
  "@media (min-width:600px)": {
    fontWeight: "200",
    fontSize: "4.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontWeight: "200",
    fontSize: "5rem",
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
        <Box
          align="right"
          sx={{
            marginTop: "8%",
            marginBottom: "4%",
            marginRight: "10%",
          }}
        >
          {/* <ViewportLogin></ViewportLogin> */}

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
            <Typography
              variant="body2"
              align="right"
              sx={{
                width: "60%",
                minWidth: "300px",
              }}
            >
              FittingHome vous donne la possibilité d'accéder à votre propre
              cabine d'essayage virtuel grace à une technologie dernier cri !
            </Typography>
          </Grid>
          <Grid
            container
            sx={{
              marginTop: "6%",
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
      </ThemeProvider>
    </>
  );
}
export default Home;
