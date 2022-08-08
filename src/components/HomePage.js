import React from "react";
import "../css/HomePage.css";
import { ImCheckboxChecked } from "react-icons/im";
import { BsPenFill } from "react-icons/bs";
import { AiFillFileAdd, AiOutlinePlus } from "react-icons/ai";
import { GiCrossMark } from "react-icons/gi";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesActions } from "../features/notesSlice";

import DisplayedNotes from "./DisplayedNotes.js";

const HomePage = () => {
  const [checkBoxActive, setCheckBoxActive] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const [listName, setListName] = useState("");
  const [checked, setChecked] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const dispatch = useDispatch();
  const selectedState = useSelector((state) => state.NotesReducer.todoNotes);

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
  const inputContentHandler = (e) => setInputContent(e.target.value);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
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
        {!checkBoxActive && (
          <GiCrossMark
            className="cancelbutton"
            size="18px"
            fill="grey"
            onClick={cancelHandler}
          />
        )}
        {checkBoxActive ? (
          <div className="Todo_icon">
            <ImCheckboxChecked
              fill="black"
              size="20px"
              onClick={checkBoxHandler}
            />
            <BsPenFill fill="black" size="20px" />
            <AiFillFileAdd fill="black" size="20px" />
          </div>
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
