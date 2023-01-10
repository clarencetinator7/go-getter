import moment from "moment/moment";
import React, { useContext } from "react";
import TaskForm from "../../Tasks/TaskForm";
import TaskList from "../../Tasks/TaskList";
import TaskContext from "../Context/TaskContext";

import style from './TaskPanel.module.css';

const TaskPanel = (props) => {
  
  const taskCtx = useContext(TaskContext);
  let filteredTasks = taskCtx.tasks;

  if(props.displayed === 'TODAY') {
    filteredTasks = taskCtx.getSortedTasks().filter(item => {
      return moment(item.due).isSame(moment(), 'day') || item.due === null;
    });
  }
  if(props.displayed === 'INBOX') {
    filteredTasks = taskCtx.getSortedTasks();
  }

  return (
    <main className={style["main-content"]}>
      <div className={style["content-container"]}>
        <div className={style["main-content__header"]}>
          <span className="content-title">TODAY:</span>
        </div>
        <TaskForm/>
        <TaskList displayedTasks={filteredTasks}/>
      </div>
    </main>
  );
}

export default TaskPanel;