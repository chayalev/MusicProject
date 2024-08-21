import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../css/LoginComponent.css'; // Ensure the path to the CSS file is correct
import { URL } from '../config';

const LoginComponent = ({  loginType, setShowLoginPopup, navigate }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (loginType === 'user' && (!userName || !email || !isValidEmail(email))) {
      Swal.fire('Login Failed', 'Please enter a valid userName and email.', 'error');
      return;
    } 
    else if (loginType === 'singer' && (!userName || !password)) {
      Swal.fire('Login Failed', 'Please enter a valid userName and password.', 'error');
      return;
    }

    try {
      let response;
      let loginUrl;

      if (loginType === 'user') 
      {
        response = await axios.post(`${URL}/users/userLogin`, { userName, email });
        loginUrl = `/user/${response.data.userId}`;
      }
       else if (loginType === 'singer') {
        response = await axios.post(`${URL}/singers/singerLogin`, { userName, password });
        loginUrl = `/singer/${response.data.singerId}`;
      }

      const userDetails = response.data;

      sessionStorage.setItem('currentUser', JSON.stringify(userDetails));

      setShowLoginPopup(false);
      Swal.fire('Login Successful!', 'Welcome back!', 'success').then(() => {
        navigate(loginUrl);
      });
    } 
    catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire('Login Failed', 'Endpoint not found', 'error');
      } else if (error.response && error.response.status === 401) {
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid credentials',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Register',
          cancelButtonText: 'Try Again'
        }).then((result) => {
          if (result.isConfirmed) {
            if (loginType === 'user') {
              setShowLoginPopup(false); // Close login popup before showing registration popup
              showUserRegistrationPopup();
            } else if (loginType === 'singer') {
              setShowLoginPopup(false); // Close login popup before navigating to singer form
              navigate('/singerForm');
            }
          }
        });
      } else {
        console.error('Error logging in:', error);
        Swal.fire('Login Failed', 'An error occurred. Please try again later.', 'error');
      }
    }
  };

  const showUserRegistrationPopup = () => {
    Swal.fire({
      title: 'Register as User',
      html: `
        <input type="text" id="registerUsername" class="swal2-input" placeholder="userName">
        <input type="email" id="registerEmail" class="swal2-input" placeholder="Email">
      `,
      showCancelButton: true,
      confirmButtonText: 'Register',
      preConfirm: async () => {
        const userName = Swal.getPopup().querySelector('#registerUsername').value;
        const email = Swal.getPopup().querySelector('#registerEmail').value;
        if (!userName || !email || !isValidEmail(email)) {
          Swal.showValidationMessage('Please enter a valid userName and email');
        }
        return { userName, email };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${URL}/users`, result.value); // Ensure the URL is correct for registration
          console.log("response.data", response.data.userId);
          const userDetails = response.data;
          sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
          Swal.fire('Registration Successful!', 'You can now log in.', 'success').then(() => {
            const loginUrl = `/user/${response.data.userId}`; // Set URL for navigation after registration
            navigate(loginUrl);
          });
        } catch (error) {
          console.error('Error registering:', error);
          Swal.fire('Registration Failed', 'An error occurred. Please try again later.', 'error');
        }
      }
    });
  };

  return (
    <div className="popup-background">
      <div className="popup-content">
        <span className="close-btn" onClick={() => setShowLoginPopup(false)}>&times;</span>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label htmlFor="loginUsername">userName</label>
            <input
              type="text"
              id="loginUsername"
              className="input-field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          {loginType === 'user' && (
            <div className="input-group">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                id="loginEmail"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          {loginType === 'singer' && (
            <div className="input-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="btn">Login</button>
        </form>
        <button
          className="btn register-btn"
          onClick={() => {
            if (loginType === 'user') {
              setShowLoginPopup(false); // Close login popup before showing registration popup
              showUserRegistrationPopup();
            } else if (loginType === 'singer') {
              setShowLoginPopup(false); // Close login popup before navigating to singer form
              navigate('/newSinger');
            }
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
