/* eslint-disable react-refresh/only-export-components */

import CardNote from "../components/CardNote";
import { useLoaderData } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";

function Notes() {
  const notes = useLoaderData();

  const searchInput = useSelector((state) => state.searchInput);
  const newNoteisCreated = useSelector((state) => state.newNoteisCreated);
  const noteIsDeleted = useSelector((state) => state.noteIsDeleted);

  const searchInputLength = searchInput.length;

  const [foundedNotes, setFoundedNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async (item) => {
      const res = await fetch(
        "https://notes-3r0s.onrender.com/notes?&q=" + item
      );

      const data = await res.json();
      return data;
    };

    fetchNotes(searchInput).then((data) => setFoundedNotes(data));
  }, [searchInput]);

  return (
    <>
      {newNoteisCreated && (
        <Notification
          message="success"
          text="New note is created successfully"
        />
      )}
      {noteIsDeleted && <Notification message="error" text="Note is deleted" />}

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 2, 1200: 3 }}>
        <Masonry gutter="10px">
          {searchInputLength === 0 &&
            notes.map((note) => <CardNote key={note.id} note={note} />)}
          {searchInputLength !== 0 &&
            foundedNotes.map((note) => <CardNote key={note.id} note={note} />)}

          {searchInputLength !== 0 && foundedNotes.length === 0 && (
            <Box sx={{ textAlign: "center", marginTop: "200px" }}>
              <Typography
                variant="h4"
                color="error"
                sx={{ marginBlock: "10px" }}
              >
                Nothing Found
              </Typography>
              <Typography variant="body2">
                Sorry, but nothing matched your search terms.
              </Typography>
              <Typography variant="body2">
                Please try again with some different keywords.
              </Typography>
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </Box>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
export default Notes;

export async function loader() {
  const res = await fetch(
    "https://notes-3r0s.onrender.com/notes?_sort=id&_order=desc"
  );
  const notes = await res.json();
  return notes;
}
