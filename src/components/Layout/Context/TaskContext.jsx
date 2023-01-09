import React from "react";

const TaskContext = React.createContext({
  tasks: [],
  addTask: (newTask) => {},
  toggleTask: (foo) => {},
});

export default TaskContext;