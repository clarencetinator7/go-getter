import moment from "moment/moment";
import React, {useReducer} from "react";
import TaskContext from "./TaskContext";

const INITIAL_TASKS = [
  {
    id: 1,
    task: "Buy groceries",
    list: "Chores",
    due: "2023-01-10",
    isDone: false,
    finishedDate: null 
  },
  {
    id: 2,
    task: "Finish project proposal",
    list: "Inbox",
    due: "2023-01-07",
    isDone: true,
    finishedDate: "2023-01-08" 
  },
  {
    id: 3,
    task: "Attend yoga class",
    list: "Self-care",
    due: "2023-01-14",
    isDone: false,
    finishedDate: null 
  },
  {
    id: 4,
    task: "Call dentist for appointment",
    list: "Self-care",
    due: "2023-01-14",
    isDone: false,
    finishedDate: null 
  },
  {
    id: 5,
    task: "Submit expense report",
    list: "Work",
    due: "2023-01-23",
    isDone: true,
    finishedDate: "2023-01-12"
  }
];

const INITIAL_LIST = [
  'Chores',
  'Self-care',
  'Work',
]

const defaultTaskState = {
  tasks: INITIAL_TASKS,
  lists: INITIAL_LIST
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
    case "DELETE_TASK": {
      const updatedTask = state.tasks.filter(task => action.taskId !== task.id);
      return {
        ...state,
        tasks: updatedTask
      }
    }
    case "TOGGLE_TASK": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.taskId
          ? {
              ...task,
              isDone: !task.isDone,
              finishedDate: task.isDone ? null : moment().format("YYYY-MM-DD"),
            }
          : task
      );

      console.log(updatedTasks);
      
      return {
        ...state,
        tasks: updatedTasks
      }
    }
    case "ADD_LIST": {
      const updatedList = state.lists.concat(action.newList);
      return {
        ...state,
        lists: updatedList
      }
    }
    case "CHANGE_LIST": {
      // const taskIndex = state.tasks.findIndex(task => task.id === action.taskId);
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.taskId ? { ...task, list: action.newList } : task 
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
  
  const deleteTaskHandler = taskId => {
    taskDispatchAction({type: 'DELETE_TASK', taskId: taskId})
  }

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

  const addListHandler = (newList) => {
    taskDispatchAction({type: 'ADD_LIST', newList: newList})
  }

  const changeListHandler = (taskId, list) => {
    taskDispatchAction({type: 'CHANGE_LIST', newList: list, taskId: taskId})
  }

  const taskContext = {
    tasks: taskState.tasks,
    lists: taskState.lists,
    addTask: addTaskHandler,
    deleteTask: deleteTaskHandler,
    toggleTask: toggleTaskHandler,
    getSortedTasks: sortTaskHandler, 
    addList: addListHandler,
    changeList: changeListHandler,
  }

  return <TaskContext.Provider value={taskContext}>{props.children}</TaskContext.Provider>;
}

export default TaskProvider;