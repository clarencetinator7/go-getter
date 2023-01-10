import React, {useState, useContext} from 'react';

import style from './FinishedTasksList.module.css'
import TaskItem from './TaskItem';
import TaskContext from '../Layout/Context/TaskContext';

/* FONT AWESOME IMPORTS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
//#endregion
const faIcons = {
  chevronDown: <FontAwesomeIcon icon={faChevronDown} className={style["drop-icon"]} />,
}

const FinishedTasksList = (props) => {
  const taskCtx = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const toggleTask = (id) => {
    taskCtx.toggleTask(id);
  };

  const finishedTaskItems = props.finishedTasks.map((item) => {
    return (
      <TaskItem
        key={item.id}
        id={item.id}
        task={item.task}
        due={item.due}
        isDone={item.isDone}
        onToggleHandler={toggleTask}
      />
    );
  });

  return (
    <div className={style["task-list__finished-list"]}>
      <span className={style["list-title"]} onClick={onClickHandler}>
        🎉 Finished Tasks {faIcons.chevronDown}
      </span>
      <ul
        className={`${style["finished-tasks"]} ${
          !isOpen ? style["collapsed"] : ""
        }`}
      >
        {finishedTaskItems}
      </ul>
    </div>
  );
};

export default FinishedTasksList;