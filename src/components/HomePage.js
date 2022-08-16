import "../css/HomePage.css";
import { ImCheckboxChecked } from "react-icons/im";
import { BsPenFill } from "react-icons/bs";
import { AiFillFileAdd, AiOutlinePlus } from "react-icons/ai";
import { GiFiles } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesActions } from "../features/notesSlice";
import DisplayedNotes from "./DisplayedNotes.js";
import { Switch } from "antd";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { styleActions } from "../features/styleSlice";

const color = [
  "#ff0000",
  "#0000ff",
  "#3cb371",
  "#ffa500",
  "#ee82ee",
  "#6a5acd",
  "#000000",
];
const BackgroundImages = [
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=766&q=80",
];
const HomePage = () => {
  const [checkBoxActive, setCheckBoxActive] = useState(true);
  const [textColor, setTextColor] = useState(false);
  const [listName, setListName] = useState("");
  const [checked, setChecked] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [colorSelectedDisplay, setColorSelectedDisplay] = useState(false);
  const [imageSelector, setImageSelector] = useState(false);
  const [toggleBackgrounDColor, SetToggleBackGroundColor] = useState();
  const [progressValue, setProgressValue] = useState(false);
  const [imageBackGround, setImageBackGround] = useState("");

  const dispatch = useDispatch();

  const SelectedNotes = useSelector((state) => state.NotesReducer.todoNotes);
  const SelectedColor = useSelector((state) => state.styleReducer.textColor);

  const [preview, setPreview] = useState();
  useEffect(() => {
    function progress() {
      setProgressValue(false);
    }
    if (selectedFile) {
      setProgressValue(true);
      setTimeout(progress, 1500);
    }

    return () => {
      clearTimeout(progress);
    };
  }, [selectedFile]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    } else {
      const image = URL.createObjectURL(selectedFile);
      setPreview(image);
      // if (selectedFile.size <= 5 * 1000 * 1000) {
      //   toast.error("Image Added Sucessfully to the Gallery");
      // } else {
      //   toast.error("File too Big, please select a file less than 5mb");
      // }

      return () => URL.revokeObjectURL(image);
    }
  }, [selectedFile]);

  clearTimeout();
  const checkBoxHandler = () => {
    setCheckBoxActive(false);
  };

  const onChange = (checked) => {
    SetToggleBackGroundColor(checked);
  };
  const inputHandler = (e) => {
    setListName(e.target.value);
    if (e.target.value) {
      setChecked(!checked);
    } else {
      return;
    }
  };
  const closeFormHandler = () => {
    setListName("");
    setInputContent("");
    setSelectedFile(undefined);
    setCheckBoxActive(true);
    dispatch(styleActions.addColor(""));
    dispatch(styleActions.addBackGround(""));
  };

  const colorChooseHandler = (color) => {
    dispatch(styleActions.addColor(color));
    setColorSelectedDisplay(true);
    setTimeout(() => {
      setColorSelectedDisplay(false);
      setTextColor(false);
    }, 1000);
  };

  const inputContentHandler = (e) => {
    setInputContent(e.target.value);
  };
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    } else {
      setSelectedFile(e.target.files[0]);
    }
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
        filePreview: preview,
        flag: false,
      })
    );
    setListName("");
    setInputContent("");
    setCheckBoxActive(true);
    dispatch(styleActions.addBackGround(""));
    setPreview(undefined);
  };

  const imageHandler = () => {
    setImageSelector(!imageSelector);
  };

  const backgroundHandler = (i) => {
    dispatch(styleActions.addBackGround(i));
  };
  return (
    <div
      className="todo_container"
      style={
        toggleBackgrounDColor
          ? { backgroundColor: "#202124" }
          : { boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }
      }
    >
      <div className="switchContainer">
        <div
          className="modeWrapper"
          style={
            toggleBackgrounDColor
              ? { boxShadow: "#e8eaed 0px 5px 15px" }
              : { boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }
          }
        >
          {toggleBackgrounDColor ? (
            <p style={{ color: "rgb(232, 234, 237)" }}>
              Switch to Light Theme Mode
            </p>
          ) : (
            <p style={{ color: "grey" }}>Switch to Dark Theme Mode</p>
          )}
          <Switch onChange={onChange} />
        </div>
      </div>

      <div
        className="Todo_wrapper"
        style={
          toggleBackgrounDColor
            ? { boxShadow: "#e8eaed 0px 5px 15px" }
            : {
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                backgroundColor: "#fff",
              }
        }
      >
        {checkBoxActive ? (
          <>
            <div className="heading_wrapper">
              <h3
                style={
                  toggleBackgrounDColor
                    ? { color: "#e8eaed", fontWeight: "600" }
                    : { color: "grey", fontWeight: "600" }
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
                  <div className="checboxIcon_content">
                    Add Stylish Images to your Displayed Notes
                  </div>
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
                    : { color: "black" }
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
                        borderBottom: "2px solid black",
                      }
                }
              >
                {listName ? (
                  <>
                    <TiTick
                      style={
                        toggleBackgrounDColor
                          ? { color: "#e8eaed", marginRight: "5px" }
                          : { color: "black", marginRight: "5px" }
                      }
                      size="20px"
                    />
                  </>
                ) : (
                  <AiOutlinePlus
                    style={
                      toggleBackgrounDColor
                        ? { color: "#e8eaed", marginRight: "5px" }
                        : { color: "black", marginRight: "5px" }
                    }
                    size="15px"
                  />
                )}

                {
                  <input
                    className="input_NameList"
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
              {SelectedNotes ? (
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
                              borderBottom: "2px solid black",
                            }
                      }
                    >
                      <label
                        style={
                          toggleBackgrounDColor
                            ? { color: "#e8eaed" }
                            : { color: "black" }
                        }
                      >
                        Content
                      </label>
                      <div className="textArea_Input">
                        <TextareaAutosize
                          type="text"
                          className="content"
                          onChange={inputContentHandler}
                          row={1}
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
                    <div
                      className="inputFileWrapper"
                      style={
                        toggleBackgrounDColor
                          ? {
                              borderBottom: "2px solid rgb(232, 234, 237)",
                            }
                          : {
                              borderBottom: "2px solid black",
                            }
                      }
                    >
                      <div
                        className="filebutton"
                        style={
                          toggleBackgrounDColor
                            ? {
                                backgroundColor: "rgb(232, 234, 237)",
                              }
                            : {
                                backgroundColor: "black",
                              }
                        }
                      >
                        <GiFiles
                          className="fileIcon"
                          size="25px"
                          fill={
                            toggleBackgrounDColor ? " rgb(32, 33, 36)" : "#fff"
                          }
                        />
                        <input
                          type="file"
                          name="image-uploader"
                          onChange={onSelectFile}
                          id="image-uploader"
                          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf, image/*, video/*, audio/*"
                          className={`inputfile ${
                            toggleBackgrounDColor ? "inputfilebutton" : ""
                          }`}
                        />
                      </div>

                      {progressValue ? (
                        <div className="progressWrapper">
                          <TiTick
                            style={
                              toggleBackgrounDColor
                                ? { color: "#e8eaed", marginRight: "5px" }
                                : { color: "black", marginRight: "5px" }
                            }
                            size="30px"
                          />
                          <span
                            style={
                              toggleBackgrounDColor
                                ? { color: "#e8eaed", marginRight: "5px" }
                                : { color: "black", marginRight: "5px" }
                            }
                          >
                            File Uploaded Successfully
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
        {!checkBoxActive && (
          <div
            className="button_wrapper"
            style={
              toggleBackgrounDColor
                ? {
                    borderBottom: "2px solid rgb(232, 234, 237)",
                  }
                : {
                    borderBottom: "2px solid black",
                  }
            }
          >
            {
              <button
                className="submitHandler"
                onClick={submitHandler}
                style={
                  toggleBackgrounDColor
                    ? {
                        backgroundColor: "rgb(32, 33, 36)",
                        color: "#e8eaed",
                        border: " 2px solid #e8eaed",
                      }
                    : {
                        backgroundColor: "black",
                        color: "white",
                      }
                }
              >
                Submit
              </button>
            }
            <span
              className="closeButton"
              onClick={closeFormHandler}
              style={
                toggleBackgrounDColor
                  ? { color: "#e8eaed" }
                  : { color: "black" }
              }
            >
              Close
            </span>
          </div>
        )}
      </div>
      <DisplayedNotes toggleBackgrounDColor={toggleBackgrounDColor} />
    </div>
  );
};

export default HomePage;
