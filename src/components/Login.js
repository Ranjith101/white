import React, { useState } from 'react';
import '../styles/login.css';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (username === 'test' && password === '123456') {
      history.push('/students');
      console.log('Logged in successfully!');
    } else {
      console.log('Invalid credentials!');
    }
  };

  return (
    <div className="login-container">

      <form onSubmit={handleFormSubmit}>
      <h2 className="login-header">Login</h2>
        <div className="login-form-group">
          <label htmlFor="username" className="login-form-label">
            Username:
          </label>
          <input
            type="text"
            className="login-form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-form-label">
            Password:
          </label>
          <input
            type="password"
            className="login-form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="login-btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
