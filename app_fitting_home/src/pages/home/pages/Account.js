import { Container, Grid, TextField, Typography } from "@mui/material";
import { Box, color } from "@mui/system";
import Button from "@mui/material/Button";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "@mui/material/Modal";
import ModalDelete from "../components/Confirm";
import ModalEdit from "../components/ConfirmEdit";
import { Routes, Route, useNavigate } from "react-router-dom";

const EmailField = ({ email, setEmail }) => {
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmail(emailValue);
    setEmailError(!emailRegex.test(emailValue));
  };

  return (
    <TextField
      id="email"
      fullWidth
      label="Jo@test.fr"
      name="email"
      autoComplete="email"
      value={email}
      error={emailError}
      onChange={handleEmailChange}
      helperText={emailError ? "Veuillez rentrer un email valide" : ""}
      variant="outlined"
      margin="normal"
    />
  );
};

////////////////coordonnée : prenom, nom, adresse (localisation), numéro de tel, carte bancaire (stocker ou non) et coordonnées facturation

function Account() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openDelet, setOpenDelet] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenDelet = () => setOpenDelet(true);
  const handleCloseDelet = () => setOpenDelet(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(userData);

  console.log(token);
  const url = "http://91.172.40.53:8080/user";

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  const deleteAccount = async (event) => {
    event.preventDefault();
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      //   body: JSON.stringify(email, password),
    })
      .then((response) => {
        if (response.ok) {
          console.log("delete");
          navigateHome();
        } else {
          throw new Error("login failed");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const editAccount = () => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("modified");
          return response.json();
        } else {
          throw new Error("edit failed");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            bgcolor: "background.paper",
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 26,
            }}
          >
            Information du compte
          </Typography>
          <Box
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 5 }}>
              <Grid item xs={12}>
                <Typography> Adresse email :</Typography>
                <EmailField email={email} setEmail={setEmail}></EmailField>
              </Grid>
              <Grid item xs={12}>
                <Typography> Mot de passe :</Typography>
                <br />
                <TextField
                  name="Mot de passe"
                  label="John"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                ></TextField>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={4}>
                <Button
                  onClick={handleOpenEdit}
                  variant="text"
                  type="submit"
                  style={{ backgroundColor: "white", color: "black" }}
                  fullWidth
                >
                  Enregistrer
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={handleOpenDelet}
                  style={{
                    backgroundColor: "white",
                    color: "red",
                    borderColor: "red",
                  }}
                  fullWidth
                  variant="outlined"
                >
                  Supprimer le compte
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ModalDelete
          open={openDelet}
          handleClose={handleCloseDelet}
          deleteAccount={deleteAccount}
        ></ModalDelete>
        <ModalEdit
          open={openEdit}
          handleClose={handleCloseEdit}
          editAccount={editAccount}
        ></ModalEdit>
        {/* <AlertWrong
          open={openWrong}
          setOpen={setOpenWrong}
          text="Votre mot de passe ou login est incorrect"
          >
          <Typography variant="body"></Typography>
          </AlertWrong>
          <AlertRight open={openRight} setOpen={setOpenRight} text="Bonjour">
          <Typography variant="body"></Typography>
        </AlertRight> */}
      </Container>
    </div>
  );
}

export default Account;
