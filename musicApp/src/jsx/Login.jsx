// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../css/Login.css';

// const URL = 'http://localhost:8080';

// const Login = () => {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ id: '', password: '' });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({ ...credentials, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios.post(`${URL}/singers/login`, { id: credentials.id, password: credentials.password })
//       .then(response => {
//         const singer = response.data;
//         console.log(singer)
//         navigate(`/singer/${singer.singerId}`);
//       })
//       .catch(error => {
//         console.error('Error during login:', error);
//         alert('Invalid credentials. Please try again.');
//       });
//   };

//   return (
//     <div className="login-form-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="id"
//           value={credentials.id}
//           placeholder="Singer ID"
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={credentials.password}
//           placeholder="Password"
//           onChange={handleInputChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

const URL = 'http://localhost:8080';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ id: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
     e.preventDefault();

      axios.post(`${URL}/singers/login`, { id: credentials.id, password: credentials.password })
      .then(response => {
        const singer = response.data;
        console.log(singer)
        navigate(`/singer/${singer.singerId}`);
      })
      .catch(error => {
        console.error('Error during login:', error);
        alert('Invalid credentials. Please try again.');
      });
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={credentials.id}
          placeholder="Singer ID"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/singer')}>Register</button>
    </div>
  );
};

export default Login;
