import { Link } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../../../style/App.css";
import ModalSelect from "../components/Modal";
import ObjFile from "../components/ObjFile";
import { height } from "@mui/system";
import findClosestModel from "../components/ModelManager";
import Viewport3DLogin from "../../threejs/Viewport3DLogin";

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
    if (value >= 10 && value <= 140) {
      props.setWeight(value);
    } else if (event.target.value === "") {
      props.setWeight("");
    }
  };

  return (
    <LogTextField
      inputProps={{ min: 40, max: 140 }}
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
  const [url, setUrl] = React.useState(null);
  const credentials = JSON.parse(localStorage.getItem("credentials"));
  const [modelUser, setModelUser] = React.useState("");
  const [modelsData, setModelData] = React.useState([]);
  const [modelImages, setModelImages] = React.useState([]);
  const [fbxData, setFbxData] = React.useState(null);

  React.useEffect(() => {
    setModelImages(findClosestModel(modelsData, age, size, weight));
  }, [modelsData]);

  function checkGoodParams(model) {
    if (age <= model.age + 3 && age >= model.age - 3) {
      if (size <= model.height + 5 && size >= model.height - 5) {
        if (weight <= model.weight + 5 && weight >= model.weight - 5)
          return true;
        else return false;
      } else return false;
    } else return false;
  }

  function findModel() {
    if (modelsData) {
      for (var i = 0; i < modelsData.length; i++) {
        if (sexe === "Homme" && modelsData[i].morphology.isMale) {
          if (checkGoodParams(modelsData[i].morphology)) return modelsData[i];
        } else {
          if (checkGoodParams(modelsData[i].morphology)) return modelsData[i];
        }
      }
    }
    console.log("cannot find matching model");
    return [];
  }

  function getAllModels() {
    fetch("http://91.172.40.53:8080/body/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((result) => setModelData(result))
      .catch((error) => {
        console.error("Error:", error);
        console.log("can't connect to api");
      });
  }

  function fetchModel() {
    getAllModels();
    console.log("all models", modelsData);

    const model = findModel();
    setModelUser(model);
    setUrl(model.filename);

    // createAccount();
  }

  const onClickPrev = () => {
    // getImage();
    fetchModel();
    setHandlePrev(true);
    console.log("the model :", modelUser.filename);
    // const changeAvatar = () => {
    //   /////set url with params
    //   console.log("data saved", weight, size, age, sexe);
    //   // getImage();
    //   fetchStream();
    // };
    // changeAvatar();
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

  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/login");
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
                <Typography
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
                  gutterBottom
                  align="center"
                >
                  <p>(Le chargement du model prendra quelques secondes.)</p>
                </Typography>
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
                  modelImages={modelImages}
                  navigateRegister={navigateRegister}
                ></ModalSelect>
              </Box>
            </Grid>
            {url ? (
              <Viewport3DLogin url={url} />
            ) : (
              <Grid
                item
                xs={4}
                sx={{
                  minWidth: 100,
                  "@media (max-width:600px)": {
                    visibility: "hidden",
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
                  gutterBottom
                  align="center"
                >
                  <p>Votre model s'affichera ici.</p>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
export default AvatarCreation;
