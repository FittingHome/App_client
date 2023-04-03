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
import ModalSelect from "../components/Modal";
import ObjFile from "../components/ObjFile";
import ViewportLogin from "../../threejs/ViewportLogin";
import { height } from "@mui/system";

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

function WeightField(props) {
  const [error, setError] = React.useState(false);

  const handleWeightChange = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 10 && value <= 90) {
      props.setWeight(value);
    } else if (event.target.value === "") {
      props.setWeight("");
    }
  };

  return (
    <LogTextField
      inputProps={{ min: 40, max: 120 }}
      type="number"
      fullWidth
      name="weight"
      label="Poids"
      onChange={handleWeightChange}
      value={props.weight}
      id="weight"
      autoComplete="weight"
      error={error}
      helperText={error ? "Veuiller remplir le champs" : ""}
    />
  );
}

function SizeField(props) {
  const [error, setError] = React.useState(false);

  const handleSizeChange = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 110 && value <= 220) {
      props.setSize(value);
    } else if (event.target.value === "") {
      props.setSize("");
    }
  };

  return (
    <LogTextField
      inputProps={{ min: 110, max: 220 }}
      type="number"
      fullWidth
      id="size"
      label="Taille"
      name="size"
      autoComplete="size"
      value={props.size}
      onChange={handleSizeChange}
      error={error}
      helperText={error ? "Veuiller remplir le champs" : ""}
    />
  );
}

function AgeField(props) {
  const [error, setError] = React.useState(false);

  const handleAgeChange = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 10 && value <= 90) {
      props.setAge(value);
    } else if (event.target.value === "") {
      props.setAge("");
    }
  };

  return (
    <LogTextField
      inputProps={{ min: 10, max: 90, step: 1 }}
      type="number"
      fullWidth
      id="age"
      label="Age"
      name="age"
      autoComplete="age"
      value={props.age}
      onChange={handleAgeChange}
      error={error}
      helperText={error ? "Veuiller remplir le champs" : ""}
    />
  );
}

function AvatarCreation() {
  const [sexe, setSexe] = React.useState("");
  const [age, setAge] = React.useState("");
  const [size, setSize] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [buttonPrev, setButtonPrev] = React.useState(false);
  const [handlePrev, setHandlePrev] = React.useState(false);
  const [url, setUrl] = React.useState("/FinalBaseMesh");
  const credentials = JSON.parse(localStorage.getItem("credentials"));
  const [num, setNum] = React.useState("");

  function checkGoodParams({ model }) {
    if (model.age <= age + 5 && model.age >= age - 5)
      if (model.height <= height - 10 && model.height >= height - 10)
        if (model.weight <= weight - 10 && model.weight >= weight - 10)
          return true;
        else return false;
      else return false;
    else return false;
  }

  function findModel({ morphologys }) {
    for (var i = 0; i < morphologys.length; i++) {
      if (sexe === "Homme" && morphologys[i].morphology.isMale) {
        if (checkGoodParams(morphologys[i])) return morphologys[i];
      } else {
        if (checkGoodParams(morphologys[i])) return morphologys[i];
      }
    }
    return [];
  }

  function getAllModels() {
    fetch("http://api.fittinghome.fr/body/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("is getting");
        } else {
          throw new Error("login failed");
        }
      })
      .then((data) => {
        console.log("http://api.fittinghome.fr/body/all success:", data);
        return data;
        // localStorage.setItem("user", JSON.stringify(data));
        // navigateRegister();
        // Add code here to store registration data in Local Storage
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("can't connect");
      });
  }

  // function callsftp() {

  // }
  function fetchModel() {
    const morphologys = getAllModels();
    const model = findModel(morphologys);
    if (model === []) {
      console.log("cannot find model");
      return null;
    }
    console.log(credentials);

    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    //   body: JSON.stringify(credentials.email, credentials.password),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       window.location.href = "/home";
    //     } else {
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
    //   });
  }
  const onClickPrev = () => {
    fetchModel();
    setHandlePrev(true);
  };

  React.useEffect(() => {
    if (sexe && age && size && weight) {
      setButtonPrev(true);
    }
  });
  const handleChange = (event) => {
    setSexe(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      sexe,
      age,
      size,
      weight,
    });
  };
  const fetchSFTPfile = () => {
    var url = [];
    return url;
  };

  const changeAvatar = () => {
    /////set url with params
    const pathUrl = "/FinalBaseMesh";
    console.log("data saved", weight, size, age, sexe);
    fetchSFTPfile();
    setUrl(pathUrl);
  };

  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/fitting-room");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{
              marginTop: 4,
              display: "flex",
            }}
          >
            <Grid
              item
              xs={4}
              sx={{
                bgcolor: "background.paper",
                padding: 5,
                marginTop: 8,
                border: 1,
                minWidth: 300,
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
                    <AgeField age={age} setAge={setAge} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <GenderSelect sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Sexe
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={sexe}
                        label="Sexe"
                        onChange={handleChange}
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>Sexe</em>
                        </MenuItem>
                        <MenuItem value={"Homme"}>Homme</MenuItem>
                        <MenuItem value={"Femme"}>Femme</MenuItem>
                      </Select>
                    </GenderSelect>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SizeField size={size} setSize={setSize} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <WeightField weight={weight} setWeight={setWeight} />
                  </Grid>
                </Grid>
                {buttonPrev ? (
                  <LoginButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={onClickPrev}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Prévisualiser
                  </LoginButton>
                ) : (
                  <LoginButton
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled
                    // onClick={changeAvatar}
                  >
                    Prévisualiser
                  </LoginButton>
                )}
                <ModalSelect
                  credentials={credentials}
                  handlePrev={handlePrev}
                  navigateRegister={navigateRegister}
                ></ModalSelect>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                minWidth: 200,
                "@media (max-width:600px)": {
                  visibility: "hidden",
                },
              }}
            >
              <ViewportLogin url={url} />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
export default AvatarCreation;
