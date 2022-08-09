import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoNotes: [],
  color: "",
  fontType: "",
  backgroundImage: "",
};
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
    notesFontStyle: (state, action) => {
      state.fontType = action.payload;
    },
    noteBackground: (state, action) => {
      state.backgroundImage = action.payload;
    },
  },
});
export default notesSlice.reducer;
export const NotesActions = notesSlice.actions;
