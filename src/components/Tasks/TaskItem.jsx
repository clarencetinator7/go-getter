import React from 'react';
import moment from 'moment/moment';

import style from './TaskItem.module.css';

const TaskItem = props => {

  return (
    <li className={style["task-item"]}>
      <div className={style["task-item__wrapper"]}>
        <input type="checkbox" name={props.id} id={props.id} />
        <label htmlFor={props.id}>{props.task}</label>
      </div>
      <div
        className={`${style["task-item__wrapper"]} ${style["task-due__wrapper"]}`}
      >
        <span>{moment(props.due).format("D MMM")}</span>
      </div>
    </li>
  );

};

export default TaskItem;