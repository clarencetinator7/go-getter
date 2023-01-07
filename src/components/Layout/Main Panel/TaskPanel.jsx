import React from "react";
import TaskForm from "../../Tasks/TaskForm";
import TaskList from "../../Tasks/TaskList";

import style from './TaskPanel.module.css';

const INITIAL_TASKS = [
  {
    id: 1,
    taskName: "Buy groceries",
    due: "2023-01-06"
  },
  {
    id: 2,
    taskName: "Finish project proposal",
    due: "2023-01-07"
  },
  {
    id: 3,
    taskName: "Attend yoga class",
    due: "2023-01-08"
  },
  {
    id: 4,
    taskName: "Call dentist for appointment",
    due: "2023-01-09"
  },
  {
    id: 5,
    taskName: "Submit expense report",
    due: "2023-01-10"
  }
]

const TaskPanel = () => {
  return (
    <main className={style["main-content"]}>
      <div className={style["content-container"]}>
        <div className={style["main-content__header"]}>
          <span className="content-title">TODAY:</span>
        </div>
        <TaskForm />
        <TaskList taskList={INITIAL_TASKS}/>
      </div>
    </main>
  );
}

export default TaskPanel;