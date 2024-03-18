import React, { useState } from 'react';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
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

  const moveToInProgress = (index) => {
    const task = todoList[index];
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodoList);
    setInProgressList([...inProgressList, task]);
  };

  const moveToToDo = (index) => {
    const task = inProgressList[index];
    const updatedInProgressList = inProgressList.filter((_, i) => i !== index);
    setInProgressList(updatedInProgressList);
    setTodoList([...todoList, task]);
  };

  const completeTask = (index) => {
    const task = inProgressList[index];
    const updatedInProgressList = inProgressList.filter((_, i) => i !== index);
    setInProgressList(updatedInProgressList);
    setCompletedList([...completedList, task]);
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
          {todoList.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => moveToInProgress(index)}>Move to In Progress</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="columnInprogress">
        
        <h2>In Progress</h2>
        <ul>
          {inProgressList.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => moveToToDo(index)}>Move to To-Do</button>
              <button onClick={() => completeTask(index)}>Complete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="columnCompleted">
        <h2>Completed</h2>
        <ul>
          {completedList.map((task, index) => (
            <li key={index}>
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
