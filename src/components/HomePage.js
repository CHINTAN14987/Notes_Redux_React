import "../css/HomePage.css";
import { ImCheckboxChecked } from "react-icons/im";
import { BsPenFill } from "react-icons/bs";
import { AiFillFileAdd, AiOutlinePlus } from "react-icons/ai";
import { TiCancel } from "react-icons/ti";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesActions } from "../features/notesSlice";
import DisplayedNotes from "./DisplayedNotes.js";
import { Switch } from "antd";
import React from "react";

const color = [
  "#ff0000",
  "#0000ff",
  "#3cb371",
  "#ffa500",
  "#ee82ee",
  "#6a5acd",
];
const BackgroundImages = [
  "https://www.solidbackgrounds.com/images/1920x1080/1920x1080-bright-green-solid-color-background.jpg",
  "https://htmlcolorcodes.com/assets/images/colors/canary-yellow-color-solid-background-1920x1080.png",
  "https://htmlcolorcodes.com/assets/images/colors/aqua-color-solid-background-1920x1080.png",
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=766&q=80",
  "https://wallpapercave.com/dwp1x/wp2646216.jpg",
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
  const [imageSelector, setImageSelector] = useState(false);
  const [toggleBackgrounDColor, SetToggleBackGroundColor] = useState();

  const dispatch = useDispatch();
  const selectedState = useSelector((state) => state.NotesReducer.todoNotes);
  const SelectedColor = useSelector((state) => state.NotesReducer.color);

  const checkBoxHandler = () => {
    setCheckBoxActive(false);
  };
  const inputVisibilityhandler = () => {
    setInputVisible(!inputVisible);
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    SetToggleBackGroundColor(checked);
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
  const imageHandler = () => {
    setImageSelector(!imageSelector);
  };

  const backgroundHandler = (i) => {
    dispatch(NotesActions.noteBackground(i));
  };
  return (
    <div
      className="todo_container"
      style={
        toggleBackgrounDColor
          ? { backgroundColor: "#202124" }
          : { backgroundColor: "white" }
      }
    >
      <Switch onChange={onChange} />

      <div
        className="Todo_wrapper"
        style={
          toggleBackgrounDColor
            ? { border: " 1px solid #e8eaed" }
            : { border: " 1px white" }
        }
      >
        {!checkBoxActive && (
          <TiCancel
            className="cancelbutton"
            size="25px"
            fill={toggleBackgrounDColor ? " #e8eaed" : "grey"}
            onClick={cancelHandler}
          />
        )}
        {checkBoxActive ? (
          <>
            <div className="heading_wrapper">
              <h3
                style={
                  toggleBackgrounDColor
                    ? { color: "#e8eaed" }
                    : { color: "grey" }
                }
              >
                Take Notes...!
              </h3>
              <div className="Todo_icon">
                <div className="boxIcon">
                  <ImCheckboxChecked
                    fill={toggleBackgrounDColor ? " #e8eaed" : "grey"}
                    size="20px"
                    onClick={checkBoxHandler}
                  />
                  <div className="checboxIcon_content">New List</div>
                </div>
                <div className="boxIcon">
                  <BsPenFill
                    fill={toggleBackgrounDColor ? " #e8eaed" : "grey"}
                    size="20px"
                    onClick={textColorHandler}
                  />
                  <div className="checboxIcon_content">Pen Text Color</div>
                </div>
                <div className="boxIcon">
                  <AiFillFileAdd
                    fill={toggleBackgrounDColor ? " #e8eaed" : "grey"}
                    size="20px"
                    onClick={imageHandler}
                  />
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
            {imageSelector ? (
              <div className="backgroundImages_wrapper">
                {BackgroundImages.map((item, index) => {
                  return (
                    <img
                      style={{ border: "2px solid #F1F1F1" }}
                      key={index}
                      src={item}
                      onClick={() => {
                        backgroundHandler(item);
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div>
              <label
                className="card_title"
                style={
                  toggleBackgrounDColor
                    ? { color: "#e8eaed" }
                    : { color: "grey" }
                }
              >
                Title
              </label>
              <div
                className="input_wrapper"
                style={
                  toggleBackgrounDColor
                    ? {
                        borderBottom: "2px solid rgb(232, 234, 237)",
                      }
                    : {
                        borderBottom: "2px solid red",
                      }
                }
              >
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
                  <AiOutlinePlus
                    style={
                      toggleBackgrounDColor
                        ? { color: "#e8eaed" }
                        : { color: "grey" }
                    }
                    size="25px"
                    onClick={inputVisibilityhandler}
                  />
                )}

                {
                  <input
                    className="input_NameList"
                    placeholder="List Name"
                    value={listName}
                    type="text"
                    onChange={inputHandler}
                    style={
                      toggleBackgrounDColor
                        ? {
                            color: "#e8eaed",
                          }
                        : {
                            color: SelectedColor,

                            fontWeight: "600",
                          }
                    }
                  />
                }
              </div>
              {selectedState ? (
                <>
                  <div className="form_content">
                    <div
                      className="content_wrapper"
                      style={
                        toggleBackgrounDColor
                          ? {
                              borderBottom: "2px solid rgb(232, 234, 237)",
                            }
                          : {
                              borderBottom: "2px solid red",
                            }
                      }
                    >
                      <label
                        style={
                          toggleBackgrounDColor
                            ? { color: "#e8eaed" }
                            : { color: "grey" }
                        }
                      >
                        Content
                      </label>
                      <div className="textArea_Input">
                        <textarea
                          type="text"
                          className="content"
                          placeholder="Lorem-ipsum"
                          onChange={inputContentHandler}
                          value={inputContent}
                          style={
                            toggleBackgrounDColor
                              ? { color: "#e8eaed" }
                              : {
                                  color: SelectedColor,
                                }
                          }
                        />
                      </div>
                    </div>

                    <input
                      type="file"
                      name="image-uploader"
                      onChange={onSelectFile}
                      id="image-uploader"
                      multiple
                      className={`inputfile ${
                        toggleBackgrounDColor ? "inputfilebutton" : ""
                      }`}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
        {!checkBoxActive && (
          <button
            className="submitHandler"
            onClick={submitHandler}
            style={
              toggleBackgrounDColor
                ? { backgroundColor: "black", color: "#e8eaed" }
                : { backgroundColor: "red", color: "grey" }
            }
          >
            Submit
          </button>
        )}
      </div>
      <DisplayedNotes toggleBackgrounDColor={toggleBackgrounDColor} />
    </div>
  );
};

export default HomePage;
