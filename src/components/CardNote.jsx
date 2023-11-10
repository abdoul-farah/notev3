/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNoteIcon from "@mui/icons-material/EditNote";

import ConfirmDialog from "./ConfirmDialog";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectNote } from "../store/index";
import { Navigate, useNavigate } from "react-router-dom";
import { CardActions } from "@mui/material";

function CardNote({ note }) {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const deletCardHandler = async (id) => {
    setConfirmDialog({ isOpen: true });
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
      <Card variant="outlined" sx={{ "&:hover": { bgcolor: "action.hover" } }}>
        <CardHeader
          sx={{ color: bColor }}
          action={
            <IconButton onClick={() => deletCardHandler(note.id)}>
              <DeleteOutlineOutlinedIcon />
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
        <CardActions disableSpacing>
          <IconButton
            onClick={() => {
              // console.log(note.id);
              dispatch(selectNote(note));
              navigate("/update");
            }}
          >
            <EditNoteIcon />
          </IconButton>
        </CardActions>
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
