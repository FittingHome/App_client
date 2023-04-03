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
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import "../../../style/App.css";
import AlertWrong from "../../../component/alert/AlertWrong";
import AlertRight from "../../../component/alert/AlertRight";
import { color } from "@mui/system";
import { TurnedIn } from "@mui/icons-material";

const LoginButton = styled(Button)({
  backgroundColor: "#7C3E3D",
  borderRadius: 6,
  border: "solid 1px",

  "&:hover": {
    backgroundColor: "#FFFFFF",
    color: "#7C3E3D",
  },
});

const RegisterButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  color: "#7C3E3D",
  border: "solid 1px",

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

theme.typography.body = {
  fontWeight: "500",
  fontSize: "0.7rem",
  "@media (min-width:600px)": {
    fontWeight: "450",
    fontSize: "0.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontWeight: "400",
    fontSize: "0.9rem",
  },
};

// async function loginUser(credentials) {
//   const url = "http://api.fittinghome.fr/user/connect";

//   console.log("data sent :", credentials);
//   return fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openWrong, setOpenWrong] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register");
  };
  const url = "http://api.fittinghome.fr/user/login";

  const handleClick = () => {
    setOpenWrong(true);
  };
  useEffect(() => {
    if (password.length > 1 && email.length > 1) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [password, email]);
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log("isloding", isLoading);
    // GET request using fetch inside useEffect React hook
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(email, password),
    })
      .then((response) => {
        if (response.ok) {
          console.log("is loged");
        } else {
          setOpenWrong(true);
          setLoading(false);
          throw new Error("login failed");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
        setOpenWrong(true);
      });
    // .finally(setLoading(true));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // if ("accessToken" in response) {
    //   console
    //     .log("Success", response.message, "success", {
    //       buttons: false,
    //       timer: 2000,
    //     })
    //     .then((value) => {
    //       localStorage.setItem("accessToken", response["accessToken"]);
    //       localStorage.setItem("user", JSON.stringify(response["user"]));
    //       window.location.href = "/profile";
    //     });
    // } else {
    //   console.log("Failed :", response.message, "error");
    // }
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
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled
                >
                  Connexion
                </LoginButton>
              )}

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
          {isLoading && (
            <div
              style={{ position: "absolute", bottom: "20px", right: "20px" }}
            >
              <CircularProgress style={{ color: "#7C3E3D" }} size={60} />
            </div>
          )}
          <AlertWrong
            open={openWrong}
            setOpen={setOpenWrong}
            text="Votre mot de passe ou login est incorrect"
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
export default Login;
