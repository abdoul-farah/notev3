import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNote, deleteNote } from "../store/index";
function Create() {
  const [newNote, setNewNote] = useState({
    title: "",
    details: "",
    category: "Todo",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(newNote);
    setIsLoading(true);
    const res = await fetch("https://notes-3r0s.onrender.com/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });
    setIsLoading(false);
    dispatch(deleteNote(false));
    dispatch(createNote(true));
    navigate("/");
  };
  return (
    <form onSubmit={submitHandler} id="form">
      <Stack spacing={2} sx={{ maxWidth: "700px" }}>
        <TextField
          label="Title"
          fullWidth
          required
          value={newNote.title}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextField
          id="outlined-multiline-static"
          label="Note"
          multiline
          rows={5}
          fullWidth
          required
          value={newNote.details}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, details: e.target.value }))
          }
        />

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={newNote.category}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, category: e.target.value }))
          }
          required
        >
          <FormControlLabel value="Todo" control={<Radio />} label="Todo" />
          <FormControlLabel
            value="Shopping"
            control={<Radio />}
            label="Shopping"
          />
          <FormControlLabel value="Work" control={<Radio />} label="Work" />
        </RadioGroup>

        <Button type="submit" variant="contained" sx={{ width: { sm: 200 } }}>
          {isLoading ? "submitting" : "submit"}
        </Button>
      </Stack>
    </form>
  );
}

export default Create;
