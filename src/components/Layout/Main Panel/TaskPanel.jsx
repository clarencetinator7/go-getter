import React, {useContext, useState} from "react";
import TaskForm from "../../Tasks/TaskForm";
import TaskList from "../../Tasks/TaskList";
import TaskContext from "../Context/TaskContext";

import style from './TaskPanel.module.css';

const TaskPanel = () => {

  const toggleTaskHandler = (taskId) => {
    // setTaskList(
    //   taskList.map((task) =>
    //     task.id === taskId ? { ...task, isDone: !task.isDone } : task
    //   )
    // );
  };
  
  return (
    <main className={style["main-content"]}>
      <div className={style["content-container"]}>
        <div className={style["main-content__header"]}>
          <span className="content-title">TODAY:</span>
        </div>
        <TaskForm/>
        <TaskList onToggleTask={toggleTaskHandler}/>
      </div>
    </main>
  );
}

export default TaskPanel;