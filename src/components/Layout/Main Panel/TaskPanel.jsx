import moment from "moment/moment";
import React, { useContext, useEffect } from "react";
import FinishedTasksList from "../../Tasks/FinishedTasksList";
import TaskForm from "../../Tasks/TaskForm";
import TaskList from "../../Tasks/TaskList";
import TaskContext from "../Context/TaskContext";

import style from './TaskPanel.module.css';

const TaskPanel = (props) => {
  
  const taskCtx = useContext(TaskContext);
  let filteredTasks = taskCtx.tasks;

  let finishedTasks = taskCtx.tasks.filter((item) => {
    return item.isDone;
  });


  if(props.displayed === 'TODAY') {
    filteredTasks = taskCtx.getSortedTasks().filter(item => {
      return moment(item.due).isSame(moment(), 'day') || item.due === null;
    });
  } else if(props.displayed === 'INBOX') {
    filteredTasks = taskCtx.getSortedTasks();
  } else if(props.displayed === 'NEXTWEEK') {
    filteredTasks = taskCtx.getSortedTasks().filter(item => {
      return moment(item.due).isAfter(moment(), 'week')
    });
  } else {
    filteredTasks = taskCtx.getSortedTasks().filter(item => {
      return item.list === props.displayed;
    })
    finishedTasks = finishedTasks.filter((item) => {
      return item.list === props.displayed;
    })
  }

  return (
    <main className={style["main-content"]}>
      <div className={style["content-container"]}>
        <div className={style["main-content__header"]}>
          <span className="content-title">{`${props.displayed}:`}</span>
        </div>
        <TaskForm/>
        <TaskList displayedTasks={filteredTasks}/>
        <FinishedTasksList finishedTasks={finishedTasks} />
      </div>
    </main>
  );
}

export default TaskPanel;