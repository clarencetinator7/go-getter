import React, { useContext, useState } from 'react';
import TaskContext from '../Layout/Context/TaskContext';

import style from './TaskForm.module.css';

const TaskForm = () => {
 
  const taskCtx = useContext(TaskContext);
  
  const [enteredTask, setEnteredTask] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  const onEnterTaskHandler = e => {
    setEnteredTask(e.target.value);
  }

  const onEnterDateHandler = e => {
    setEnteredDate(e.target.value);
  }

  const onSubmitHandler = e => {
    e.preventDefault();

    if (enteredTask.trim().length === 0) {
      console.log("PLEASE ENTER A TASK");
      return;
      /* 
        TODO: 
        ADD EMPTY INPUT WARNING.
      */
    }

    const newTask = {
      id: Math.random(),
      task: enteredTask,
      due: enteredDate ? enteredDate : null,
      isDone: false,
    };
    
    taskCtx.addTask(newTask);

    setEnteredTask('');
    setEnteredDate('');

  }
 
  return (
    <form className={style['task-input__container']} onSubmit={onSubmitHandler}>
      <div className={`${style['input-wrapper']} ${style['text-wrapper']}`}>
        <input type='text' value={enteredTask} onChange={onEnterTaskHandler} placeholder='➕ Add new task' />
      </div>
      <div className={`${style['input-wrapper']} ${style['date-wrapper']}`}>
        <input type='date' value={enteredDate} onChange={onEnterDateHandler}/>
      </div>
      <button type='submit' hidden/>
    </form>
  );
}

export default TaskForm;