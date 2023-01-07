import React, { useState } from 'react';

import style from './TaskForm.module.css';

const TaskForm = props => {
  
  const [enteredTask, setEnteredTask] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  const today = new Date();

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
    

    const dueDate = enteredDate ? new Date(enteredDate).toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
    }) : null;

    props.onSubmitTask({
      id: Math.random(),
      task: enteredTask,
      due: dueDate,
      isDone: false,
    });

    setEnteredTask('');
    setEnteredDate('')

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