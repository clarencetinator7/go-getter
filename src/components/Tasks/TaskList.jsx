import moment from 'moment/moment';
import React from 'react';
import TaskItem from './TaskItem';

import style from './TaskList.module.css';

const TaskList = props => {

  function sortTasks(tasks) {
  return tasks.sort((a, b) => {
    if (a.due === null && b.due === null) {
      return 0;
    }
    if (a.due === null) {
      return -1;
    }
    if (b.due === null) {
      return 1;
    }
    return new Date(a.due) - new Date(b.due);
  });
}
  
  const sortedTask = sortTasks(props.taskList);

  const taskItems = sortedTask 
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