import React, { useEffect, useState } from 'react'; 
import { getTodos, deleteTodo, updateTodo } from '../../services/todoService';
import TodoItem from './TodoItem';
import './Todos.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);  // State to keep track of the Todo being edited

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleStatusChange = async (id, status) => {
    const updatedTodo = await updateTodo(id, { status });
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo); // Set the todo being edited
  };

  const handleSaveEdit = async (id, updatedTitle) => {
    const updatedTodo = await updateTodo(id, { title: updatedTitle });
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    setEditingTodo(null); // Clear the editing state after saving
  };

  const handleCancelEdit = () => {
    setEditingTodo(null); // Clear the editing state without saving
  };

  return (
    <div className="todo-list">
      <h2>Your Todos</h2>
      {todos.map((todo) => (
        <TodoItem 
          key={todo._id} 
          todo={todo} 
          onDelete={handleDelete} 
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          editingTodo={editingTodo}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
