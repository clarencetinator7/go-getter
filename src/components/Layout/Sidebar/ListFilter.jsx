import React, { useState, useContext } from "react";

import style from "./ListFilter.module.css";

import TaskContext from "../Context/TaskContext";

/* FONT AWESOME IMPORTS */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";
const faIcons = {
  chevronDown: (
    <FontAwesomeIcon icon={faChevronDown} className={style["drop-icon"]} />
  ),
  trash: <FontAwesomeIcon icon={faTrash} className={style["trash-icon"]} />,
};

const ListFilter = (props) => {
  const taskCtx = useContext(TaskContext);

  const [isListOpen, setIsListOpen] = useState(false);
  const [enteredList, setEnteredList] = useState('');
  const [isListExists, setIsListExists] = useState(false);

  const onClickHandler = () => {
    setIsListOpen((prevState) => {
      return !prevState;
    });
  };

  const onEnterListHandler = (e) => {
    if (e.target.value[0] === " ") {
      return;
    }
    if(e.target.value.match(/-{2,}/g)) return;
    setEnteredList(e.target.value.replace(/\s/g, '-'));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Check if list is empty
    if(enteredList.trim().length === 0){
      return;
    }

    //check if list already exists
    //case sensitive
    const listExists = taskCtx.lists.find(item => item.list.toLowerCase() === enteredList.toLowerCase());
    if(listExists){
      setIsListExists(true);
      setTimeout(() => {
        setIsListExists(false);
      }, 2000);
      return;
    }


    taskCtx.addList({
      id: Math.random().toString(),
      list: enteredList,
    })
    setEnteredList('');
  }

  const displayList = taskCtx.lists.map((item) => {
    return (
      <li key={item.id} className={style["list-item"]}>
        <span
          id={item.id}
          onClick={(e) => {
            props.setDisplay(item.list);
          }}
        >
          {`# ${item.list}`}
        </span>
        <button
          type="button"
          onClick={() => {
            taskCtx.deleteList(item.id);
            props.setDisplay("INBOX");
          }}
        >
          {faIcons.trash}
        </button>
      </li>
    );
  });

  return (
    <div className={style["task-list"]}>
      <span
        className={`${style["task-list__header"]} ${
          !isListOpen && style["collapsed"]
        }`}
        onClick={onClickHandler}
      >
        List {faIcons.chevronDown}
      </span>
      <ul className={`${style.lists} ${!isListOpen && style["collapsed"]}`}>
        {displayList}
        <form className={style["input-wrapper"]} onSubmit={onSubmitHandler}>
          <span># </span>
          <input
            type="text"
            onChange={onEnterListHandler}
            value={enteredList}
            placeholder="Click-to-add-list"
          />
        </form>
          {isListExists && <p className={style["error-text"]}>List already exists</p>}

      </ul>
    </div>
  );
};

export default ListFilter;
