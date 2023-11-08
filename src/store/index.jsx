import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  searchInput: "",
  newNoteisCreated: false,
  noteIsDeleted: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    update: (state, action) => {
      state.searchInput = action.payload;
    },
    createNote: (state, action) => {
      state.newNoteisCreated = action.payload;
    },
    deleteNote: (state, action) => {
      state.noteIsDeleted = action.payload;
    },
  },
});

export const { update, createNote, deleteNote } = searchSlice.actions;

export const store = configureStore({
  reducer: searchSlice.reducer,
});
