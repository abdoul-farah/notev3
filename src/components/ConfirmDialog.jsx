/* eslint-disable react/prop-types */

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningIcon from "@mui/icons-material/Warning";
import { useDispatch } from "react-redux";
import { update, deleteNote, createNote } from "../store/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Notification from "./Notification";

export default function ConfirmDialog(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { confirmDialog, setConfirmDialog, id } = props;
  console.log(id);

  const handleClose = () => {
    setConfirmDialog({ isOpen: false });
  };

  const deleteHandler = async (id) => {
    const res = await fetch("https://notes-3r0s.onrender.com/notes/" + id, {
      method: "DELETE",
    });

    // dispatch(update(""));

    dispatch(deleteNote(true));
    dispatch(createNote(false));
    navigate("/");
  };
  return (
    <>
      <Dialog
        open={confirmDialog.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ padding: "50px" }}
      >
        <DialogTitle id="alert-dialog-title">Confirm Note Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteHandler(id)}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
