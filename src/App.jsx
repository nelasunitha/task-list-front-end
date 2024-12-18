import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList.jsx';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  // lift state up to App component
  const [taskData, setTaskData] = useState(TASKS);

  const handleCompleteTask = (id) => {
    setTaskData(
      taskData.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      })
    );
  };

  const handleDeleteTask = (id) => {
    setTaskData(taskData.filter((task) => task.id !== id));
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={taskData} // Updated prop name
              onTaskClickCallback={handleCompleteTask} // Updated prop name
              onTaskDeleteCallback={handleDeleteTask} // Updated prop name
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
