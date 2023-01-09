import React from "react";

const TaskContext = React.createContext({
  tasks: [],
  addTask: (newTask) => {},
  toggleTask: (taskId) => {},
});

export default TaskContext;