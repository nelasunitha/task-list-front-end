import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './components/TaskList';
import NewTaskForm from './components/NewTask';
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
const updateTaskApi = (id, isComplete) => {
  const endpoint = isComplete ? 'mark_complete' : 'mark_incomplete';
  return axios
    .patch(`${kbaseURL}/tasks/${id}/${endpoint}`)
    .then((response) => {
      console.log('r', response);
      const newTask = convertFromApi(response.data.task);
      return newTask;
    })
    .catch((error) => {
      console.log(error);
    });
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

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
    const task = taskData.find((task) => task.id === id);
    if (task) {
      updateTaskApi(id, !task.isComplete)
        .then((newTask) => {
          setTaskData((prevTaskData) =>
            prevTaskData.map((task) => (task.id === id ? newTask : task))
          );
        })
        .catch((error) => {
          console.error('Error updating task:', error);
        });
    }
  };
  const handleDeleteTask = (id) => {
    setTaskData(taskData.filter((task) => task.id !== id));
  };
  const handleSubmit = (taskData) => {
    axios.post(`${kbaseURL}/tasks`, taskData)
      .then((result) => {
        setTaskData((prevTasks) => [convertFromApi(result.data), ...prevTasks]);
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <NewTaskForm handleSubmit={handleSubmit}/>
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
