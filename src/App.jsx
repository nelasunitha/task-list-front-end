import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './components/TaskList';
// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const kbaseURL = 'http://127.0.0.1:5000';
// const tasks = axios.get('http://127.0.0.1:5000/tasks')
// console.log(tasks)

const convertFromApi = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete,
  };

  delete newTask.is_complete;
  return newTask;
};

const getAllTasksApi = () => {
  return axios
    .get(`${kbaseURL}/tasks`)
    .then((response) => {
      const apiTasks = response.data;
      console.log('ap', apiTasks);
      const newTasks = apiTasks.map(convertFromApi);
      return newTasks;
    })
    .catch((error) => {
      console.log(error);
    });
};

const App = () => {
  const [taskData, setTaskData] = useState([]);
  // useEffect(() => {
  //   getAllTasksApi();
  // }, []);

  useEffect(() => {
    getAllTasksApi()
      .then((tasks) => {
        setTaskData(tasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleCompleteTask = (id) => {
    // const task = taskData.find((task) => task.id === id);
    // if (task) {
    //   axios.patch(`http://localhost:5000/tasks/${id}`, { isComplete: !task.isComplete })
    //     .then((response) => {
    setTaskData((prevTaskData) =>
      prevTaskData.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      })
    );
    //     })
    //     .catch((error) => {
    //       console.error('Error updating task:', error);
    //     });
    // }
  };

  const handleDeleteTask = (id) => {
    //   axios.delete(`http://localhost:5000/tasks/${id}`)
    //     .then(() => {
    setTaskData(taskData.filter((task) => task.id !== id));
    // })
    //     .catch((error) => {
    //       console.error('Error deleting task:', error);
    //     });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            onTaskClickCallback={handleCompleteTask}
            onTaskDeleteCallback={handleDeleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
