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
import Collapse from "@mui/material/Collapse";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AvatarCreationDisplay from "../components/AvatarCreationDisplay";
import "../../../style/App.css";

const LoginButton = styled(Button)({
  backgroundColor: "#7C3E3D",
  borderRadius: 6,
  "&:hover": {
    backgroundColor: "#7C3E3D",
  },
});

const GenderSelect = styled(FormControl)({
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

function AvatarCreation() {
  const navigate = useNavigate();
  const [sexe, setSexe] = React.useState("");

  const handleChange = (event) => {
    setSexe(event.target.value);
  };
  const navigateRegister = () => {
    navigate("/register");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      age: data.get("age"),
      sexe: data.get("sexe"),
      size: data.get("size"),
      weight: data.get("weight"),
    });
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
              Création d'avatar
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
                <Grid item xs={12} sm={6}>
                  <LogTextField
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="age"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <GenderSelect sx={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Sexe
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={sexe}
                      label="Sexe"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Sexe</em>
                      </MenuItem>
                      <MenuItem value={10}>Homme</MenuItem>
                      <MenuItem value={20}>Femme</MenuItem>
                    </Select>
                  </GenderSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LogTextField
                    fullWidth
                    id="size"
                    label="Taille"
                    name="size"
                    autoComplete="size"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LogTextField
                    fullWidth
                    name="weight"
                    label="Poids"
                    type="weight"
                    id="weight"
                    autoComplete="weight"
                  />
                </Grid>
              </Grid>
              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Prévisualiser
              </LoginButton>
              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                onClick={navigateRegister}
              >
                Continuer ?
              </LoginButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
export default AvatarCreation;
