import React, { useState } from 'react';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTodoList([...todoList, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index, isCompleted) => {
    if (isCompleted) {
      const updatedCompletedList = completedList.filter((_, i) => i !== index);
      setCompletedList(updatedCompletedList);
    } else {
      const updatedTodoList = todoList.filter((_, i) => i !== index);
      setTodoList(updatedTodoList);
    }
  };

  const completeTask = (index) => {
    const task = todoList[index];
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodoList);
    setCompletedList([...completedList, task]);
  };

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
            <li key={index}>
              {task}
              <button onClick={() => completeTask(index)}>Finish</button>
              <button onClick={() => deleteTask(index, false)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="column">
        <h2>Completed</h2>
        <ul>
          {completedList.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => deleteTask(index, true)}>Remove</button>
              <button onClick={() => setTodoList([...todoList, task])}>Copy to To-Do</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
