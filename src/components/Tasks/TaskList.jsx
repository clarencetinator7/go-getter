import React, { useContext, useState } from 'react';
import TaskContext from '../Layout/Context/TaskContext';
import TaskItem from './TaskItem';

import style from './TaskList.module.css';

/* FONT AWESOME IMPORTS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const faIcons = {
  chevronDown: <FontAwesomeIcon icon={faChevronDown} className={style["drop-icon"]} />,
}

const TaskList = () => {

  const [isOpen, setIsOpen] =  useState(false);

  const taskCtx = useContext(TaskContext);

  const sortedTask = taskCtx.getSortedTasks();

  const finishedTask = sortedTask.filter((item) => {
    return item.isDone;
  });
  const onGoingTask = sortedTask.filter((item) => {
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
      <div className={style['task-list__finished-list']}>
        <span className={style['list-title']} onClick={onClickHandler}>🎉 Finished Tasks {faIcons.chevronDown}
        </span>
        <ul className={`${style['finished-tasks']} ${!isOpen ? style['collapsed'] : ''}`}> 
          {finishedTaskItems}
        </ul>
      </div>
    </div>
  );  

}

export default TaskList;