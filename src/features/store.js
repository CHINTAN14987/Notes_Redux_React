import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./notesSlice";
import styleReducer from "./styleSlice";

const store = configureStore({
  reducer: { NotesReducer, styleReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
