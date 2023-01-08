import moment from 'moment/moment';
import React from 'react';

import style from './TaskList.module.css';

const TaskList = props => {

  const taskItems = props.taskList
    .filter((item) => {
      return !item.isDone;
    })
    .map((item) => {
      return (
        <li key={item.id} className={style["task-item"]}>
          <div className={style["task-item__wrapper"]}>
            <input type="checkbox" name={item.id} id={item.id} />
            <label htmlFor={item.id}>{item.task}</label>
          </div>
          <div
            className={`${style["task-item__wrapper"]} ${style["task-due__wrapper"]}`}
          >
            <span>{moment(item.due).format('D MMM')}</span>
          </div>
        </li>
      );
    });  

  return (
    <div className={style['task-list__container']}>
      <ul className={style['task-list']}>
        {taskItems}
      </ul>
    </div>
  );  

}

export default TaskList;