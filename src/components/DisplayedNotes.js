import React from "react";
import { useSelector } from "react-redux";
import "../css/DisplayedNotes.css";

const DisplayedNotes = () => {
  const TaskResults = useSelector((state) => state.NotesReducer.todoNotes);
  return (
    <div className="displayed_wrapper">
      {console.log(TaskResults)}
      {TaskResults?.map((item) => {
        const { content, file, title, id } = item;
        return (
          <div key={id} className="DisplayedItem">
            <h3>{title}</h3>
            <p className="content">{content}</p>
            {file && <p>{file.name}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayedNotes;
