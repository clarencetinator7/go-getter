import React from 'react';
import moment from 'moment/moment';

import style from './TaskItem.module.css';

const TaskItem = props => {

  let formattedDue = moment(props.due).isValid()
    ? moment(props.due).format("D MMM")
    : "";

  return (
    <li className={style["task-item"]}>
      <div className={style["task-item__wrapper"]}>
        <input
          type="checkbox"
          name={props.id}
          id={props.id}
          onChange={() => {
            props.onToggleHandler(props.id);
          }}
          checked={props.isDone ? props.isDone : false}
        />
        <label htmlFor={props.id}>{props.task}</label>
      </div>
      <div
        className={`${style["task-item__wrapper"]} ${style["task-due__wrapper"]}`}
      >
        <span>{formattedDue}</span>
      </div>
    </li>
  );

};

export default TaskItem;