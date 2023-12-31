import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  searchInput: "",
  newNoteisCreated: false,
  noteIsDeleted: false,
  noteIsUpdated: false,
  selectedNote: { title: "", details: "", id: "" },
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
    selectNote: (state, action) => {
      state.selectedNote = action.payload;
    },
    updateNote: (state, action) => {
      state.noteIsUpdated = action.payload;
    },
  },
});

export const { update, createNote, deleteNote, selectNote, updateNote } =
  searchSlice.actions;

export const store = configureStore({
  reducer: searchSlice.reducer,
});
