import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNote, deleteNote, updateNote } from "../store/index";
function Update() {
  const selectedNote = useSelector((state) => state.selectedNote);
  console.log(selectedNote);

  const [updatedNote, setUpdatedNote] = useState({
    id: selectedNote.id,
    title: selectedNote.title,
    details: selectedNote.details,
    category: selectedNote.category,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const selectedNote = useSelector((state) => state.selectedNote);
  // console.log(selectedNote);

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const res = await fetch(
      "https://vercel-api-ruddy.vercel.app/notes/" + selectedNote.id,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
      }
    );
    setIsLoading(false);

    dispatch(updateNote(true));

    dispatch(deleteNote(false));
    dispatch(createNote(false));
    navigate("/");
  };
  return (
    <>
      <form onSubmit={submitHandler} name="form">
        <Stack spacing={2} sx={{ maxWidth: "700px" }}>
          <TextField
            name="Title"
            label="Title"
            fullWidth
            required
            defaultValue={selectedNote.title}
            onChange={(e) =>
              setUpdatedNote((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <TextField
            name="note"
            id="outlined-multiline-static"
            label="Note"
            multiline
            rows={5}
            fullWidth
            required
            defaultValue={selectedNote.details}
            onChange={(e) =>
              setUpdatedNote((prev) => ({ ...prev, details: e.target.value }))
            }
          />

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue={selectedNote.category}
            required
            onChange={(e) =>
              setUpdatedNote((prev) => ({ ...prev, category: e.target.value }))
            }
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
            {isLoading ? "Updating" : "Update"}
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default Update;
