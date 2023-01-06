import React from "react";

import style from './Sidebar.module.css'

const Sidebar = () => {

  return(
    <nav className="sidebar">
      <div className="sidebar__logo-container">
        <span>GO-GETTER</span>
      </div>
      <ul className="sidebar__nav">
        <li className="nav__nav-item">
          <a className="nav-link">
          {/* INSERT ICON HERE */}
            Today
          </a>
        </li>
        <li className="nav__nav-item">
          <a className="nav-link">
          {/* INSERT ICON HERE */}
            Inbox
          </a>
        </li>
        <li className="nav__nav-item">
          <a className="nav-link">
          {/* INSERT ICON HERE */}
            Next 7 Days
          </a>
        </li>
        <li className="nav__nav-item task-lists">
          {/* INSERT ICON HERE */}
          Lists
          <ul className="sub-list">
            <li className="sub-list-item">
              # Chores
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );

};

export default Sidebar;