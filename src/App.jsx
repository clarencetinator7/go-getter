import React, {useState} from 'react';
import './App.css';
import TaskProvider from './components/Layout/Context/TaskProvider';
import TaskPanel from './components/Layout/Main Panel/TaskPanel';
import Sidebar from './components/Layout/Sidebar/Sidebar';

function App() {
  
  const [currDisplayed, setDisplayed] = useState('INBOX');

  const setDisplayedHandler = (display) => {
    setDisplayed(display);
  }

  return (
    <TaskProvider>
      <div className="parent-container">
        <Sidebar setDisplay={setDisplayedHandler} displayed={currDisplayed}/>
        <TaskPanel displayed={currDisplayed} />
      </div>
    </TaskProvider>
  );
}

export default App;
