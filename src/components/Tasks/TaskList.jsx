import React from 'react';

import style from './TaskList.module.css';

const TaskList = props => {

  const taskItems = props.taskList.map((task) => {
    return (
      <li key={task.id} className="task-item">
        <div className="task-item__wrapper">
          <input type="checkbox" name={task.id} id={task.id} />
          <label htmlFor={task.id}>{task.taskName}</label>
        </div>
        <div className="task-item__wrapper">
          <span>{task.due}</span>
        </div>
      </li>
    );
  });  

  return (
    <div className='task-list__container'>
      <ul className='task-list'>
        {taskItems}
      </ul>
    </div>
  );  

}

export default TaskList;