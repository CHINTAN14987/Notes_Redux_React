import React, { useState } from "react";
import "../css/DisplayedNotes.css";
import { FaBold } from "react-icons/fa";
import { BiItalic } from "react-icons/bi";
import {
  AiOutlineUnderline,
  AiFillDelete,
  AiFillPushpin,
} from "react-icons/ai";
import { IoIosColorFill } from "react-icons/io";
import { ImFont } from "react-icons/im";
import Portal from "./Portal";
import { TiTick } from "react-icons/ti";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { NotesActions } from "../features/notesSlice";

const DisplayedNotes = ({ toggleBackgrounDColor }) => {
  const TaskResults = useSelector((state) => state.NotesReducer.todoNotes);
  const SelectedColor = useSelector((state) => state.styleReducer.textColor);
  let dispatch = useDispatch();
  const [iconSelector, setIconSelector] = useState(false);
  const [fontSelector, setFontSelector] = useState(false);
  const [boldSelect, setBoldSelect] = useState(false);
  const [italicSelect, setItalicSelect] = useState(false);
  const [underlineSelect, setUnderLineSelect] = useState(false);
  const [iconActive, setIconActive] = useState(false);
  const [iconInActive, setIconInActive] = useState(false);
  const [editSuccessful, setEditSuccessful] = useState(false);
  const [itemID, setItemID] = useState(null);
  const [itemID1, setItemID1] = useState(null);
  const [itemID2, setItemID2] = useState(null);
  const [openPortal, setOpenPortal] = useState(false);
  const [iconRotate, setIconRotate] = useState(false);

  const selectedBackgrounDImage = useSelector(
    (state) => state.styleReducer.backgroundImage
  );
  const updatedData = useSelector((state) => state.NotesReducer.todoNotes);

  const color = [
    "#ff0000",
    "#0000ff",
    "#3cb371",
    "#ffa500",
    "#ee82ee",
    "#6a5acd",
  ];
  const fontSizes = [10, 12, 14, 16, 18, 20, 22, 24];
  const imageClickHandler = () => {
    setOpenPortal(true);
  };

  const colorChooseHandler = (item, id) => {
    const myElement = document.getElementById(id);

    myElement.style.backgroundColor = item;
    myElement.style.backgroundImage = "";
  };

  const boldTextHandler = (id) => {
    const myElement = document.getElementById(id).childNodes;

    setBoldSelect(!boldSelect);
    if (boldSelect) {
      myElement[2].style.fontWeight = "normal";
    } else {
      myElement[2].style.fontWeight = "900";
    }
  };

  const italicFontHandler = (id) => {
    setItalicSelect(!italicSelect);
    const myElement = document.getElementById(id).childNodes;
    myElement[2].style.fontStyle = "italic";

    if (italicSelect) {
      myElement[2].style.fontStyle = "normal";
    }
  };
  const underLineFontHandler = (id) => {
    setUnderLineSelect(!underlineSelect);
    const myElement = document.getElementById(id).childNodes;

    if (underlineSelect) {
      myElement[2].style.textDecoration = "none";
    } else {
      if (toggleBackgrounDColor) {
        console.log(toggleBackgrounDColor);
        myElement[2].style.textDecoration = "underline";
        myElement[2].style.textDecorationColor = "#e8eaed";
      }
      if (!toggleBackgrounDColor) {
        myElement[2].style.textDecoration = "underline";
        myElement[2].style.textDecorationColor = "black";
      }
    }
  };

  const colorHandler = (id) => {
    setItemID(id);
    setIconSelector(!iconSelector);
  };
  const fontSelectorHandler = (id, item) => {
    const nodes1 = document.getElementById(id).querySelectorAll("h3")[0];
    const nodes2 = document.getElementById(id).querySelectorAll("p")[0];
    // console.log(nodes1);
    nodes1.style.fontSize = item * 1.5 + "px";
    nodes2.style.fontSize = item * 1.5 + "px";
  };
  const IconActiveHandler = (id) => {
    console.log(id);
    setItemID2(id);
    console.log(itemID2 === id);
    setIconActive(true);
    setEditSuccessful(true);
    setIconInActive(false);
  };
  const IconInActiveHandler = () => {
    setEditSuccessful(false);
    setIconActive(false);
    setIconInActive(true);
  };
  const inputHandler = (e, id, Taskitem) => {
    dispatch(
      NotesActions.updateNotes({
        data: {
          title: e,
        },
        id: id,
        filePreview: Taskitem.filePreview,
        myfile: Taskitem.myfile,
      })
    );
  };
  const inputHandler1 = (e, id, Taskitem) => {
    dispatch(
      NotesActions.updateNotes({
        data: {
          content: e,
        },
        id: id,
        myfile: Taskitem.myfile,
        filePreview: Taskitem.filePreview,
      })
    );
  };

  const fontactiveHandler = (id) => {
    setItemID1(id);
    setFontSelector(!fontSelector);
  };
  const deleteHandler = (i) => {
    dispatch(NotesActions.removeNotes(i));
  };

  const DisplayedItemColor = () => {
    if (SelectedColor) {
      return SelectedColor;
    }
    if (selectedBackgrounDImage) {
      return "white";
    } else {
      return "black";
    }
  };
  const pinhandler = (id) => {
    setItemID2(id);
    setIconRotate(!iconRotate);
    dispatch(NotesActions.pinNotes(id));
  };
  const stringtruncate = (name) => {
    return name.slice(0, name.indexOf("."));
  };
  return (
    <div className="displayed_wrapper">
      {TaskResults?.map((Taskitem) => {
        const { content, myfile, title, id, filePreview } = Taskitem;

        return (
          <div
            key={id}
            className="DisplayedItem"
            id={`${id}`}
            style={
              toggleBackgrounDColor
                ? {
                    border: "2px solid #e8eaed",
                    backgroundImage: `url(${selectedBackgrounDImage})`,
                  }
                : { backgroundImage: `url(${selectedBackgrounDImage})` }
            }
          >
            {console.log(updatedData, "One")}
            <div className="deletePinIcon_Wrapper">
              <AiFillDelete
                size="20px"
                fill={toggleBackgrounDColor ? " #e8eaed" : "black"}
                className="deleteIcon"
                onClick={() => {
                  deleteHandler(id);
                }}
              />
              <AiFillPushpin
                size="20px"
                className={`pinIcon ${
                  iconRotate && itemID2 === id ? "pinDown" : ""
                }`}
                fill={toggleBackgrounDColor ? " #e8eaed" : "black"}
                onClick={() => {
                  pinhandler(id);
                }}
                style={
                  iconRotate && itemID2 === id
                    ? { fill: "red" }
                    : { fill: "black" }
                }
              />
            </div>

            <div className="textEditor_Icons">
              <span
                className="texteditor"
                onClick={() => {
                  boldTextHandler(id);
                }}
              >
                <FaBold fill={toggleBackgrounDColor ? " #e8eaed" : "black"} />
              </span>
              <span
                className="texteditor"
                onClick={() => {
                  italicFontHandler(id);
                }}
              >
                <BiItalic
                  size="20px"
                  fill={toggleBackgrounDColor ? " #e8eaed" : "black"}
                />
              </span>
              <span
                className="texteditor"
                onClick={() => {
                  underLineFontHandler(id);
                }}
              >
                <AiOutlineUnderline
                  size="20px"
                  fill={toggleBackgrounDColor ? " #e8eaed" : "black"}
                />
              </span>
              <span
                className="texteditor texteditorfontWrapper"
                onClick={() => {
                  fontactiveHandler(id);
                }}
              >
                <ImFont
                  size="20px"
                  fill={toggleBackgrounDColor ? " #e8eaed" : "black"}
                />
                {id === itemID1 && (
                  <div className="textEditorFont">
                    {fontSelector &&
                      fontSizes.map((item, index) => {
                        return (
                          <span
                            style={
                              toggleBackgrounDColor
                                ? { color: "#e8eaed" }
                                : { color: "black" }
                            }
                            key={index}
                            onClick={() => {
                              fontSelectorHandler(id, item);
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                )}
              </span>
              <span className=" texteditor texteditorcolor">
                <IoIosColorFill
                  fill={toggleBackgrounDColor ? " #e8eaed" : "black"}
                  size="20px"
                  onClick={() => {
                    colorHandler(id);
                  }}
                />
                {id === itemID && (
                  <div className="richTextSelector_Wrapper">
                    {iconSelector &&
                      color.map((colorItem, index) => {
                        return (
                          <div
                            className="boxcoloricon"
                            key={index}
                            style={{
                              backgroundColor: colorItem,
                              width: "1.5rem",
                              height: "1.5rem",
                              border: "1px solid #f1f1f1",
                            }}
                            onClick={(e) => {
                              let color = e.target.style.backgroundColor;
                              colorChooseHandler(color, id);
                            }}
                          ></div>
                        );
                      })}
                  </div>
                )}
              </span>
            </div>

            <div>
              <div className="titlecontent_wrapper">
                {!editSuccessful && (
                  <h3
                    className="displayedTitle"
                    style={
                      toggleBackgrounDColor
                        ? { color: "#e8eaed" }
                        : {
                            color: DisplayedItemColor(),
                          }
                    }
                  >
                    {title}
                  </h3>
                )}

                {
                  <span
                    className={`checkbox1 ${iconActive ? "iconHide" : ""}`}
                    style={
                      toggleBackgrounDColor
                        ? { backgroundColor: "#e8eaed" }
                        : {
                            backgroundColor: "white",
                            border: "1px solid black",
                          }
                    }
                    onClick={() => {
                      IconActiveHandler(id);
                    }}
                  >
                    {iconActive && (
                      <TiTick
                        style={
                          toggleBackgrounDColor
                            ? { color: "rgb(32, 33, 36)" }
                            : { color: "black" }
                        }
                        size="18px"
                      />
                    )}
                  </span>
                }

                {editSuccessful && (
                  <>
                    {
                      <div
                        className="inputItemDisplay_Wrapper"
                        style={
                          toggleBackgrounDColor
                            ? { borderBottom: "2px solid #e8eaed" }
                            : { borderBottom: "2px solid #f1f1f1" }
                        }
                      >
                        <input
                          value={title}
                          name="title"
                          className="inputItemDisplayed"
                          onChange={(e) => {
                            inputHandler(e.target.value, id, Taskitem);
                          }}
                          style={
                            toggleBackgrounDColor
                              ? { color: "#e8eaed" }
                              : { color: DisplayedItemColor() }
                          }
                        />
                        {
                          <span
                            className="inactiveIcon"
                            style={
                              toggleBackgrounDColor
                                ? { backgroundColor: "#e8eaed" }
                                : {
                                    backgroundColor: "white",
                                    border: "1px solid black",
                                  }
                            }
                            onClick={IconInActiveHandler}
                          >
                            {!iconInActive && (
                              <TiTick
                                style={
                                  toggleBackgrounDColor
                                    ? { color: "rgb(32, 33, 36)" }
                                    : { color: "black" }
                                }
                                size="18px"
                              />
                            )}
                          </span>
                        }
                      </div>
                    }
                  </>
                )}
              </div>
              <div className="titlecontent_wrapper">
                {!editSuccessful && (
                  <p
                    className="displayedTitle"
                    style={
                      toggleBackgrounDColor
                        ? { color: "#e8eaed" }
                        : {
                            color: DisplayedItemColor(),
                          }
                    }
                  >
                    {content}
                  </p>
                )}

                {
                  <span
                    className={`checkbox1 checkMainContent ${
                      iconActive ? "iconHide" : ""
                    }`}
                    style={
                      toggleBackgrounDColor
                        ? { backgroundColor: "#e8eaed" }
                        : {
                            backgroundColor: "white",
                            border: "1px solid black",
                          }
                    }
                    onClick={IconActiveHandler}
                  >
                    {iconActive && (
                      <TiTick
                        style={
                          toggleBackgrounDColor
                            ? { color: "rgb(32, 33, 36)" }
                            : { color: "black" }
                        }
                        size="18px"
                      />
                    )}
                  </span>
                }

                {editSuccessful && (
                  <div
                    className="inputItemDisplay_Wrapper"
                    style={
                      toggleBackgrounDColor
                        ? { borderBottom: "2px solid #e8eaed" }
                        : { borderBottom: "2px solid #f1f1f1" }
                    }
                  >
                    <TextareaAutosize
                      type="text"
                      className="content"
                      onChange={(e) => {
                        inputHandler1(e.target.value, id, Taskitem);
                      }}
                      row={1}
                      name="title"
                      value={content}
                      style={
                        toggleBackgrounDColor
                          ? { color: "#e8eaed" }
                          : {
                              color: DisplayedItemColor(),
                            }
                      }
                    />

                    {
                      <span
                        className="inactiveIcon"
                        style={
                          toggleBackgrounDColor
                            ? { backgroundColor: "#e8eaed" }
                            : {
                                backgroundColor: "white",
                                border: "1px solid black",
                              }
                        }
                        onClick={IconInActiveHandler}
                      >
                        {!iconInActive && (
                          <TiTick
                            style={
                              toggleBackgrounDColor
                                ? { color: "rgb(32, 33, 36)" }
                                : { color: "black" }
                            }
                            size="18px"
                          />
                        )}
                      </span>
                    }
                  </div>
                )}
              </div>
            </div>

            {myfile && filePreview !== undefined && (
              <>
                {myfile.type === "image/png" ||
                myfile.type === "image/jpeg" ||
                myfile.type === "image/jpg" ? (
                  <>
                    <img
                      src={filePreview}
                      className="displayedImageItem"
                      onClick={imageClickHandler}
                    />

                    {openPortal && (
                      <Portal
                        filePreview={filePreview}
                        closePortal={() => {
                          setOpenPortal(false);
                        }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div
                      className="fileName_wrapper"
                      style={
                        toggleBackgrounDColor
                          ? { color: "rgb(232, 234, 237)" }
                          : { color: DisplayedItemColor() }
                      }
                    >
                      <span>File Name:</span>
                      <span>{stringtruncate(myfile?.name)}</span>
                    </div>
                    <div
                      className="fileDescription"
                      style={
                        toggleBackgrounDColor
                          ? { color: "rgb(232, 234, 237)" }
                          : { color: DisplayedItemColor() }
                      }
                    >
                      <span>Type:</span>
                      <span>{myfile.type}</span>
                    </div>
                    <div
                      className="fileSize"
                      style={
                        toggleBackgrounDColor
                          ? { color: "rgb(232, 234, 237)" }
                          : { color: DisplayedItemColor() }
                      }
                    >
                      <span>File Size:</span>
                      <span>{Math.floor(myfile.size / 1000)}kb</span>
                    </div>
                    {console.log(filePreview)}
                    {myfile.type === "application/pdf" ? (
                      <>
                        <div
                          className="fileLink_Wrapper"
                          style={
                            toggleBackgrounDColor
                              ? { color: "rgb(232, 234, 237)" }
                              : { color: DisplayedItemColor() }
                          }
                        >
                          <span>Link:</span>
                          <a
                            className="filesDocs"
                            href={filePreview}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {filePreview}
                          </a>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayedNotes;
