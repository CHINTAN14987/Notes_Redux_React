import React, { createRef, useRef } from "react";
import "../css/HomePage.css";
import { ImCheckboxChecked } from "react-icons/im";
import { BsPenFill } from "react-icons/bs";
import { AiFillFileAdd, AiOutlinePlus } from "react-icons/ai";
import { GiCrossMark } from "react-icons/gi";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesActions } from "../features/notesSlice";

import DisplayedNotes from "./DisplayedNotes.js";

const color = [
  "#ff0000",
  "#0000ff",
  "#3cb371",
  "#ffa500",
  "#ee82ee",
  "#6a5acd",
];

const HomePage = () => {
  const [checkBoxActive, setCheckBoxActive] = useState(true);
  const [textColor, setTextColor] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [listName, setListName] = useState("");
  const [checked, setChecked] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [colorSelectedDisplay, setColorSelectedDisplay] = useState(false);

  const dispatch = useDispatch();
  const selectedState = useSelector((state) => state.NotesReducer.todoNotes);
  const SelectedColor = useSelector((state) => state.NotesReducer.color);

  const checkBoxHandler = () => {
    setCheckBoxActive(false);
  };
  const inputVisibilityhandler = () => {
    setInputVisible(!inputVisible);
  };
  const inputHandler = (e) => {
    setListName(e.target.value);
  };
  const CheckBoxStateHandler = () => {
    setChecked(!checked);
  };

  const cancelHandler = () => {
    setCheckBoxActive(true);
  };
  const colorChooseHandler = (color) => {
    dispatch(NotesActions.notesColor(color));
    setColorSelectedDisplay(true);
    setTimeout(() => {
      setColorSelectedDisplay(false);
      setTextColor(false);
    }, 1000);
  };
  const inputContentHandler = (e) => setInputContent(e.target.value);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };
  const textColorHandler = () => {
    setTextColor(!textColor);
  };
  const submitHandler = () => {
    dispatch(
      NotesActions.addNotes({
        title: listName,
        content: inputContent,
        myfile: selectedFile,
        id: new Date().getTime(),
      })
    );
  };
  return (
    <div className="todo_container">
      <div className="Todo_wrapper">
        {console.log(SelectedColor)}
        {!checkBoxActive && (
          <GiCrossMark
            className="cancelbutton"
            size="18px"
            fill="grey"
            onClick={cancelHandler}
          />
        )}
        {checkBoxActive ? (
          <>
            <div className="heading_wrapper">
              <h3>Take Notes...!</h3>
              <div className="Todo_icon">
                <div className="boxIcon">
                  <ImCheckboxChecked
                    fill="black"
                    size="20px"
                    onClick={checkBoxHandler}
                  />
                  <div className="checboxIcon_content">New List</div>
                </div>
                <div className="boxIcon">
                  <BsPenFill
                    fill="black"
                    size="20px"
                    onClick={textColorHandler}
                  />
                  <div className="checboxIcon_content">Pen Text Color</div>
                </div>
                <div className="boxIcon">
                  <AiFillFileAdd fill="black" size="20px" />
                  <div className="checboxIcon_content">New Note with Image</div>
                </div>
              </div>
            </div>
            {textColor && (
              <div className="color_wrapper_outer_container">
                <div className="colorBox">
                  {color.map((item, index) => {
                    return (
                      <button
                        className="box"
                        key={index}
                        style={{
                          backgroundColor: item,
                          width: "1.5rem",
                          height: "1.5rem",
                        }}
                        onClick={(e) => {
                          let color = e.target.style.backgroundColor;
                          colorChooseHandler(color);
                        }}
                      ></button>
                    );
                  })}
                </div>
                {colorSelectedDisplay && (
                  <span className="messageColorSelected">
                    Color is Selected
                  </span>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <h3 className="card_title">Title</h3>
              <div className="input_wrapper">
                {listName ? (
                  <>
                    <input
                      type="checkbox"
                      value={checked}
                      onChange={CheckBoxStateHandler}
                      className="checkbox"
                    />
                  </>
                ) : (
                  <AiOutlinePlus onClick={inputVisibilityhandler} />
                )}

                {
                  <input
                    className="input_NameList"
                    placeholder="List Name"
                    value={listName}
                    type="text"
                    onChange={inputHandler}
                    style={{ color: SelectedColor }}
                  />
                }
              </div>
              <div className="border"></div>
              {selectedState ? (
                <>
                  <div className="form_content">
                    <div className="content_wrapper">
                      <label>Content</label>
                      <textarea
                        type="text"
                        className="content"
                        placeholder="Lorem-ipsum"
                        onChange={inputContentHandler}
                        value={inputContent}
                        style={{ color: SelectedColor }}
                      />
                    </div>

                    <div className="border"></div>
                    <input
                      type="file"
                      name="image-uploader"
                      onChange={onSelectFile}
                      id="image-uploader"
                      multiple
                      className="inputfile"
                    />

                    <div className="border"></div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
        {!checkBoxActive && (
          <button className="submitHandler" onClick={submitHandler}>
            Submit
          </button>
        )}
      </div>
      <DisplayedNotes />
    </div>
  );
};

export default HomePage;
