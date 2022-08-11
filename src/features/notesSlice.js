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
    // notesColor: (state, action) => {
    //   state.color = action.payload;
    // },
    // notesFontStyle: (state, action) => {
    //   state.fontType = action.payload;
    // },
    // noteBackground: (state, action) => {
    //   state.backgroundImage = action.payload;
    // },
    removeNotes: (state, action) => {
      state.todoNotes = state.todoNotes.filter(
        (item) => item.id !== action.payload
      );
    },
    updateNotes: (state, action) => {
      // console.log(
      //   abc.map((item) => {
      //     return item.title;
      //   }),
      //   "message"
      // );
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
      // map((item) => {
      //   if (item.id === action.payload.id) {
      //     console.log(item, "one");
      //     return (
      //        title=action.payload.title,
      //       content= action.payload.content,
      //       myfile=action.payload.file,
      //         id= action.payload.id,  )        }
      //     return {
      //       title: action.payload.title,
      //       content: action.payload.content,
      //       myfile: action.payload.file,
      //       id: action.payload.id,
      //     };
      //   }
      //   return state.todoNotes;
      // });
    },
  },
});
export default notesSlice.reducer;
export const NotesActions = notesSlice.actions;
