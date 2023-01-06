import React from "react";

import style from './Sidebar.module.css'

/* FONT AWESOME IMPORTS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faInbox, faCalendarWeek, faChevronDown } from '@fortawesome/free-solid-svg-icons'


const faIcons = {
  day: <FontAwesomeIcon icon={faCalendarDay} className={style["nav-icon"]} />,
  inbox: <FontAwesomeIcon icon={faInbox} className={style["nav-icon"]} />,
  calendarWeek: <FontAwesomeIcon icon={faCalendarWeek} className={style["nav-icon"]} />,
  chevronDown: <FontAwesomeIcon icon={faChevronDown} className={style["drop-icon"]} />,
};

const Sidebar = () => {

  return(
    <nav className={style.sidebar}>
      <div className={style["sidebar__logo-container"]}>
        <span>GO-GETTER</span>
      </div>
      <ul className={style.sidebar__nav}>
        <li className={style["nav__nav-item"]}>
          <span className={style["nav-link"]}>
            {faIcons.day}
            Today
          </span>
        </li>
        <li className={style["nav__nav-item"]}>
          <span className={style["nav-link"]}>
          {faIcons.inbox}
            Inbox
          </span>
        </li>
        <li className={style["nav__nav-item"]}>
          <span className={style["nav-link"]}>
          {faIcons.calendarWeek}
            Next 7 Days
          </span>
        </li>
        <li className={`${style["nav__nav-item"]} ${style["task-lists"]} ${style.active}`}>
          {faIcons.chevronDown}
          Lists
          <ul className={style["sub-list"]}>
            <li className={style["sub-list-item"]}>
              # Chores
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );

};

export default Sidebar;