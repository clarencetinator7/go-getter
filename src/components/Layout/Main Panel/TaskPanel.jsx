import moment from "moment/moment";
import React, { useContext, useEffect } from "react";
import FinishedTasksList from "../../Tasks/FinishedTasksList";
import TaskForm from "../../Tasks/TaskForm";
import TaskList from "../../Tasks/TaskList";
import TaskContext from "../Context/TaskContext";

import style from './TaskPanel.module.css';

const TaskPanel = (props) => {
  const taskCtx = useContext(TaskContext);

  let listName = "";

  let finishedTasks = taskCtx.tasks.filter((item) => {
    return item.isDone;
  });

  console.log("Re-render Task Panel");

  const listType = {
    TODAY: {
      name: "🌞 Today",
      filterFn: (item) =>
        moment(item.due).isSame(moment(), "day") || item.due === null,
      isList: false,
    },
    INBOX: {
      name: "📥 Inbox",
      filterFn: () => true,
      isList: false,
    },
    NEXTWEEK: {
      name: "📅 Next Week",
      filterFn: (item) => moment(item.due).isAfter(moment(), "week"),
      isList: false,
    },
    custom: {
      name: `#${props.displayed}`, 
      filterFn: (item) => item.list === props.displayed,
      isList: true,
    },
  };

  /* 
    This selects an object from the listType depending on props.displayed
    The object will be destructured into 3 variables:
      name: the name of the list.
      filterFn: function used to filter the tasks.
      isList: it tells if the task displayed is based on a 'custom created list'
  */
  const { name, filterFn, isList } =
    listType[props.displayed] || listType.custom;
  /* 
    After defining the list type, It will filter the tasks from the TaskContext
    with the function provided in the 'filterFn'.
  */
  const filteredTasks = taskCtx.getSortedTasks().filter(filterFn);

  return (
    <main className={style["main-content"]}>
      <div className={style["content-container"]}>
        <div className={style["main-content__header"]}>
          <span className="content-title">{name}</span>
        </div>
        <TaskForm isList={isList} listName={name} />
        <div className={style["task-container"]}>
          <TaskList displayedTasks={filteredTasks} />
          <FinishedTasksList finishedTasks={finishedTasks} />
        </div>
      </div>
    </main>
  );
}

export default TaskPanel;