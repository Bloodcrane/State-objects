import React, { useState, useCallback, useMemo } from 'react';
import './App.css';

const Task = React.memo(({ task, onComplete, onDelete }) => {
  console.log(`Rendering Task: ${task}`);
  
  return (
    <li>
      {task}
      <button onClick={onComplete}>Finish</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
});

function App() {
  const [newTask, setNewTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const handleInputChange = useCallback((event) => {
    setNewTask(event.target.value);
  }, []);

  const addTask = useCallback(() => {
    if (newTask.trim() !== '') {
      setTodoList(prevList => [...prevList, newTask]);
      setNewTask('');
    }
  }, [newTask]);

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

  const memoizedTodoList = useMemo(() => todoList.map((task, index) => (
    <Task
      key={index}
      task={task}
      onComplete={() => completeTask(index)}
      onDelete={() => deleteTask(index, false)}
    />
  )), [todoList, completeTask, deleteTask]);

  const memoizedCompletedList = useMemo(() => completedList.map((task, index) => (
    <Task
      key={index}
      task={task}
      onComplete={() => deleteTask(index, true)}
      onDelete={() => deleteTask(index, true)}
    />
  )), [completedList, deleteTask]);

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
          {memoizedTodoList}
        </ul>
      </div>
      <div className="column">
        <h2>Completed</h2>
        <ul>
          {memoizedCompletedList}
        </ul>
      </div>
    </div>
  );
}

export default App;
