import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/UserForm.css';
import { URL } from '../config';



const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    email: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`${URL}/users/${id}`)
        .then(response => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      userName: user.userName,
      email: user.email
    };

    if (id) {
      axios.put(`${URL}/users/${id}`, formData)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    } else {
      axios.post(`${URL}/users`, formData)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Error adding user:', error);
        });
    }
  };

  return (
    <div className="user-form-container">
      <h2>{id ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          value={user.userName || ''}
          placeholder="Name"
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          value={user.email || ''}
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        <button type="submit">{id ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
