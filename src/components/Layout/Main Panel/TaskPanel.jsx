import React from "react";
import TaskForm from "../../Tasks/TaskForm";

import style from './TaskPanel.module.css';

const TaskPanel = () => {
  return (
    <main className={style["main-content"]}>
      <div className={style["content-container"]}>
        <div className={style["main-content__header"]}>
          <span className="content-title">TODAY:</span>
        </div>
        <TaskForm />
      </div>
    </main>
  );
}

export default TaskPanel;