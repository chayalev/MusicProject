// // Register.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../css/Register.css';

// const URL = 'http://localhost:8080';

// const Register = () => {
//   const navigate = useNavigate();
//   const [singer, setSinger] = useState({
//     singerName: '',
//     singerPhone: '',
//     profile: '',
//     password: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSinger({
//       ...singer,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios.post(`${URL}/singers`, singer)
//       .then(response => {
//         const singerId = response.data.id;
//         navigate(`/singers/${singerId}`);
//       })
//       .catch(error => {
//         console.error('Error during registration:', error);
//       });
//   };

//   return (
//     <div className="register-form-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="singerName"
//           value={singer.singerName}
//           placeholder="Name"
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="text"
//           name="singerPhone"
//           value={singer.singerPhone}
//           placeholder="Phone"
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="text"
//           name="profile"
//           value={singer.profile}
//           placeholder="Profile"
//           onChange={handleInputChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={singer.password}
//           placeholder="Password"
//           onChange={handleInputChange}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
