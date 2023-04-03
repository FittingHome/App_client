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
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AlertWrong from "../../../component/alert/AlertWrong";
import AlertRight from "../../../component/alert/AlertRight";

const LoginButton = styled(Button)({
  backgroundColor: "#7C3E3D",
  borderRadius: 6,
  "&:hover": {
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

const EmailField = ({ email, setEmail }) => {
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmail(emailValue);
    setEmailError(!emailRegex.test(emailValue));
  };

  return (
    <LogTextField
      id="email"
      label="Adresse email"
      name="email"
      autoComplete="email"
      value={email}
      error={emailError}
      onChange={handleEmailChange}
      helperText={emailError ? "Veuillez rentrer un email valide" : ""}
      variant="outlined"
      required
      fullWidth
    />
  );
};

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [openWrong, setOpenWrong] = useState(false);
  const [openRight, setOpenRight] = useState(false);

  const url = "http://api.fittinghome.fr/user/create";

  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/avatar");
  };

  useEffect(() => {
    if (password.length > 1 && email.length > 1) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [password, email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var credentials = { email: email, password: password };
    localStorage.setItem("credentials", JSON.stringify(credentials));
    navigateRegister();
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    //   body: JSON.stringify(email, password),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       window.location.href = "/home";
    //     } else {
    //       setOpenWrong(true);
    //       throw new Error("login failed");
    //     }
    //   })
    //   .then((data) => {
    //     console.log("Success:", data);
    //     localStorage.setItem("user", JSON.stringify(data));
    //     navigateRegister();
    //     // Add code here to store registration data in Local Storage
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     console.log("can't connect");
    //     setOpenWrong(true);
    //   });
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
              S'inscrire
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
              <Grid container spacing={2} sx={{ marginBottom: 5 }}>
                <Grid item xs={12} sm={6}>
                  <LogTextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="Prénom"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LogTextField
                    fullWidth
                    id="lastName"
                    label="Nom"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <EmailField email={email} setEmail={setEmail} />
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
              {isEmpty ? (
                <LoginButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Connexion
                </LoginButton>
              ) : (
                <LoginButton
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  disabled
                >
                  S'inscrire
                </LoginButton>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Déja un compte ?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <AlertWrong
            open={openWrong}
            setOpen={setOpenWrong}
            text="Impossible de créer un compte"
          >
            <Typography variant="body"></Typography>
          </AlertWrong>
          <AlertRight open={openRight} setOpen={setOpenRight} text="Bonjour">
            <Typography variant="body"></Typography>
          </AlertRight>
        </Container>
      </ThemeProvider>
    </>
  );
}
export default Register;
