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
  {
    id: 1,
    list: "Chores",
    tasksCount: 1
  },
  {
    id: 2,
    list: "Self-care",
    tasksCount: 2
  },
  {
    id: 3,
    list: "Work",
    tasksCount: 1
  },
]

const defaultTaskState = {
  tasks: INITIAL_TASKS,
  lists: INITIAL_LIST,
}

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      // it creates a new array with the existing tasks and the new task
      // it then returns a new state object with the updated tasks
      const updatedTasks = [...state.tasks, action.newTask];

      const listName = action.newTask.list;

      const updatedLists = state.lists.map(list => list.list === listName ? {...list, tasksCount: list.tasksCount + 1} : list);

      return {
        tasks: updatedTasks,
        lists: updatedLists,
      };
    }
    case "DELETE_TASK": {
      // it creates a new array with the existing tasks
      // except the one with the it that matches the taskId
      // it then returns a new state object with the updated tasks
      const updatedTask = state.tasks.filter(task => action.taskId !== task.id);
      return {
        ...state,
        tasks: updatedTask
      }
    }
    case "TOGGLE_TASK": {
      // let updatedLists = {};

      /* THIS IS MY FIRST SOLUTION IN COUNTING AND UPDATING THE TASK */
      /* DONT REMOVE FOR EDUCTATIONAL PURPOSES */

      // const updatedTasks = state.tasks.map((task) => {
      //   if (task.id === action.taskId) {
      //     const taskUpdate =  {
      //       ...task,
      //       isDone: !task.isDone,
      //       finishedDate: task.isDone ? null : moment().format("YYYY-MM-DD"),
      //     }

      //     // Get the listName of the updated task
      //     const listName = taskUpdate.list;
      //     // Map through the state.lists and look for the specific list
      //     // to update the count if the task is toggled.
      //     // to only count the UNFINISHED TASKS
      //     updatedLists = state.lists.map((list) =>
      //       // If it matches list name and it already has a 'finishedDate'
      //       // (It indicates that the task is DONE)
      //       // if so, it decrements the task count on the given list
      //       listName === list.list && taskUpdate.finishedDate
      //         ? { ...list, tasksCount: list.tasksCount - 1 }
      //       //If the task's finishedDate is set to 'null'
      //       //Increment the count
      //         : listName === list.list && !taskUpdate.finishedDate
      //         ? { ...list, tasksCount: list.tasksCount + 1 }
      //         : list
      //     );

      //     return taskUpdate;
      //   } else {
      //     return task;
      //   }
      // });

      // it creates a new array with the existing tasks
      // it maps through the tasks array and if the task id matches the taskId
      // it modifies the task object with the new 'isDone' value based on the reverse of the current value
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.taskId
          ? {
              ...task,
              isDone: !task.isDone,
              finishedDate: task.isDone ? null : moment().format("YYYY-MM-DD"),
            }
          : task
      );

      // Get the list name of the updated task from 'updatedTasks' arr
      const listName = updatedTasks.find(task => task.id === action.taskId).list;
      // Count the finished task with the same listName
      const tasksCount = updatedTasks.filter(task => task.list === listName && !task.isDone).length;
      // Update the taskCount of the list
      const updatedLists = state.lists.map(item => item.list === listName ? {...item, tasksCount: tasksCount} : item);

      return {
        tasks: updatedTasks,
        lists: updatedLists,
      }
    }
    case "ADD_LIST": {
      // similar to ADD_TASK

      const newList = { ...action.newList, tasksCount: 0 };

      const updatedList = [...state.lists, newList];
      return {
        ...state,
        lists: updatedList
      }
    }
    case "DELETE_LIST": {
      //Get the list name using the listId
      //It maps through the lists array and if the list id matches the action.listId
      const listName = state.lists.find(list => list.id === action.listId).list;

      // similar to DELETE_TASK
      const updatedList = state.lists.filter(list => action.listId !== list.id);

      //Delete all the tasks that belong to the list with the listName
      const updatedTasks = state.tasks.filter(task => task.list !== listName);

      //Update all the tasks that belong to the list with the listName
      //Change it to the default list 'Inbox'
      // const updatedTasks = state.tasks.map((task) =>
      //   task.list === listName ? { ...task, list: "Inbox" } : task );

      return {
        tasks: updatedTasks,
        lists: updatedList
      }
    }
    case "CHANGE_LIST": {
      // It maps through the tasks array and if the task id matches the taskId
      // it modifies the task object with the new 'list' value based on the action.newList
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.taskId ? { ...task, list: action.newList } : task 
      );
      // Update the taskCount for the list
      // It maps through the lists array and if the list name matches the action.newList
      // it modifies the list object with the new 'tasksCount' value based on the current value + 1
      // if the list name matches the action.currList
      // it modifies the list object with the new 'tasksCount' value based on the current value - 1
      // otherwise it returns the list object as is
      const updatedLists = state.lists.map((list) =>
        list.list === action.newList
          ? { ...list, tasksCount: list.tasksCount + 1 }
          : list.list === action.currList
          ? { ...list, tasksCount: list.tasksCount - 1 }
          : list
      );

      return {
        tasks: updatedTasks,
        lists: updatedLists
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

  //function that sorts tasks by due date
  // the overdue tasks are sorted to the top of the list
  // the tasks with no due are next on the list
  // the tasks with due dates are sorted by due date
  const sortTasks = (tasks) => {
    const overdueTasks = tasks.filter(
      (task) => task.due !== null && moment(task.due).isBefore(moment(), "day")
    );
    const noDueTasks = tasks.filter((task) => task.due === null);
    const sortedTasks = tasks
      .filter(
        (task) =>
          task.due !== null && moment(task.due).isSameOrAfter(moment(), "day")
      )
      .sort((a, b) => new Date(a.due) - new Date(b.due));
    return [...overdueTasks, ...noDueTasks, ...sortedTasks];
  };

  //sort function for finished tasks
  const sortFinishedTasks = (tasks) => {
    const sortedTasks = tasks
      .filter((task) => task.isDone === true)
      .sort((a, b) => new Date(b.finishedDate) - new Date(a.finishedDate));
    return sortedTasks;
  };

  const sortTaskHandler = () => {
    const todoTasks = sortTasks(taskState.tasks.filter((task) => task.isDone === false));
    const doneTasks = sortFinishedTasks(taskState.tasks);
    return {todo: todoTasks, done: doneTasks};
  }

  const addListHandler = (newList) => {
    taskDispatchAction({type: 'ADD_LIST', newList: newList})
  }

  const changeListHandler = (taskId, list, currList) => {
    taskDispatchAction({type: 'CHANGE_LIST', newList: list, taskId: taskId, currList: currList})
  }

  const deleterListHandler = (listId) => {
    taskDispatchAction({type: 'DELETE_LIST', listId: listId})
  }
  
  const taskContext = {
    tasks: taskState.tasks,
    lists: taskState.lists,
    addTask: addTaskHandler,
    deleteTask: deleteTaskHandler,
    toggleTask: toggleTaskHandler,
    getTasks: sortTaskHandler(),
    addList: addListHandler,
    changeList: changeListHandler,
    deleteList: deleterListHandler,
  }

  return <TaskContext.Provider value={taskContext}>{props.children}</TaskContext.Provider>;
}

export default TaskProvider;