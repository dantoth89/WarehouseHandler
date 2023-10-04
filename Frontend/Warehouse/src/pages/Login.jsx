import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import '../css/Login.css';


function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

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
      const response = await fetch('http://localhost:5213/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippetData),
      });
      console.info(snippetData);

      if (response.ok) {
        setIsSuccessPopupOpen(true); 
        console.info('Ok');
      } else {
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
        <div className="snippetInfo">
          <label htmlFor="name">User name:</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="snippetInfo">
          <label htmlFor="language">Password:</label>
          <input
            type="text"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>       
          <button className="btn" type="submit">Login</button>         
      </form>     
    </div>
  );
}

export default Login;
