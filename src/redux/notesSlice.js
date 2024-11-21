import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    updateNote: (state, action) => {
      const { id, title, content, password } = action.payload;
      const existingNote = state.find((note) => note.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.content = content;
        existingNote.password = password;
      }
    },
    deleteNote: (state, action) => {
      return state.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
