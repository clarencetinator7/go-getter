import React from 'react';
import './App.css';
import TaskPanel from './components/Layout/Main Panel/TaskPanel';
import Sidebar from './components/Layout/Sidebar/Sidebar';

function App() {
  return (
    <div className='parent-container'>
      <Sidebar />
      <TaskPanel />
    </div>
  );
}

export default App;
