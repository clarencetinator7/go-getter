import React, { useContext } from 'react';
import TaskContext from '../Layout/Context/TaskContext';
import TaskItem from './TaskItem';

import style from './TaskList.module.css';

const TaskList = props => {

  const taskCtx = useContext(TaskContext)

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

  const sortedTask = sortTasks(taskCtx.tasks);

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