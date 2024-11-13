import React, { useState, useEffect } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import './Todos.css';


const TodoItem = ({ todo, onDelete, onStatusChange, onEdit, editingTodo, onSaveEdit, onCancelEdit }) => {
  const [newTitle, setNewTitle] = useState(todo.title);

  // If the todo is being edited, update the title field
  useEffect(() => {
    if (editingTodo && editingTodo._id === todo._id) {
      setNewTitle(editingTodo.title);
    }
  }, [editingTodo, todo]);

  const handleSave = () => {
    onSaveEdit(todo._id, newTitle);
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  const handleStatusChange = (e) => {
    onStatusChange(todo._id, e.target.value);
  };

  return (
    <div className="todo-item">
      {editingTodo && editingTodo._id === todo._id ? (
        <div className="edit-todo">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <>
          <span>{todo.title}</span>
          <div className="todo-edit-status">
            <select value={todo.status} onChange={handleStatusChange}>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
              <option value="completed">Completed</option>
            </select>
            <CiEdit className="edit-icon" onClick={() => onEdit(todo)} />
            <MdDeleteOutline className="delete-icon" onClick={() => onDelete(todo._id)} />
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
