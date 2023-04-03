import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({});
const CustomAlert = styled(MuiAlert)({
  width: 250,

  "@media (min-width:600px)": {
    width: 300,
  },
  [theme.breakpoints.up("md")]: {
    width: 360,
  },
});

function AlertInfo(opener) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    opener.setOpen(false);
  };

  return (
    <Snackbar open={opener.open} autoHideDuration={3000} onClose={handleClose}>
      <CustomAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="info"
      >
        {opener.text}
      </CustomAlert>
    </Snackbar>
  );
}

export default AlertInfo;
