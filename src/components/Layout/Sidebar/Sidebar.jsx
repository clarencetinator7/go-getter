import React, { useContext, useState } from "react";

import style from './Sidebar.module.css'

/* FONT AWESOME IMPORTS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faInbox, faCalendarWeek, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import TaskContext from "../Context/TaskContext";


const faIcons = {
  day: <FontAwesomeIcon icon={faCalendarDay} className={style["nav-icon"]} />,
  inbox: <FontAwesomeIcon icon={faInbox} className={style["nav-icon"]} />,
  calendarWeek: <FontAwesomeIcon icon={faCalendarWeek} className={style["nav-icon"]} />,
  chevronDown: <FontAwesomeIcon icon={faChevronDown} className={style["drop-icon"]} />,
};

const Sidebar = (props) => {

  const taskCtx = useContext(TaskContext);

  const [isListOpen, setIsListOpen] = useState(false);
  
  const displayList = taskCtx.lists.map(item => {return <li key={item} className={style['list-item']}>{item}</li>});

  return (
    <nav className={style.sidebar}>
      <div className={style["sidebar__logo-container"]}>
        <span>GO-GETTER</span>
      </div>
      <ul className={style.sidebar__nav}>
        <li
          className={`${style["nav__nav-item"]} ${
            props.displayed === "TODAY" ? style.active : ""
          }`}
          onClick={() => {
            props.setDisplay("TODAY");
          }}
        >
          <span className={style["nav-link"]}>
            {faIcons.day}
            Today
          </span>
        </li>
        <li
          className={`${style["nav__nav-item"]} ${props.displayed === 'INBOX' ? style.active : ''}`}
          onClick={() => {
            props.setDisplay("INBOX");
          }}
        >
          <span className={style["nav-link"]}>
            {faIcons.inbox}
            Inbox
          </span>
        </li>
        <li
          className={`${style["nav__nav-item"]} ${props.displayed === 'NEXTWEEK' ? style.active : ''}`}
          onClick={() => {
            props.setDisplay("NEXTWEEK");
          }}
        >
          <span className={style["nav-link"]}>
            {faIcons.calendarWeek}
            Next 7 Days
          </span>
        </li>
      </ul>
      <div className={style['task-list']}>
          <span className={style["task-list__header"]}>List</span>
          <ul className="list">
            {displayList}
            <li>
              <input type="text" placeholder="Add List :>" />
            </li>
          </ul>
      </div>
    </nav>
  );

};

export default Sidebar;