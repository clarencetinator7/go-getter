import moment from "moment/moment";
import React, { useContext } from "react";
import FinishedTasksList from "../../Tasks/FinishedTasksList";
import TaskForm from "../../Tasks/TaskForm";
import TaskList from "../../Tasks/TaskList";
import TaskContext from "../Context/TaskContext";
import EmptyState from "../Empty State/EmptyState";

import  ListSvg from "../../../assets/states-svg/list.svg";
import OrganizeSvg  from "../../../assets/states-svg/organize.svg";
import RelaxSvg from "../../../assets/states-svg/relax.svg";

import style from './TaskPanel.module.css';

const TaskPanel = (props) => {
  const taskCtx = useContext(TaskContext);

  const listType = {
    TODAY: {
      name: "🌞 Today",
      filterFn: (item) =>
        (moment(item.due).isSameOrBefore(moment(), "day") || item.due === null) && !item.isDone,
      filterDn: (item) => moment(item.finishedDate).isSame(moment(), "day") && item.isDone,
      isList: false,
      emptyMessage: {
        svg: <img src={RelaxSvg} alt="Relax Img" className={style['list-empty-icon']} />,
        header: 'No tasks for today?',
        message: 'Sit back and enjoy a break, you deserve it.'
      }
    },
    INBOX: {
      name: "📥 Inbox",
      filterFn: (item) => item.list === 'Inbox' && !item.isDone,
      filterDn: (item) => item.list === 'Inbox' && item.isDone && moment(item.finishedDate).isAfter(moment().subtract(7, 'days')),
      isList: false,
      emptyMessage: {
        svg: <img src={OrganizeSvg} alt="Relax Img" className={style['list-empty-icon']}/>,
        header: 'No tasks in your inbox',
        message: 'Great job on keeping your tasks organized!'
      }
    },
    NEXTWEEK: {
      name: "📅 Next Week",
      filterFn: (item) => moment(item.due).isAfter(moment(), "week") && !item.isDone,
      filterDn: (item) => item.isDone,
      isList: false,
      emptyMessage: {
        svg: <img src={RelaxSvg} alt="Relax Img" className={style['list-empty-icon']}/>,
        header: 'No tasks scheduled for next week',
        message: 'you must be ahead of schedule!'
      }
    },
    custom: {
      name: `#${props.displayed}`, 
      filterFn: (item) => item.list === props.displayed && !item.isDone,
      filterDn: (item) => item.list === props.displayed && item.isDone,
      isList: true,
      emptyMessage: {
        svg: <img src={ListSvg} alt="Relax Img" className={style['list-empty-icon']}/>, 
        header: `No tasks on this list`,
        message: 'Use list to categorize your tasks and keep it organized.'
      }
    },
  };

  /* 
    This selects an object from the listType depending on props.displayed
    The object will be destructured into 3 variables:
      name: the name of the list.
      filterFn: function used to filter the tasks.
      isList: it tells if the task displayed is based on a 'custom created list'
  */
  const { name, filterFn, filterDn, isList, emptyMessage } =
    listType[props.displayed] || listType.custom;
  /* 
    After defining the list type, It will filter the tasks from the TaskContext
    with the function provided in the 'filterFn'.
  */
  const filteredTasks = taskCtx.getSortedTasks().filter(filterFn);
  const finishedTasks = taskCtx.tasks.filter(filterDn);
  const isEmpty = filteredTasks.length === 0;
  const isFinEmpty = finishedTasks.length === 0;

  return (
    <main className={style["main-content"]}>
      <div className={style["content-container"]}>
        <div className={style["main-content__header"]}>
          <span className="content-title">{name}</span>
        </div>
        <TaskForm isList={isList} listName={props.displayed} />
        <div className={style["task-container"]}>
          {isEmpty ? (
            <EmptyState emptyMessage={emptyMessage} />
          ) : (
            <TaskList displayedTasks={filteredTasks} />
          )}
          {!isFinEmpty && <FinishedTasksList finishedTasks={finishedTasks} />}
        </div>
      </div>
    </main>
  );
}

export default TaskPanel;