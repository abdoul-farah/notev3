/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { createNote, deleteNote } from "../store/index";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

function Notification({ message, text }) {
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(createNote(false));
    dispatch(deleteNote(false));
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={message}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={TransitionDown}
      >
        <Alert severity={message}>{text}</Alert>
      </Snackbar>
    </Box>
  );
}

export default Notification;
