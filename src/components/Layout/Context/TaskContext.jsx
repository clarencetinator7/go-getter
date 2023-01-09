import React from "react";

const TaskContext = React.createContext({
  tasks: [],
  addTasks: (foo) => {},
  toggleTask: (foo) => {},
});

export default TaskContext;