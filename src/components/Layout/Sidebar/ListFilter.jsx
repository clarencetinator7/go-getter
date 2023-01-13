import React, { useState, useContext } from "react";

import style from "./ListFilter.module.css";

import TaskContext from "../Context/TaskContext";

/* FONT AWESOME IMPORTS */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const faIcons = {
  chevronDown: (
    <FontAwesomeIcon icon={faChevronDown} className={style["drop-icon"]} />
  ),
};

const ListFilter = (props) => {
  const taskCtx = useContext(TaskContext);

  const [isListOpen, setIsListOpen] = useState(false);
  const [enteredList, setEnteredList] = useState('');

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

    if(enteredList.trim().length === 0){
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
      <li
        key={item.id}
        id={item.id}
        className={style["list-item"]}
        onClick={(e) => {
          props.setDisplay(item.list);
        }}
      >
        {`# ${item.list}`}
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
          <input type="text" onChange={onEnterListHandler} value={enteredList} placeholder="Click-to-add-list" />
        </form>
      </ul>
    </div>
  );
};

export default ListFilter;
