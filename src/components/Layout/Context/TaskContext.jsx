import React from "react";

const TaskContext = React.createContext({
  tasks: [],
  lists: [],
  addTask: (newTask) => {},
  deleteTask: (taskId) => {},
  toggleTask: (taskId) => {},
  getTasks: {},
  addList: (list) => {},
  changeList: (id, list) => {},
  deleteList: (listId) => {}
});

export default TaskContext;