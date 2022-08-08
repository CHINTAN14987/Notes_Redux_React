import { createSlice } from "@reduxjs/toolkit";

const initialState = { todoNotes: [], file: {} };
const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes: (state, action) => {
      state.todoNotes.push({
        title: action.payload.title,
        content: action.payload.content,
        file: action.payload.myfile,
        id: action.payload.id,
      });
    },
  },
});
export default notesSlice.reducer;
export const NotesActions = notesSlice.actions;
