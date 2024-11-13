import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import TodoList from '../components/Todos/TodoList';
import Profile from '../components/Profile/Profile';
import TodoForm from '../components/Todos/TodoForm';
import { FaUserCircle } from "react-icons/fa";

const HomePage = () => {
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  
  const [todos, setTodos] = useState([]);
  
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/login'); // Redirect to login page
  };
   
  

  // Function to handle adding a new todo
  const handleAddTodo = (newTodo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { ...newTodo, id: Date.now() },  // Assuming the server doesn't provide an ID yet
    ]);
  };

 

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to the Todo Web Application</h1>
        <div className="header-right">
          <button onClick={handleLogout}>Logout</button>
          <div className="profile-icon" onClick={() => setIsProfileFormOpen(true)}>
          <FaUserCircle className="icon"/>
          </div>
        </div>
      </header>

        {/* Conditionally render Profile form */}
        {isProfileFormOpen && (
        <div className="profile-overlay">
          <Profile onClose={() => setIsProfileFormOpen(false)} />
        </div>
      )}

      <TodoForm onTodoAdded={handleAddTodo}/>

      <TodoList />
      </div>
  );
};

export default HomePage;



/*import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to the Todo Web Application</h1>
      <p>Manage your daily tasks efficiently with our simple and secure application.</p>
      <div className="homepage-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/todos">Your Todos</Link>
        <Link to="/profile">Your Profile</Link>
      </div>
    </div>
  );
};

export default HomePage;*/
