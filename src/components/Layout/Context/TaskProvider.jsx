import React from "react";
import TaskContext from "./TaskContext";

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



const TaskProvider = props => {

  const taskContext = {
    tasks: INITIAL_TASKS,
    addTasks: (foo) => {},
    toggleTask: (foo) => {}
  }

  return <TaskContext.Provider value={taskContext}>{props.children}</TaskContext.Provider>;
}

export default TaskProvider;