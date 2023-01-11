import React, {useReducer} from "react";
import TaskContext from "./TaskContext";

const INITIAL_TASKS = [
  {
    id: 1,
    task: "Buy groceries",
    due: "2023-01-10",
    isDone: false,
    list: "Inbox"
  },
  {
    id: 2,
    task: "Finish project proposal",
    due: "2023-01-07",
    isDone: true,
    list: "Inbox"
  },
  {
    id: 3,
    task: "Attend yoga class",
    due: "2023-01-14",
    isDone: false,
    list: "Inbox"
  },
  {
    id: 4,
    task: "Call dentist for appointment",
    due: "2023-01-14",
    isDone: false,
    list: "Inbox"
  },
  {
    id: 5,
    task: "Submit expense report",
    due: "2023-01-23",
    isDone: true,
    list: "Inbox"
  }
];

const defaultTaskState = {
  tasks: INITIAL_TASKS
}

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      const updatedTasks = [...state.tasks, action.newTask];
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case "TOGGLE_TASK": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.taskId ? { ...task, isDone: !task.isDone } : task
      );
      
      return {
        ...state,
        tasks: updatedTasks
      }
    }
    default:
      console.log(`default`);
      return state;
  }
}

const TaskProvider = props => {

  const [taskState, taskDispatchAction] = useReducer(taskReducer, defaultTaskState)  

  const addTaskHandler = newTask => {
    taskDispatchAction({type: 'ADD_TASK', newTask: newTask});
  };  

  const toggleTaskHandler = taskId => {
    taskDispatchAction({type: 'TOGGLE_TASK', taskId: taskId})
  };

 function sortTasks(tasks) {
    return tasks.sort((a, b) => {
      if (a.due === null && b.due === null) {
        return 0;
      }
      if (a.due === null) {
        return -1;
      }
      if (b.due === null) {
        return 1;
      }
      return new Date(a.due) - new Date(b.due);
    });
  } 

  const sortTaskHandler = () => {
    const sortedTask = sortTasks(taskState.tasks);
    return sortedTask;
  }

  const taskContext = {
    tasks: taskState.tasks,
    addTask: addTaskHandler,
    toggleTask: toggleTaskHandler,
    getSortedTasks: sortTaskHandler, 
  }

  return <TaskContext.Provider value={taskContext}>{props.children}</TaskContext.Provider>;
}

export default TaskProvider;