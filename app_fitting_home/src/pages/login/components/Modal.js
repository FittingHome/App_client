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
    img: "http://91.172.40.53:8080/image?id=cc3df74f-93f1-4bb0-9260-050acf35e665",
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

  function getAllModels() {
    fetch("http://91.172.40.53:8080/morphology/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => {
        console.error("Error:", error);
        console.log("can't connect to api");
      });
  }
  getAllModels();
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
                      src={`${item.img}`}
                      srcSet={`${item.img}`}
                      crossOrigin="anonymous"
                      alt={item.title}
                      loading="lazy"
                      onClick={() => selectImg(index)}
                      style={
                        index === clickedIndex
                          ? {
                              width: 100,
                              border: "4px solid blue",
                              cursor: "pointer",
                            }
                          : { width: 100, border: "none", cursor: "pointer" }
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
            </Box>
          </Fade>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
