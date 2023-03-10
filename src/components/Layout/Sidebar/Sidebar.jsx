import React from "react";

import style from './Sidebar.module.css'

/* FONT AWESOME IMPORTS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faInbox, faCalendarWeek, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ListFilter from "./ListFilter";


const faIcons = {
  day: <FontAwesomeIcon icon={faCalendarDay} className={style["nav-icon"]} />,
  inbox: <FontAwesomeIcon icon={faInbox} className={style["nav-icon"]} />,
  calendarWeek: <FontAwesomeIcon icon={faCalendarWeek} className={style["nav-icon"]} />,
  chevronDown: <FontAwesomeIcon icon={faChevronDown} className={style["drop-icon"]} />,
};

const Sidebar = (props) => {

  

  return (
    <nav className={`${style.sidebar} ${props.sidebarOpen && style.active}`}>
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
            {faIcons.calendarWeek} Upcoming </span>
        </li>
      </ul>
      <ListFilter setDisplay={props.setDisplay}/>
    </nav>
  );

};

export default Sidebar;