import React, {useState, useContext} from "react";

import style from './ListFilter.module.css';

import TaskContext from "../Context/TaskContext";

const ListFilter = (props) => {
  const taskCtx = useContext(TaskContext);

  const [isListOpen, setIsListOpen] = useState(false);

  const displayList = taskCtx.lists.map((item) => {
    return (
      <li key={item} className={style["list-item"]}>
        {item}
      </li>
    );
  });

  return (
    <div className={style["task-list"]}>
      <span className={style["task-list__header"]}>List</span>
      <ul className="list">
        {displayList}
        <li>
          <input type="text" placeholder="Add List :>" />
        </li>
      </ul>
    </div>
  );
};

export default ListFilter;
