import React from "react";

const TaskContext = React.createContext({
  tasks: [],
  lists: [],
  addTask: (newTask) => {},
  deleteTask: (taskId) => {},
  toggleTask: (taskId) => {},
  getSortedTasks: () => {},
  addList: (list) => {},
  changeList: (id, list) => {}
});

export default TaskContext;