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

  let isList = false;
  let listName = '';

  let finishedTasks = taskCtx.tasks.filter((item) => {
    return item.isDone;
  });


  if(props.displayed === 'TODAY') {
    listName = '🌞 Today'
    filteredTasks = taskCtx.getSortedTasks().filter(item => {
      return moment(item.due).isSame(moment(), 'day') || item.due === null;
    });
  } else if(props.displayed === 'INBOX') {
    listName = '📥 Inbox'
    filteredTasks = taskCtx.getSortedTasks();
  } else if(props.displayed === 'NEXTWEEK') {
    listName = '📅 Next Week'
    filteredTasks = taskCtx.getSortedTasks().filter(item => {
      return moment(item.due).isAfter(moment(), 'week')
    });
  } else {
    isList = true;
    listName = props.displayed
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
          <span className="content-title">{`${
            isList ? "#️" : ""
          } ${listName}:`}</span>
        </div>
        <TaskForm isList={isList} listName={listName} />
        <div className={style["task-container"]}>
          <TaskList displayedTasks={filteredTasks} />
          <FinishedTasksList finishedTasks={finishedTasks} />
        </div>
      </div>
    </main>
  );
}

export default TaskPanel;