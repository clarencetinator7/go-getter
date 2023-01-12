import React from 'react';
import moment from 'moment/moment';

import style from './TaskItem.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

const TaskItem = props => {

  let formattedDue = '';
  const isOverdue = moment(props.due).isBefore(moment(), 'day');
  
  if(moment(props.due).isValid()) {
    formattedDue = moment(props.due).format("D MMM");
    
    if(moment(props.due).isSame(moment(), 'week')) {
      formattedDue = moment(props.due).format("ddd")
    }
    if(moment(props.due).isSame(moment(), 'day')) {
      formattedDue = moment(props.due).format('[Today]');
    }
  }

  const optionButtonClickHandler = () => {
    console.log(`Options clicked. Task: ${props.id}, ${props.task}`)
  }

  return (
    <li className={style["task-item"]}>
      <div className={style["task-item__main"]}>
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
        className={`${style["task-item__wrapper"]} ${style["task-due__wrapper"]} ${isOverdue && !props.isDone ? style["overdue"] : ""}`}
      >
        <span className={style['due-txt']}>{formattedDue}</span><br />
        <span>{`# ${props.list}`}</span>
      </div>
      <div className={style['task-item__options']}>
        <button type='button' onClick={optionButtonClickHandler}><FontAwesomeIcon icon={faEllipsis} /></button>
      </div>
    </li>
  );

};

export default TaskItem;