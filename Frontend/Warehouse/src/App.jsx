import { useState,useEffect } from 'react'

import './App.css'

function App() {

  const [test, setTest] = useState([]); 

  const fetchTest = () => {
    fetch(`http://localhost:5213/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      setTest(res);
    });   
  }

  useEffect(() => {
    fetchTest();
  }, []);

  return (
       <div>
      {test.map((user) => (
        <div key={user.userId}>
          <p>id {user.userId}</p>
          <p>name {user.username}</p>
          <p>pass {user.password}</p>
          <p>role {user.role}</p>
          <p>------------</p>
        </div>
      ))}
    </div>
  )
}

export default App