/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";


import ConfirmDialog from "./ConfirmDialog";

import { useState } from "react";

function CardNote({ note }) {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });

  const deletCardHandler = async (id) => {
    setConfirmDialog({ isOpen: true });
    // if (confirm(`Are you sure you want to delete "${note.title}" ?`)) {
    //   const res = await fetch("https://notes-3r0s.onrender.com/notes/" + id, {
    //     method: "DELETE",
    //   });

    //   navigate("/");
    //   dispatch(update(""));
    // }
  };
  let bColor;
  switch (note.category) {
    case "Todo":
      bColor = "#0092ca";
      break;

    case "Shopping":
      bColor = "#dc2f2f";
      break;
    case "Work":
      bColor = "#a2c11c";
      break;

    default:
      break;
  }
  return (
    <>
      <Card
        variant="outlined"
        sx={{ borderColor: bColor, "&:hover": { bgcolor: "action.hover" } }}
      >
        <CardHeader
          sx={{ color: bColor }}
          action={
            <IconButton onClick={() => deletCardHandler(note.id)}>
              <MoreVertIcon />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        id={note.id}
      />
    </>
  );
}

export default CardNote;
