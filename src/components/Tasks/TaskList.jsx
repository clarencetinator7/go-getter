import React, { useContext, useState } from 'react';
import TaskContext from '../Layout/Context/TaskContext';
import TaskItem from './TaskItem';

import style from './TaskList.module.css';
//#region  Other Imports
/* FONT AWESOME IMPORTS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
//#endregion
const faIcons = {
  chevronDown: <FontAwesomeIcon icon={faChevronDown} className={style["drop-icon"]} />,
}

const TaskList = (props) => {

  const [isOpen, setIsOpen] =  useState(false);

  const taskCtx = useContext(TaskContext);

  // const sortedTask = taskCtx.getSortedTasks();

  const finishedTask = props.displayedTasks.filter((item) => {
    return item.isDone;
  });
  const onGoingTask = props.displayedTasks.filter((item) => {
    return !item.isDone;
  });

  const toggleTask = (id) => {
    taskCtx.toggleTask(id);
  };

  const onGoingTaskItems = onGoingTask.map((item) => {
    return (
      <TaskItem
        key={item.id}
        id={item.id}
        task={item.task}
        due={item.due}
        isDone={item.isDone}
        onToggleHandler={toggleTask}
      />
    );
  });  

  const finishedTaskItems = finishedTask.map((item) => {
    return (
      <TaskItem
        key={item.id}
        id={item.id}
        task={item.task}
        due={item.due}
        isDone={item.isDone}
        onToggleHandler={toggleTask}
      />
    );
  });

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  } 

  return (
    <div className={style['task-list__container']}>
      <ul className={style['task-list']}>
        {onGoingTaskItems}
      </ul>
    </div>
  );  

}

export default TaskList;