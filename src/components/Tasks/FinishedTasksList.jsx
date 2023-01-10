import React from 'react';

import style from './FinishedTasksList.module.css'

const FinishedTasksList = (props) => {
  
  

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