import { createSlice } from "@reduxjs/toolkit";

const initialState = { todoNotes: [], color: "" };
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
    notesColor: (state, action) => {
      state.color = action.payload;
    },
  },
});
export default notesSlice.reducer;
export const NotesActions = notesSlice.actions;
