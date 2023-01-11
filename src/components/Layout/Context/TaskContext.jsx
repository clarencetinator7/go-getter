import React from "react";

const TaskContext = React.createContext({
  tasks: [],
  lists: [],
  addTask: (newTask) => {},
  toggleTask: (taskId) => {},
  getSortedTasks: () => {},
  addList: (list) => {},
});

export default TaskContext;