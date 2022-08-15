import { createSlice } from "@reduxjs/toolkit";

const initialState = { todoNotes: [] };

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes: (state, action) => {
      state.todoNotes.push(action.payload);

      return state;
    },

    removeNotes: (state, action) => {
      const data = state.todoNotes.filter((item) => item.id !== action.payload);
      console.log(data);
      state.todoNotes = data;
    },
    updateNotes: (state, action) => {
      const updatedData = state.todoNotes.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload.data,
          };
        } else {
          return item;
        }
      });
      state.todoNotes = updatedData;
      return state;
    },
    pinNotes: (state, action) => {
      const Data = state.todoNotes.filter((item) => item.id !== action.payload);
      const Data1 = state.todoNotes.filter(
        (item) => item.id === action.payload
      );

      state.todoNotes = [...Data1, ...Data];
      return state;
    },
  },
});
export default notesSlice.reducer;
export const NotesActions = notesSlice.actions;
