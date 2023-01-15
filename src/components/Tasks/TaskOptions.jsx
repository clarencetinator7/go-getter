import React, { useState, useContext } from "react";
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/themes/material_green.css";
import style from "./TaskOptions.module.css";

import TaskContext from "../Layout/Context/TaskContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faTrash,
  faChevronLeft,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const faIcon = {
  chevronLeft: (
    <FontAwesomeIcon icon={faChevronLeft} className={style.faIcon} />
  ),
  trash: <FontAwesomeIcon icon={faTrash} className={style.faIcon} />,
  ellipsis: <FontAwesomeIcon icon={faEllipsis} className={style.faIcon} />,
  calendarPlus: <FontAwesomeIcon icon={faCalendarPlus} className={style.faIcon} />,
};

const TaskOptions = (props) => {
  const taskCtx = useContext(TaskContext);

  const [optionState, toggleOption] = useState(false);
  const [listOptionState, toggleListOption] = useState(false);

  const optionButtonClickHandler = () => {
    toggleOption(!optionState);
  };

  const deleteTaskHandler = () => {
    taskCtx.deleteTask(props.id);
  };

  const onMouseLeaveOptions = (e) => {
    toggleOption(!optionState);
    toggleListOption(false);
  };

  const changeListHandler = (newList) => {
    taskCtx.changeList(props.id, newList, props.list);
  };

  const listContent = taskCtx.lists.map((item) => (
    <li
      key={item.id}
      id={item.id}
      onClick={() => {changeListHandler(item.list)}}
    >
      {`#${item.list}`}
    </li>
  ));

  // const dateValue = props.due ? moment(props.due).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
  // console.log(dateValue);


  return (
    <div className={style["task-item__options-wrapper"]}>
      <button
        type="button"
        onClick={optionButtonClickHandler}
        className={style.optionsBtn}
      >
        {faIcon.ellipsis}
      </button>
      <div
        className={style["options"]}
        onMouseLeave={onMouseLeaveOptions}
        style={{
          display: optionState ? "block" : "none",
        }}
      >
        <div className={style["datePicker-wrapper"]}>
          {faIcon.calendarPlus}
          <Flatpickr
            className={style.datePicker}
            options={{
              defaultDate: props.due,
              disableMobile: true,
              minDate: "today",
              maxDate: new Date().fp_incr(365),
              // dateFormat: "M-d",
            }}
            // {...moment(props.due).isBefore(moment(), 'day') && {placeholder: "Re-schedule"}}
            placeholder={moment(props.due).isBefore(moment(), 'day') ? "Re-schedule" : "Add due date"}
            
          />
        </div>
        <div
          className={style["list-option"]}
          onClick={() => {
            toggleListOption(!listOptionState);
          }}
        >
          <span className={style.addToListOpt}>
            {faIcon.chevronLeft}
            Add to list
          </span>
          <ul
            className={style["list"]}
            onMouseLeave={() => {
              toggleListOption(!listOptionState);
            }}
            style={{
              display: listOptionState ? "block" : "none",
            }}
          >
            {listContent}
          </ul>
        </div>
        
        <button
          type="button"
          className={style.deleteBtn}
          onClick={deleteTaskHandler}
        >
          {faIcon.trash} Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskOptions;
