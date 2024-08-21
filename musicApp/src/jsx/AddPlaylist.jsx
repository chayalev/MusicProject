
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/AddPlaylist.css';
import { URL } from '../config';


function AddPlaylist({  onClose, playlistToEdit }) {
    const [playlistName, setPlaylistName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [songs, setSongs] = useState([]);//כל השירים הקיימים
    const [selectedSongs, setSelectedSongs] = useState([]);//השירים שנבחרו כעת
    const [songsBeforeUpdate, setSongsBeforeUpdate] = useState([]);//השירים לפני העריכה

    useEffect(() => {
        // טעינת כל השירים הקיימים
        const fetchSongs = async () => {
            try {
                console.log("URL", URL);
                const response = await axios.get(`${URL}/songs`);
                setSongs(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();

        // מילוי שדות אם עורכים פלייליסט קיים
        if (playlistToEdit) {
            setPlaylistName(playlistToEdit.playlistName);
            setIsPublic(playlistToEdit.isPublic);
            fetchPlaylistSongs(playlistToEdit.playlistId);
        }
    }, [playlistToEdit]);

    //טעינת השירים שנבחרו לפליליסט הנוכחי לפני העריכה
    // const fetchPlaylistSongs = async (playlistId) => {
    //     try {
    //         const response = await axios.get(`${URL}/playlistSongs/${playlistId}`);

    //         console.log('Playlist Songs Response:', response.data);

    //         let playlistSongs = [];

    //         // בדיקה אם הנתונים הם מערך או אובייקט
    //         if (Array.isArray(response.data)) {
    //             playlistSongs = response.data;
    //         } else if (response.data.playlistSongs) {
    //             playlistSongs = response.data.playlistSongs;
    //         } else {
    //             // אם הנתונים הם אובייקט בודד
    //             playlistSongs = [response.data];
    //         }

    //         const selectedSongIds = playlistSongs.map(song => song.songId);
    //         setSelectedSongs(selectedSongIds);
    //         setSongsBeforeUpdate(selectedSongIds);
    //         console.log("SelectedSongs "+selectedSongs);
    //     } 
    //     catch (error) {
    //         if (error.response && error.response.status === 404) {
    //             // אם השירים לא נמצאו - הצגת הודעה נוחה למשתמש
    //             console.log('לא נמצאו שירים עבור הפלייליסט הנבחר');
    //             // טיפול נוסף במצב כאן, לדוגמה ניתן להציג הודעת שגיאה במקרה הצורך
    //         } else {
    //             // טיפול בשגיאות אחרות
    //             console.error('שגיאה בקריאת השירים של הפלייליסט:', error);
    //         }
    //     }
    // };
    const fetchPlaylistSongs = async (playlistId) => {
        try {
            const response = await axios.get(`${URL}/playlistSongs/${playlistId}`);
            console.log('Playlist Songs Response:', response.data);

            let playlistSongs = [];

            // בדיקה אם הנתונים הם מערך של שירים או אובייקט של שיר
            if (Array.isArray(response.data)) {
                playlistSongs = response.data;
            } else if (response.data.playlistSongs) {
                // אם יש אובייקט של שירים במערך
                playlistSongs = response.data.playlistSongs;
            } else {
                // אם הנתונים הם אובייקט בודד של שיר
                playlistSongs = [response.data];
            }

            const selectedSongIds = playlistSongs.map(song => song.songId);
            setSelectedSongs(selectedSongIds);
            setSongsBeforeUpdate(selectedSongIds);
            console.log("SelectedSongs: ", selectedSongs);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('לא נמצאו שירים עבור הפלייליסט הנבחר');
                // טיפול נוסף במצב כאן, לדוגמה ניתן להציג הודעת שגיאה במקרה הצורך
            } else {
                console.error('שגיאה בקריאת השירים של הפלייליסט:', error);
            }
        }
    };


    const getCurrentUserId = () => {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        return currentUser ? currentUser.userId : null;
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     if (playlistToEdit) {
    //         try {
    //             // עריכת פלייליסט קיים
    //             const updatedPlaylist = {
    //                 playlistId: playlistToEdit.playlistId,
    //                 playlistName: playlistName,
    //                 isPublic: isPublic
    //             };

    //             // שליחת הפלייליסט המעודכן לשרת
    //             await axios.put(`${URL}/playlists/${playlistToEdit.playlistId}`, updatedPlaylist);

    //             // עדכון שירים של הפלייליסט
    //             const songsToAdd = selectedSongs.filter(songId => !songsBeforeUpdate.includes(songId));
    //             const songsToRemove = songsBeforeUpdate.filter(songId => !selectedSongs.includes(songId));

    //             console.log("songsToAdd " + songsToAdd);
    //             console.log("songsToRemove " + songsToRemove);

    //             // שליחת השירים להוספה
    //             for (const songId of songsToAdd) {
    //                 await axios.post(`${URL}/playlistSongs`, { songId, playlistId: playlistToEdit.playlistId });
    //             }

    //             // שליחת השירים להסרה
    //             for (const songId of songsToRemove) {
    //                 await axios.delete(`${URL}/playlistSongs/${playlistToEdit.playlistId}/${songId}`);
    //             }

    //             console.log("סיימתי את הפור");

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'הפלייליסט עודכן בהצלחה!',
    //                 text: 'הפרטים של הפלייליסט עודכנו בהצלחה 😊',
    //             }).then(() => {
    //                 onClose(); // סגירת המודל לאחר עדכון מוצלח
    //             });
    //         } catch (error) {
    //             console.error('Error updating playlist:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'שגיאה בעדכון הפלייליסט',
    //                 text: 'נסה שוב מאוחר יותר',
    //             });
    //         }
    //     } else {
    //         try {
    //             // הוספת פלייליסט חדש
    //             const newPlaylist = {
    //                 playlistName: playlistName,
    //                 userId: getCurrentUserId(),
    //                 isPublic: isPublic
    //             };

    //             // שליחת הפלייליסט החדש לשרת
    //             const response = await axios.post(`${URL}/playlists`, newPlaylist);
    //             const createdPlaylist = response.data;

    //             // הוספת השירים לפלייליסט החדש
    //             for (const songId of selectedSongs) {
    //                 await axios.post(`${URL}/playlistSongs`, {
    //                     songId: songId,
    //                     playlistId: createdPlaylist.playlistId
    //                 });
    //             }

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'הפלייליסט נוסף בהצלחה!',
    //                 text: 'הפלייליסט שלך נוסף בהצלחה 😊',
    //             }).then(() => {
    //                 onClose(); // סגירת המודל לאחר הוספה מוצלחת
    //             });
    //         } catch (error) {
    //             console.error('Error adding playlist:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'שגיאה בהוספת הפלייליסט',
    //                 text: 'נסה שוב מאוחר יותר',
    //             });
    //         }
    //     }
    // };

    //עובד ההוספה והמחיקה הסוויט אלרט לא עובד
    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     if (playlistToEdit) {
    //         try {
    //             const updatedPlaylist = {
    //                 playlistId: playlistToEdit.playlistId,
    //                 playlistName: playlistName,
    //                 isPublic: isPublic,
    //             };

    //             await axios.put(`${URL}/playlists/${playlistToEdit.playlistId}`, updatedPlaylist);

    //             const songsToAdd = selectedSongs.filter(songId => !songsBeforeUpdate.includes(songId));
    //             const songsToRemove = songsBeforeUpdate.filter(songId => !selectedSongs.includes(songId));

    //             // שליחת השירים להוספה
    //             await Promise.all(songsToAdd.map(songId =>
    //                 axios.post(`${URL}/playlistSongs`, { songId, playlistId: playlistToEdit.playlistId })
    //             ));

    //             // שליחת השירים להסרה
    //             await Promise.all(songsToRemove.map(songId =>
    //                 axios.delete(`${URL}/playlistSongs/${playlistToEdit.playlistId}/${songId}`)
    //             ));

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'הפלייליסט עודכן בהצלחה!',
    //                 text: 'הפרטים של הפלייליסט עודכנו בהצלחה 😊',
    //             }).then(() => {
    //                 onClose();
    //             });

    //         } catch (error) {
    //             console.error('Error updating playlist:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'שגיאה בעדכון הפלייליסט',
    //                 text: 'נסה שוב מאוחר יותר',
    //             });
    //         }
    //     } else {
    //         try {
    //             const newPlaylist = {
    //                 playlistName: playlistName,
    //                 isPublic: isPublic,
    //                 userId: getCurrentUserId(),
    //             };

    //             const response = await axios.post(`${URL}/playlists`, newPlaylist);
    //             const createdPlaylist = response.data;

    //             await Promise.all(selectedSongs.map(songId =>
    //                 axios.post(`${URL}/playlistSongs`, { playlistId: createdPlaylist.playlistId, songId })
    //             ));

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'הפלייליסט נוסף בהצלחה!',
    //                 text: 'הפלייליסט שלך נוסף בהצלחה 😊',
    //             }).then(() => {
    //                 onClose();
    //             });

    //         } catch (error) {
    //             console.error('Error adding playlist:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'שגיאה בהוספת הפלייליסט',
    //                 text: 'נסה שוב מאוחר יותר',
    //             });
    //         }
    //     }
    // };


    //עובד רק אחרי עידכון עם הערה
    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     if (playlistToEdit) {
    //         try {
    //             const updatedPlaylist = {
    //                 playlistId: playlistToEdit.playlistId,
    //                 playlistName: playlistName,
    //                 isPublic: isPublic,
    //             };

    //             await axios.put(`${URL}/playlists/${playlistToEdit.playlistId}`, updatedPlaylist);

    //             const songsToAdd = selectedSongs.filter(songId => !songsBeforeUpdate.includes(songId));
    //             const songsToRemove = songsBeforeUpdate.filter(songId => !selectedSongs.includes(songId));

    //             // שליחת השירים להוספה
    //             const addPromises = songsToAdd.map(songId =>
    //                 axios.post(`${URL}/playlistSongs`, { songId, playlistId: playlistToEdit.playlistId })
    //                     .catch(error => console.error(`Error adding song ${songId}:`, error))
    //             );

    //             // שליחת השירים להסרה
    //             const removePromises = songsToRemove.map(songId =>
    //                 axios.delete(`${URL}/playlistSongs/${playlistToEdit.playlistId}/${songId}`)
    //                     .catch(error => console.error(`Error removing song ${songId}:`, error))
    //             );

    //             await Promise.all([...addPromises, ...removePromises]);

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'הפלייליסט עודכן בהצלחה!',
    //                 text: 'הפרטים של הפלייליסט עודכנו בהצלחה 😊',
    //             }).then(() => {
    //                 onClose();
    //             });

    //         } catch (error) {
    //             console.error('Error updating playlist:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'שגיאה בעדכון הפלייליסט',
    //                 text: 'נסה שוב מאוחר יותר',
    //             });
    //         }
    //     } else {
    //         try {
    //             const newPlaylist = {
    //                 playlistName: playlistName,
    //                 isPublic: isPublic,
    //                 userId: getCurrentUserId(),
    //             };

    //             const response = await axios.post(`${URL}/playlists`, newPlaylist);
    //             const createdPlaylist = response.data;

    //             const addPromises = selectedSongs.map(songId =>
    //                 axios.post(`${URL}/playlistSongs`, { playlistId: createdPlaylist.playlistId, songId })
    //                     .catch(error => console.error(`Error adding song ${songId}:`, error))
    //             );

    //             await Promise.all(addPromises);

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'הפלייליסט נוסף בהצלחה!',
    //                 text: 'הפלייליסט שלך נוסף בהצלחה 😊',
    //             }).then(() => {
    //                 onClose();
    //             });

    //         } catch (error) {
    //             console.error('Error adding playlist:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'שגיאה בהוספת הפלייליסט',
    //                 text: 'נסה שוב מאוחר יותר',
    //             });
    //         }
    //     }
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     console.log('Handling submit');

    //     if (playlistToEdit) {
    //         try {
    //             const updatedPlaylist = {
    //                 playlistId: playlistToEdit.playlistId,
    //                 playlistName: playlistName,
    //                 isPublic: isPublic,
    //             };

    //             console.log('Updating playlist', updatedPlaylist);

    //             await axios.put(`${URL}/playlists/${playlistToEdit.playlistId}`, updatedPlaylist);

    //             const songsToAdd = selectedSongs.filter(songId => !songsBeforeUpdate.includes(songId));
    //             const songsToRemove = songsBeforeUpdate.filter(songId => !selectedSongs.includes(songId));

    //             console.log('Songs to add:', songsToAdd);
    //             console.log('Songs to remove:', songsToRemove);

    //             const addPromises = songsToAdd.map((songId) => {
    //                 console.log(`Adding songId: ${songId}, playlistId: ${playlistToEdit.playlistId}`);
    //                 return axios.post(`${URL}/playlistSongs`, { songId, playlistId: playlistToEdit.playlistId });
    //             });

    //             const removePromises = songsToRemove.map((songId) => {
    //                 console.log(`Removing songId: ${songId}, playlistId: ${playlistToEdit.playlistId}`);
    //                 return axios.delete(`${URL}/playlistSongs/${playlistToEdit.playlistId}/${songId}`);
    //             });

    //             // Wait for all add and remove operations to complete
    //             // await Promise.all([...addPromises, ...removePromises]);

    //             console.log('All songs updated');

    //             // Display Swal alert after all operations complete
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'הפלייליסט עודכן בהצלחה!',
    //                 text: 'הפרטים של הפלייליסט עודכנו בהצלחה 😊',
    //             }).then(() => {
    //                 console.log('Swal alert closed');
    //                 onClose();
    //             });

    //         } catch (error) {
    //             console.error('Error updating playlist:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'שגיאה בעדכון הפלייליסט',
    //                 text: 'נסה שוב מאוחר יותר',
    //             });
    //         }
    //     } else {
    //         try {
    //             const newPlaylist = {
    //                 playlistName: playlistName,
    //                 isPublic: isPublic,
    //                 userId: getCurrentUserId(),
    //             };

    //             console.log('Creating new playlist', newPlaylist);

    //             const source = 'client'; // זיהוי הקריאה מהלקוח

    //             const response = await axios.post(`${URL}/playlists`, { ...newPlaylist, source });
    //             // const response = await axios.post(`${URL}/playlists`, newPlaylist);
    //             const createdPlaylist = response.data;

    //             console.log('New playlist created', createdPlaylist);

    //             const addPromises = selectedSongs.map((songId) => {
    //                 console.log(`Adding songId: ${songId}, playlistId: ${createdPlaylist.playlistId}`);
    //                 return axios.post(`${URL}/playlistSongs`, { playlistId: createdPlaylist.playlistId, songId });
    //             });

    //             // Wait for all add operations to complete
    //             // await Promise.all(addPromises);////////////////////////////////////////היה מותר לי להוריד את זה? אין אוויט עכשיו...

    //             console.log('All songs added');

    //             // Display Swal alert after all operations complete
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'הפלייליסט נוסף בהצלחה!',
    //                 text: 'הפלייליסט שלך נוסף בהצלחה 😊',
    //             }).then(() => {
    //                 console.log('Swal alert closed');
    //                 onClose();
    //             });

    //         } catch (error) {
    //             console.error('Error adding playlist:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'שגיאה בהוספת הפלייליסט',
    //                 text: 'נסה שוב מאוחר יותר',
    //             });
    //         }
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        console.log('Handling submit');
    
        if (playlistToEdit) {
            try {
                const updatedPlaylist = {
                    playlistId: playlistToEdit.playlistId,
                    playlistName: playlistName,
                    isPublic: isPublic,
                };
    
                console.log('Updating playlist', updatedPlaylist);
    
                await axios.put(`${URL}/playlists/${playlistToEdit.playlistId}`, updatedPlaylist);
    
                const songsToAdd = selectedSongs.filter(songId => !songsBeforeUpdate.includes(songId));
                const songsToRemove = songsBeforeUpdate.filter(songId => !selectedSongs.includes(songId));
    
                console.log('Songs to add:', songsToAdd);
                console.log('Songs to remove:', songsToRemove);
    
                const addPromises = songsToAdd.map((songId) => {
                    console.log(`Adding songId: ${songId}, playlistId: ${playlistToEdit.playlistId}`);
                    return axios.post(`${URL}/playlistSongs`, { songId, playlistId: playlistToEdit.playlistId });
                });
    
                const removePromises = songsToRemove.map((songId) => {
                    console.log(`Removing songId: ${songId}, playlistId: ${playlistToEdit.playlistId}`);
                    return axios.delete(`${URL}/playlistSongs/${playlistToEdit.playlistId}/${songId}`);
                });
    
                // Wait for all add and remove operations to complete
                await Promise.all([...addPromises, ...removePromises]);
    
                console.log('All songs updated');
    
                // Display Swal alert after all operations complete
                Swal.fire({
                    icon: 'success',
                    title: 'הפלייליסט עודכן בהצלחה!',
                    text: 'הפרטים של הפלייליסט עודכנו בהצלחה 😊',
                }).then(() => {
                    console.log('Swal alert closed');
                    onClose();
                });
    
            } catch (error) {
                console.error('Error updating playlist:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה בעדכון הפלייליסט',
                    text: 'נסה שוב מאוחר יותר',
                });
            }
        } else {
            try {
                const newPlaylist = {
                    playlistName: playlistName,
                    isPublic: isPublic,
                    userId: getCurrentUserId(),
                };
    
                console.log('Creating new playlist', newPlaylist);
    
                const source = 'client'; // זיהוי הקריאה מהלקוח
    
                const response = await axios.post(`${URL}/playlists`, { ...newPlaylist, source });
                const createdPlaylist = response.data;
    
                console.log('New playlist created', createdPlaylist);
    
                const addPromises = selectedSongs.map((songId) => {
                    console.log(`Adding songId: ${songId}, playlistId: ${createdPlaylist.playlistId}`);
                    return axios.post(`${URL}/playlistSongs`, { playlistId: createdPlaylist.playlistId, songId });
                });
    
                // Wait for all add operations to complete
                await Promise.all(addPromises);
    
                console.log('All songs added');
    
                // Display Swal alert after all operations complete
                Swal.fire({
                    icon: 'success',
                    title: 'הפלייליסט נוסף בהצלחה!',
                    text: 'הפלייליסט שלך נוסף בהצלחה 😊',
                }).then(() => {
                    console.log('Swal alert closed');
                    onClose();
                });
    
            } catch (error) {
                console.error('Error adding playlist:', error);
                if (error.response && error.response.data && error.response.data.message === 'שם הפלייליסט "השירים שאהבתי" לא ניתן לשימוש') {
                    Swal.fire({
                        icon: 'error',
                        title: 'שגיאה בהוספת הפלייליסט',
                        text: error.response.data.message,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'שגיאה בהוספת הפלייליסט',
                        text: 'נסה שוב מאוחר יותר',
                    });
                }
            }
        }
    };
    

    const handleCheckboxChange = (songId) => {
        setSelectedSongs((prevSelected) =>
            prevSelected.includes(songId)
                ? prevSelected.filter((id) => id !== songId)
                : [...prevSelected, songId]
        );
    };

    return (
        <div className="add-playlist-container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="playlistName">שם הפלייליסט</label>
                    <input
                        type="text"
                        id="playlistName"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>סטטוס הפלייליסט</label>
                    <div className="radio-buttons">
                        <label>
                            <input
                                type="radio"
                                value="public"
                                checked={isPublic}
                                onChange={() => setIsPublic(true)}
                            />
                            ציבורי
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="private"
                                checked={!isPublic}
                                onChange={() => setIsPublic(false)}
                            />
                            פרטי
                        </label>
                    </div>
                </div>
                <div className="songs-list">
                    <h3>בחר שירים</h3>
                    <div className="scrollable-container">
                        <div className="scrollable-content">
                            {songs.map((song) => {
                                const pictureUrl = song.pictureUrl ? `${URL}${song.pictureUrl}` : 'default-image-url';
                                return (
                                    <div key={song.songId} className="song-item">
                                        <label>
                                            <div className="songs-details">
                                                <div className="song-info">
                                                    <span className="song-name">{song.songName}</span>
                                                    <span className="song-artist">{song.artist}</span>
                                                </div>
                                                <img src={pictureUrl} alt={song.songName} className="song-image" />
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={selectedSongs.includes(song.songId)}
                                                onChange={() => handleCheckboxChange(song.songId)}
                                            />
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="button-group">
                    <button type="submit" className="btn">
                        {playlistToEdit ? 'שמור שינויים' : 'הוסף פלייליסט'}
                    </button>
                    <button type="button" className="btn cancel-btn" onClick={onClose}>
                        ביטול
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddPlaylist;

