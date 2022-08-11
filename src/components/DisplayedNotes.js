import React, { useEffect, useState } from "react";
import "../css/DisplayedNotes.css";
import { FaBold } from "react-icons/fa";
import { BiItalic } from "react-icons/bi";
import { AiOutlineUnderline, AiFillDelete } from "react-icons/ai";
import { IoIosColorFill } from "react-icons/io";
import { ImFont } from "react-icons/im";

import { useDispatch, useSelector } from "react-redux";
import { NotesActions } from "../features/notesSlice";

const DisplayedNotes = ({ toggleBackgrounDColor }) => {
  const TaskResults = useSelector((state) => state.NotesReducer.todoNotes);
  const SelectedColor = useSelector((state) => state.NotesReducer.color);
  let dispatch = useDispatch();
  // const SelectedBackgroundImage = useSelector(
  //   (state) => state.NotesReducer.backgroundImage
  // );

  const [iconSelector, setIconSelector] = useState(false);
  const [fontSelector, setFontSelector] = useState(false);
  const [boldSelect, setBoldSelect] = useState(false);
  const [italicSelect, setItalicSelect] = useState(false);
  const [underlineSelect, setUnderLineSelect] = useState(false);
  const selectedfont = useSelector((state) => state.NotesReducer.fontType);

  const color = [
    "#ff0000",
    "#0000ff",
    "#3cb371",
    "#ffa500",
    "#ee82ee",
    "#6a5acd",
  ];
  const fontSizes = [10, 12, 14, 16, 18, 20, 22, 24];

  const colorChooseHandler = (item, id) => {
    const myElement = document.getElementById(id);
    myElement.style.backgroundColor = item;
  };
  const boldTextHandler = (id) => {
    const myElement = document.getElementById(id).childNodes;

    setBoldSelect(!boldSelect);
    myElement[1].style.fontWeight = "900";
    myElement[2].style.fontWeight = "900";

    if (boldSelect) {
      myElement[1].style.fontWeight = "normal";
      myElement[2].style.fontWeight = "normal";
    } else {
      myElement[1].style.fontWeight = "900";
      myElement[2].style.fontWeight = "900";
    }
  };
  const italicFontHandler = (id) => {
    setItalicSelect(!italicSelect);
    const myElement = document.getElementById(id).childNodes;

    myElement[1].style.fontStyle = "italic";
    myElement[2].style.fontStyle = "italic";
    if (italicSelect) {
      myElement[1].style.fontStyle = "normal";
      myElement[2].style.fontStyle = "normal";
    }
  };
  const underLineFontHandler = (id) => {
    setUnderLineSelect(!underlineSelect);
    const myElement = document.getElementById(id).childNodes;

    if (underlineSelect) {
      myElement[1].style.textDecoration = "none";
      myElement[2].style.textDecoration = "none";
    } else {
      myElement[1].style.textDecoration = "underline";
      myElement[2].style.textDecoration = "underline";
    }
  };
  const colorHandler = (id) => {
    setIconSelector(!iconSelector);
  };
  const fontSelectorHandler = (id, item) => {
    const nodes = document.getElementById(id).childNodes;
    for (let i = 0; i < nodes.length; i++) {
      if (
        nodes[i].nodeName.toLowerCase() === "p" ||
        nodes[i].nodeName.toLowerCase() === "h3"
      ) {
        nodes[i].style.fontSize = item * 1.5 + "px";
      }
    }
  };

  const inputHandler = (e, id, Taskitem) => {
    dispatch(
      NotesActions.updateNotes({
        data: {
          title: e,
        },
        id: id,
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
      })
    );
  };

  const fontactiveHandler = () => {
    setFontSelector(!fontSelector);
  };
  const deleteHandler = (i) => {
    dispatch(NotesActions.removeNotes(i));
  };
  return (
    <div className="displayed_wrapper">
      {TaskResults?.map((Taskitem, Index) => {
        const { content, myfile, title, id } = Taskitem;
        return (
          <div key={id} className="DisplayedItem" id={`${id}`}>
            <AiFillDelete
              fill={toggleBackgrounDColor ? " #e8eaed" : "red"}
              onClick={() => {
                deleteHandler(id);
              }}
            />

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
                onClick={fontactiveHandler}
              >
                <ImFont
                  size="20px"
                  fill={toggleBackgrounDColor ? " #e8eaed" : "black"}
                />
                <div className="textEditorFont">
                  {fontSelector &&
                    fontSizes.map((item, index) => {
                      return (
                        <span
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
              </span>

              <span className=" texteditor texteditorcolor">
                <IoIosColorFill
                  fill={toggleBackgrounDColor ? " #e8eaed" : "black"}
                  size="20px"
                  onClick={() => {
                    colorHandler(id);
                  }}
                />
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
                            colorChooseHandler(color, Taskitem);
                          }}
                        ></div>
                      );
                    })}
                </div>
              </span>
            </div>

            <h3
              style={{
                color: SelectedColor,
                fontSize: "20px",
                fontWeight: selectedfont,
              }}
            >
              {title}
            </h3>
            <input
              value={title}
              name="title"
              onChange={(e) => {
                inputHandler(e.target.value, id, Taskitem);
              }}
            />

            {console.log(Taskitem)}
            <input
              value={content}
              name="content"
              onChange={(e) => {
                inputHandler1(e.target.value, id, Taskitem);
              }}
            />
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
            {console.log(myfile?.name, "file")}
            {myfile && <p>{myfile?.name}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayedNotes;
