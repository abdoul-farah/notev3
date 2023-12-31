import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNote, deleteNote, updateNote } from "../store/index";
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

    setIsLoading(true);
    const res = await fetch("https://vercel-api-ruddy.vercel.app/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });
    setIsLoading(false);
    dispatch(deleteNote(false));
    dispatch(updateNote(false));
    dispatch(createNote(true));
    navigate("/");
  };
  return (
    <form onSubmit={submitHandler} name="form">
      <Stack spacing={2} sx={{ maxWidth: "700px" }}>
        <TextField
          name="Title"
          label="Title"
          fullWidth
          required
          value={newNote.title}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextField
          name="note"
          id="outlined-multiline-static"
          label="Note"
          multiline
          rows={8}
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
          <FormControlLabel
            value="Todo"
            control={<Radio />}
            label="Todo"
            id="Todo"
          />
          <FormControlLabel
            value="Shopping"
            control={<Radio />}
            label="Shopping"
            id="Shopping"
          />
          <FormControlLabel
            value="Work"
            control={<Radio />}
            label="Work"
            id="Work"
          />
        </RadioGroup>

        <Button type="submit" variant="contained" sx={{ width: { sm: 200 } }}>
          {isLoading ? "submitting" : "submit"}
        </Button>
      </Stack>
    </form>
  );
}

export default Create;
