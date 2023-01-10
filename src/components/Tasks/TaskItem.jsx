import React from 'react';
import moment from 'moment/moment';

import style from './TaskItem.module.css';

const TaskItem = props => {

  let formattedDue = ''; 
  
  if(moment(props.due).isValid()) {
    formattedDue = moment(props.due).format("D MMM");
    
    if(moment(props.due).isSame(moment(), 'week')) {
      formattedDue = moment(props.due).format("dddd")
    }
    if(moment(props.due).isSame(moment(), 'day')) {
      formattedDue = moment(props.due).format('[Today]');
    }
  }

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
          checked={props.isDone}
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