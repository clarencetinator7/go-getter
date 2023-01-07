import React from 'react';

import style from './TaskForm.module.css';

const TaskForm = () => {
  return (
    <form className={style["task-input__container"]}>
      <div className={`${style["input-wrapper"]} ${style["text-wrapper"]}`}>
        <input type="text" placeholder="➕ Add new task" />
      </div>
      <div className={`${style["input-wrapper"]} ${style["date-wrapper"]}`}>
        <input type="date" />
      </div>
      <button type='submit' hidden/>
    </form>
  );
}

export default TaskForm;