import React, {useState} from 'react';
import './App.css';
import TaskProvider from './components/Layout/Context/TaskProvider';
import TaskPanel from './components/Layout/Main Panel/TaskPanel';
import Sidebar from './components/Layout/Sidebar/Sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const faIcons = {
  bars: <FontAwesomeIcon icon={faBars} className="bars-icon" />,
};


function App() {
  
  const [currDisplayed, setDisplayed] = useState('INBOX');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const setDisplayedHandler = (display) => {
    setDisplayed(display);
  }

  return (
    <TaskProvider>
      <div className="parent-container">
        <div className="top-bar">
          <div className="top-bar__left">
            <span className="top-bar__left__icon" onClick={() => {setSidebarOpen(!sidebarOpen)}}>
              {faIcons.bars}
            </span>
            <span className="top-bar__left__title">
              Go-Getter
            </span>
          </div>
        </div>
        <Sidebar setDisplay={setDisplayedHandler} displayed={currDisplayed} sidebarOpen={sidebarOpen} setSidebar={setSidebarOpen}/>
        <TaskPanel displayed={currDisplayed} />
      </div>
    </TaskProvider>
  );
}

export default App;
