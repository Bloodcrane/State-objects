import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'BvYs3CkMMI0UR-D-RI-_x8SJ7cFzbvnfclU4P989MnmudT4RyQ';

function App() {
  const [newTask, setNewTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const axiosInstance = axios.create({
    baseURL: 'https://crudapi.co.uk',
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/tasks');
      const tasks = response.data;
      const todoTasks = tasks.filter(task => !task.isCompleted);
      const inProgressTasks = tasks.filter(task => task.isCompleted && !task.tags.includes('completed'));
      const completedTasks = tasks.filter(task => task.isCompleted && task.tags.includes('completed'));

      setTodoList(todoTasks);
      setInProgressList(inProgressTasks);
      setCompletedList(completedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        await axiosInstance.post('/tasks', {
          name: newTask,
          isCompleted: false,
          tags: [],
        });
        fetchTasks();
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const moveToInProgress = async (taskId) => {
    try {
      await axiosInstance.put(`/tasks/${taskId}`, {
        tags: ['inProgress'],
      });
      fetchTasks();
    } catch (error) {
      console.error('Error moving task to in progress:', error);
    }
  };

  const moveToToDo = async (taskId) => {
    try {
      await axiosInstance.put(`/tasks/${taskId}`, {
        tags: [],
      });
      fetchTasks();
    } catch (error) {
      console.error('Error moving task to todo:', error);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await axiosInstance.put(`/tasks/${taskId}`, {
        tags: ['completed'],
      });
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <div className="App">
      <div className="columnTodo">
        <h2>To-Do</h2>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {todoList.map((task) => (
            <li key={task.id}>
              {task.name}
              <button onClick={() => moveToInProgress(task.id)}>Move to In Progress</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="columnInprogress">
        <h2>In Progress</h2>
        <ul>
          {inProgressList.map((task) => (
            <li key={task.id}>
              {task.name}
              <button onClick={() => moveToToDo(task.id)}>Move to To-Do</button>
              <button onClick={() => completeTask(task.id)}>Complete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="columnCompleted">
        <h2>Completed</h2>
        <ul>
          {completedList.map((task) => (
            <li key={task.id}>
              {task.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
