import React from 'react';
import './App.css';
import TaskProvider from './components/Layout/Context/TaskProvider';
import TaskPanel from './components/Layout/Main Panel/TaskPanel';
import Sidebar from './components/Layout/Sidebar/Sidebar';

function App() {
  return (
    <TaskProvider>
      <div className="parent-container">
        <Sidebar />
        <TaskPanel />
      </div>
    </TaskProvider>
  );
}

export default App;
