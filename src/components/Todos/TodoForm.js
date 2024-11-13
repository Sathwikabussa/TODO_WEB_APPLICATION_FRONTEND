import React, { useState } from 'react';
import { createTodo } from '../../services/todoService';
import './Todos.css';

const TodoForm = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        const newTodo = await createTodo({ title }); // Assuming the API call is correct
        onTodoAdded(newTodo); // Pass the new todo to the parent component
        setTitle(''); // Clear the input field
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        className="add-todo-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button className="add-button" type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
