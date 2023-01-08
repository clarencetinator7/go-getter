import moment from 'moment/moment';
import React from 'react';
import TaskItem from './TaskItem';

import style from './TaskList.module.css';

const TaskList = props => {

  const taskItems = props.taskList
    .filter((item) => {
      return !item.isDone;
    })
    .map((item) => {
      return <TaskItem key={item.id} id={item.id} task={item.task} due={item.due} />;
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