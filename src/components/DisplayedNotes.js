import React, { useState } from "react";
import "../css/DisplayedNotes.css";
import { FaBold } from "react-icons/fa";
import { BiItalic } from "react-icons/bi";
import { AiOutlineUnderline } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const DisplayedNotes = () => {
  const TaskResults = useSelector((state) => state.NotesReducer.todoNotes);
  const SelectedColor = useSelector((state) => state.NotesReducer.color);
  const SelectedBackgroundImage = useSelector(
    (state) => state.NotesReducer.backgroundImage
  );
  const [iconSelector, setIconSelector] = useState(false);

  const selectedfont = useSelector((state) => state.NotesReducer.fontType);

  const boldFontHandler = () => {
    // dispatch(NotesActions.notesFontStyle("800"));
  };
  return (
    <div className="displayed_wrapper">
      {TaskResults?.map((item) => {
        const { content, file, title, id } = item;
        return (
          <div
            key={id}
            className="DisplayedItem"
            style={{ backgroundImage: `url(${SelectedBackgroundImage})` }}
          >
            {console.log(item)}
            {console.log(SelectedBackgroundImage, "one")}
            <div className="textEditor_Icons">
              <span
                className="texteditor"
                onClick={(e) => {
                  setIconSelector(true);
                }}
              >
                <FaBold />
              </span>
              <span className="texteditor">
                <BiItalic size="20px" />
              </span>
              <span className="texteditor">
                <AiOutlineUnderline size="20px" />
              </span>
            </div>
            {console.log(SelectedColor)}
            <h3
              style={{
                color: SelectedColor,
                fontSize: "20px",
                fontWeight: selectedfont,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                color: SelectedColor,
                fontSize: "20px",
                fontWeight: selectedfont,
              }}
              className="content"
            >
              {content}
            </p>
            {file && <p>{file.name}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayedNotes;
