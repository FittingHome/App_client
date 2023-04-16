import { Container, Grid, TextField, Typography } from "@mui/material";
import { Box, color } from "@mui/system";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

function CardManager({ isCard, setIsCard }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDateYear, setCardDateYear] = useState("");
  const [cardDateMonth, setCardDateMonth] = useState("");
  const [cvv, setCvv] = useState("");

  const [cardAdresse, setCardAdresse] = useState({
    street: null,
    city: null,
    state: null,
    zipCode: null,
    country: null,
  });
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZip] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const adresse = {
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country,
    };
    setCardAdresse(adresse);
  }, [street, city, state, zipCode, country]);
  //////biiling adresse (street/city/zip/country) / nom / numero / date d'expiration mm / aa  / cvv /
  const url = "http://91.172.40.53:8080/user/wallet";
  const token = JSON.parse(localStorage.getItem("token"));

  const setCard = () => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        billingAddress: cardAdresse,
        cardholderName: cardName,
        cardNumber: cardNumber,
        expirationYear: cardDateYear,
        expirationMonth: cardDateMonth,
        cvv: cvv,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("card added");
          setIsCard(true);
          return response.json();
        } else {
          throw new Error("card failed");
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
        Informations bancaire
      </Typography>
      <Box
        noValidate
        // onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 5 }}>
          <Grid item xs={12}>
            <Typography> Nom de la carte :</Typography>
            <br />
            <TextField
              name="Nom"
              label="Mr John"
              type="name"
              id="name"
              autoComplete="new-name"
              onChange={(e) => setCardName(e.target.value)}
              fullWidth
            ></TextField>{" "}
          </Grid>
          <Grid item xs={12}>
            <Typography> Numéro de carte :</Typography>
            <br />
            <TextField
              name="cardnbr"
              label="0000 0000 0000 0000"
              type="number"
              id="cardnbr"
              autoComplete="new-cardnbr"
              onChange={(e) => setCardNumber(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography>Date d'éxpiration :</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              name="Month"
              label="MM"
              type="number"
              id="month"
              autoComplete="new-password"
              onChange={(e) => setCardDateMonth(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={5}>
            <TextField
              name="Year"
              label="AA"
              type="number"
              id="year"
              autoComplete="new-password"
              onChange={(e) => setCardDateYear(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={3}>
            <Typography> Cvv :</Typography>
            <br />
            <TextField
              name="cvv"
              label="***"
              type="number"
              id="cvv"
              autoComplete="new-password"
              onChange={(e) => setCardAdresse(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography>Adresse :</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Rue :</Typography>
            <br />
            <TextField
              name="Street"
              label="12 rue de gaulle"
              type="number"
              id="Street"
              autoComplete="new-street"
              onChange={(e) => setStreet(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <Typography>Département :</Typography>
            <br />
            <TextField
              name="Département"
              label="75"
              type="number"
              id="departement"
              autoComplete="departement"
              onChange={(e) => setState(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <Typography>Ville :</Typography>
            <br />
            <TextField
              name="City"
              label="Paris"
              id="city"
              autoComplete="new-city"
              onChange={(e) => setCity(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <Typography>Pays :</Typography>
            <br />
            <TextField
              name="country"
              label="France"
              id="country"
              autoComplete="new-country"
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <Typography>Code postal :</Typography>
            <br />
            <TextField
              name="postal"
              label="75001"
              type="number"
              id="postal"
              autoComplete="new-postal"
              onChange={(e) => setZip(e.target.value)}
              fullWidth
            ></TextField>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={4}>
            <Button
              style={{
                backgroundColor: "white",
                color: "orange",
                borderColor: "orange",
              }}
              fullWidth
              variant="outlined"
              onClick={setCard}
            >
              ajouter la carte
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function HandleCard() {
  const [isCardForm, setIsCardForm] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const setClick = () => {
    setDisplayForm(true);
    setIsCardForm(true);
  };
  return (
    <div>
      {!isCard ? (
        <div>
          {!isCardForm ? (
            <Button
              style={{
                color: "orange",
                marginLeft: 100,
                margingRight: 100,
                marginBottom: 10,
                borderColor: "orange",
              }}
              variant="outlined"
              onClick={setClick}
            >
              + Ajouter une carte
            </Button>
          ) : (
            <div></div>
          )}
          <div>
            {displayForm ? (
              <CardManager isCard={isCard} setIsCard={setIsCard}></CardManager>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ) : (
        <div>Vous avez une carte Enregistrer</div>
      )}
    </div>
  );
}
export default HandleCard;
