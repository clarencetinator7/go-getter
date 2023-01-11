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

  const displayList = taskCtx.lists.map((item) => {
    return (
      <li key={item} id={item} className={style["list-item"]} onClick={(e) => {props.setDisplay(e.target.id)}}>
        {item}
      </li>
    );
  });

  return (
    <div className={style["task-list"]}>
      <span className={style["task-list__header"]}>
        List {faIcons.chevronDown}
      </span>
      <ul className={style.lists}>
        {displayList}
        <li>
          <input type="text" placeholder="Add List :>" />
        </li>
      </ul>
    </div>
  );
};

export default ListFilter;