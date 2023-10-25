import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5213/user/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.result != null) {
        console.info('Login successful');
        const token = response.data.result;
        localStorage.setItem('jwtToken', token);
        navigate('/products')
      } else {
        alert('Login error');
        console.error('Login error');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="loginContainer">
      <h2 className="titles">Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">User name:</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="language">Password:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>
        <Button variant="contained" className='btn' type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;
