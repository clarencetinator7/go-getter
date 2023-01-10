import React, { useContext } from 'react';
import TaskContext from '../Layout/Context/TaskContext';
import TaskItem from './TaskItem';

import style from './TaskList.module.css';

const TaskList = () => {

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

  return (
    <div className={style['task-list__container']}>
      <ul className={style['task-list']}>
        {onGoingTaskItems}
      </ul>
      <div className='task-list__finished-list'>
        <span>Finished Tasks 🎉</span>
        <ul> 
          {finishedTaskItems}
        </ul>
      </div>
    </div>
  );  

}

export default TaskList;