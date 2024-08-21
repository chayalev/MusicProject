import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/HomePage.css'; // CSS File
import checkAuthorization from './CheckService.jsx';
import { URL } from '../config.js';

const HomePage = ({  }) => {
  const [userCount, setUserCount] = useState(0);
  const [songCount, setSongCount] = useState(0);
  const [singerCount, setSingerCount] = useState(0);
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
  }, [ ]);

  const fetchCounts = async () => {
    try {
      const userResponse = await axios.get(`${URL}/users/count`);
      const songResponse = await axios.get(`${URL}/songs/count/${currentUser.userId}`);
      const singerResponse = await axios.get(`${URL}/singers/count/${currentUser.userId}`);

      animateCount(userResponse.data.count, setUserCount);
      animateCount(songResponse.data.count, setSongCount);
      animateCount(singerResponse.data.count, setSingerCount);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  const animateCount = (end, setState) => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setState(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
  };

  return (
    <div className="home-page">
      <div className="count-container">
        <div className="count-box">
          <h2>כמות המשתמשים</h2>
          <p>{userCount}</p>
        </div>
        <div className="count-box">
          <h2>כמות השירים</h2>
          <p>{songCount}</p>
        </div>
        <div className="count-box">
          <h2>כמות הזמרים</h2>
          <p>{singerCount}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
