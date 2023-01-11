import React, { useContext } from 'react';
import TaskContext from '../Layout/Context/TaskContext';
import TaskItem from './TaskItem';

import style from './TaskList.module.css';
//#region  Other Imports


const TaskList = (props) => {

  

  const taskCtx = useContext(TaskContext);

  // const sortedTask = taskCtx.getSortedTasks();

  const onGoingTask = props.displayedTasks.filter((item) => {
    return !item.isDone;
  });

  const toggleTask = (id) => {
    taskCtx.toggleTask(id);
  }

  const onGoingTaskItems = onGoingTask.map((item) => {
    return (
      <TaskItem
        key={item.id}
        id={item.id}
        task={item.task}
        due={item.due}
        isDone={item.isDone}
        list={item.list}
        onToggleHandler={toggleTask}
      />
    );
  });  

  

   

  return (
    <div className={style['task-list__container']}>
      <ul className={style['task-list']}>
        {onGoingTaskItems}
      </ul>
    </div>
  );  

}

export default TaskList;