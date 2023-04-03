import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  backgroundColor: "#7C3E3D",
  border: "solid 1px",
  borderRadius: 6,
  "&:hover": {
    backgroundColor: "#7C3E3D",
  },
});

const FetchModelCarrousel = () => {};

export default function ModalSelect({
  credentials,
  handlePrev,
  navigateRegister,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    FetchModelCarrousel();
  };
  const handleClose = () => setOpen(false);
  const [isImageSelected, setImageSelected] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState(-1);
  const selectImg = (index) => {
    console.log(index);
    setImageSelected(true);
    setClickedIndex(index);
  };
  const url = "http://api.fittinghome.fr/user/create";

  function handleClick() {
    console.log("credentials", credentials);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(credentials.email, credentials.password),
    })
      .then((response) => {
        if (response.ok) {
          console.log("is okk");
        } else {
          throw new Error("login failed");
        }
      })
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("user", JSON.stringify(data));
        navigateRegister();
        // Add code here to store registration data in Local Storage
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("can't connect");
      });
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        {handlePrev ? (
          <LoginButton
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleOpen}
          >
            Continuer ?
          </LoginButton>
        ) : (
          <LoginButton
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleOpen}
            disabled
          >
            Continuer ?
          </LoginButton>
        )}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Séléctionner votre model :
              </Typography>

              <ImageList cols={3} rowHeight={164}>
                {itemData.map((item, index) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                      onClick={() => selectImg(index)}
                      style={
                        index === clickedIndex
                          ? { border: "4px solid blue", cursor: "pointer" }
                          : { border: "none", cursor: "pointer" }
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              {isImageSelected ? (
                <LoginButton
                  type="submit"
                  variant="contained"
                  onClick={handleClick}
                >
                  Continuer
                </LoginButton>
              ) : (
                <LoginButton type="submit" variant="contained" disabled>
                  Continuer
                </LoginButton>
              )}
              {/* <LoginButton
                type="submit"
                variant="contained"
                onClick={navigateRegister}
              >
                Continuer
              </LoginButton> */}
              {}
            </Box>
          </Fade>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
