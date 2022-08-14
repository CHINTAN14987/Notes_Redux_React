import { createSlice } from "@reduxjs/toolkit";

const initialState = { textColor: "", backgroundImage: "" };
const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    addColor: (state, action) => {
      state.textColor = action.payload;
    },
    addBackGround: (state, action) => {
      state.backgroundImage = action.payload;
    },
  },
});

export default styleSlice.reducer;
export const styleActions = styleSlice.actions;
