import { Container, Grid, TextField, Typography } from "@mui/material";
import { Box, color } from "@mui/system";
import Button from "@mui/material/Button";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalDelete({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Supprimer le compte ?
        </Typography>
        <br></br>

        <Grid item xs={12}>
          <Grid item xs={4}>
            <Button
              onClick={handleClose}
              variant="outlined"
              type="submit"
              style={{
                backgroundColor: "white",
                color: "black",
                borderColor: "black",
              }}
              fullWidth
            >
              Retour
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button
              // onClick={handleOpenDelet}
              style={{
                backgroundColor: "white",
                color: "red",
                borderColor: "red",
                marginTop: 10,
              }}
              fullWidth
              variant="outlined"
            >
              Supprimer le compte
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
