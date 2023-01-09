import React, {useState} from "react";
import TaskForm from "../../Tasks/TaskForm";
import TaskList from "../../Tasks/TaskList";

import style from './TaskPanel.module.css';

const INITIAL_TASKS = [
  {
    id: 1,
    task: "Buy groceries",
    due: "2023-01-06",
    isDone: false
  },
  {
    id: 2,
    task: "Finish project proposal",
    due: "2023-01-07",
    isDone: true
  },
  {
    id: 3,
    task: "Attend yoga class",
    due: "2023-01-08",
    isDone: false
  },
  {
    id: 4,
    task: "Call dentist for appointment",
    due: "2023-01-09",
    isDone: false
  },
  {
    id: 5,
    task: "Submit expense report",
    due: "2023-01-10",
    isDone: true
  }
];

const TaskPanel = () => {
  
  const [taskList, setTaskList] = useState(INITIAL_TASKS);

  const addTaskHandler = newTask => {
    setTaskList(prevTask => {
      return [...prevTask, newTask]
    });
  };

  const toggleTaskHandler = (taskId) => {
    setTaskList(
      taskList.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  console.log(taskList);

  return (
    <main className={style["main-content"]}>
      <div className={style["content-container"]}>
        <div className={style["main-content__header"]}>
          <span className="content-title">TODAY:</span>
        </div>
        <TaskForm onSubmitTask={addTaskHandler} />
        <TaskList taskList={taskList} onToggleTask={toggleTaskHandler}/>
      </div>
    </main>
  );
}

export default TaskPanel;