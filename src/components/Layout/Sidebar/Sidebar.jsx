import React from "react";

import style from './Sidebar.module.css'

const Sidebar = () => {

  return(
    <nav className={style.sidebar}>
      <div className={style["sidebar__logo-container"]}>
        <span>GO-GETTER</span>
      </div>
      <ul className={style.sidebar__nav}>
        <li className={style["nav__nav-item"]}>
          <span className={style["nav-link"]}>
          {/* INSERT ICON HERE */}
            Today
          </span>
        </li>
        <li className={style["nav__nav-item"]}>
          <span className={style["nav-link"]}>
          {/* INSERT ICON HERE */}
            Inbox
          </span>
        </li>
        <li className={style["nav__nav-item"]}>
          <span className={style["nav-link"]}>
          {/* INSERT ICON HERE */}
            Next 7 Days
          </span>
        </li>
        <li className={`${style["nav__nav-item"]} ${style["task-lists"]}`}>
          {/* INSERT ICON HERE */}
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