import moment, { isMoment } from 'moment/moment';
import React, { useContext, useState } from 'react';
import TaskContext from '../Layout/Context/TaskContext';

import style from './TaskForm.module.css';

const TaskForm = (props) => {
 
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
    }

    const newTask = {
      id: Math.random(),
      task: enteredTask,
      list: props.isList ? props.listName : 'Inbox',
      due: enteredDate ? enteredDate : !props.isList && props.listName === 'TODAY' ? moment().format('YYYY-MM-DD') : null,
      isDone: false,
      finishedDate: null,
    };
    
    taskCtx.addTask(newTask);

    setEnteredTask('');
    setEnteredDate('');

  }

  
  const listNameToTitleCase = props.listName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  let inputPlaceholder = `➕ Add new task, press Enter to submit.`;

  if(props.isList) {
    inputPlaceholder = `➕ Add new task in "#${props.listName}", press Enter to submit.`
  } else if (props.listName === 'TODAY') {
    inputPlaceholder = `➕ Add new task in "${listNameToTitleCase}", press Enter to submit.`
  }
  
  return (
    <form className={style["task-input__container"]} onSubmit={onSubmitHandler}>
      <div className={`${style["input-wrapper"]} ${style["text-wrapper"]}`}>
        <input
          type="text"
          value={enteredTask}
          onChange={onEnterTaskHandler}
          placeholder={inputPlaceholder}
        />
      </div>
      <div className={`${style["input-wrapper"]} ${style["date-wrapper"]}`}>
        <input
          type="date"
          value={
            props.listName !== "TODAY"
              ? enteredDate
              : moment().format("YYYY-MM-DD")
          }
          onChange={onEnterDateHandler}
          min={moment().format("YYYY-MM-DD")}
        />
      </div>
      <button type="submit" hidden />
    </form>
  );
}

export default TaskForm;