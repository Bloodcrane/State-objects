import React, { useState, useCallback } from 'react';
import './App.css';

function Task({ task, onComplete, onDelete }) {
  console.log(`Rendering Task: ${task}`);
  
  return (
    <li>
      {task}
      <button onClick={onComplete}>Finish</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

const MemoizedTask = React.memo(Task);

function App() {
  const [newTask, setNewTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTodoList(prevList => [...prevList, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = useCallback((index, isCompleted) => {
    if (isCompleted) {
      setCompletedList(prevList => prevList.filter((_, i) => i !== index));
    } else {
      setTodoList(prevList => prevList.filter((_, i) => i !== index));
    }
  }, []);

  const completeTask = useCallback((index) => {
    const task = todoList[index];
    setTodoList(prevList => prevList.filter((_, i) => i !== index));
    setCompletedList(prevList => [...prevList, task]);
  }, [todoList]);

  return (
    <div className="App">
      <div className="column">
        <h2>To-Do</h2>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {todoList.map((task, index) => (
            <MemoizedTask
              key={index}
              task={task}
              onComplete={() => completeTask(index)}
              onDelete={() => deleteTask(index, false)}
            />
          ))}
        </ul>
      </div>
      <div className="column">
        <h2>Completed</h2>
        <ul>
          {completedList.map((task, index) => (
            <MemoizedTask
              key={index}
              task={task}
              onComplete={() => deleteTask(index, true)}
              onDelete={() => deleteTask(index, true)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
