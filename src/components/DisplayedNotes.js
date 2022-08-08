import React from "react";
import { useSelector } from "react-redux";

const DisplayedNotes = () => {
  const TaskResults = useSelector((state) => state.NotesReducer.todoNotes);
  return <div>{TaskResults?.map((item) => {})}</div>;
};

export default DisplayedNotes;
