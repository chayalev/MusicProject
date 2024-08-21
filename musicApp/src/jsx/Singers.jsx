import React, { useState, useEffect } from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/Singers.css';
import { URL } from '../config';

const Singers = () => {
  const [singers, setSingers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const allSingers = () => {
    axios.get(`${URL}/singers`)
      .then(response => {
        setSingers(response.data);
      })
      .catch(error => {
        console.error('Error fetching singers:', error);
      });
  };

  useEffect(() => {
    allSingers();
  }, []);

  const handleSingerClick = (singerId) => {
    const basePath = location.pathname.split('/').slice(0, 3).join('/'); // This will give you "/user/113"
    navigate(`${basePath}/songs?singerId=${singerId}`, { replace: true });
    //navigate(`user/${ JSON.parse(sessionStorage.getItem('currentUser')).userId}/songs?singerId=${singerId}`, { replace: true });
  };

  return (
    <div className="singers-container">
      <h1>זמרים</h1>
      <div className="singers-list">
        {singers.map((singer) => {
          const pictureUrl = singer.pictureUrl ? `${URL}${singer.pictureUrl}` : 'default-image-url';
          return (
            <div key={singer.singerId} className="singer-card" onClick={() => handleSingerClick(singer.singerId)}>
              <img src={pictureUrl} alt={singer.singerName} />
              <h2>{singer.singerName}</h2>
              <div className="popup-description">
              <p>{singer.profile}</p>
                <p><strong>טלפון:</strong> {singer.singerPhone}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Singers;
