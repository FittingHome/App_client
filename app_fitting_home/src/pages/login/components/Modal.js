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
  modelImages,
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
  if (!modelImages) {
    return <div></div>;
  }
  const selectImg = (index) => {
    console.log(index);
    setImageSelected(true);
    setClickedIndex(index);
  };
  const url = "http://91.172.40.53:8080/user/create";

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
    console.log("model filename", clickedIndex.filename);
    localStorage.setItem("modelUser", JSON.stringify(clickedIndex));

    fetch("http://91.172.40.53:8080/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.ok) {
          console.log("is okk");
        } else {
          throw new Error("login failed");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        console.log("Success:", JSON.stringify(data));
        navigateRegister();
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
                Séléctionner le model qui vous correspond le plus:
              </Typography>

              <ImageList cols={3} rowHeight={164} marginTop={10}>
                {modelImages.map((item, index) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`http://91.172.40.53:8080/image?id=${item.filename}`}
                      srcSet={`http://91.172.40.53:8080/image?id=${item.filename}`}
                      crossOrigin="anonymous"
                      alt={item._id}
                      loading="lazy"
                      onClick={() => selectImg(item)}
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
