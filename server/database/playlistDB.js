import pool from './database.js';

//playlists

//get playlist by Id
export async function getPlaylist(playlistId) {
    const [[playlist]] = await pool.query(`
    SELECT * FROM playlists
    WHERE playlistId = ?
  `, [playlistId]);
  console.log(playlist)
    return playlist;
}

//create new playlist
// export async function postPlaylist(newPlaylist) {
//   const result = await pool.query(`
//     INSERT INTO playlists(playlistName, userId, isPublic)
//     VALUES (?, ?, ?)
//   `, [newPlaylist.playlistName, newPlaylist.userId, newPlaylist.isPublic]);
//     return await getPlaylist(result[0].insertId);
// }


// export async function postPlaylist(newPlaylist, source) {
// console.log("ani mosif playlist");

//   // בדיקה אם שם הפלייליסט הוא 'השירים שאהבתי' ולא נזמנה מהפונקציה postUser
//   if (newPlaylist.playlistName === 'השירים שאהבתי' && source !== 'postUser') {
//       throw new Error('שם הפלייליסט "השירים שאהבתי" לא ניתן לשימוש');
//   }
  
//   const result = await pool.query(`
//       INSERT INTO playlists(playlistName, userId, isPublic)
//       VALUES (?, ?, ?)
//   `, [newPlaylist.playlistName, newPlaylist.userId, newPlaylist.isPublic]);
//   return await getPlaylist(result[0].insertId);
// }
// postPlaylist function
export async function postPlaylist(newPlaylist, source) {
  try {
      if (source !== 'postUser' && newPlaylist.playlistName === 'השירים שאהבתי') {
          throw new Error('שם הפלייליסט "השירים שאהבתי" לא ניתן לשימוש');
      }

      console.log("In postPlaylist function");
      const result = await pool.query(`
          INSERT INTO playlists(playlistName, userId, isPublic)
          VALUES (?, ?, ?)
      `, [newPlaylist.playlistName, newPlaylist.userId, newPlaylist.isPublic]);

      console.log("Playlist inserted with ID:", result[0].insertId);
      return await getPlaylist(result[0].insertId);
  } catch (error) {
      console.error('Error in postPlaylist:', error);
      throw error;
  }
}

//delete playlist by Id
export async function deletePlaylist(playlistId) {
    await pool.query(`
    DELETE FROM playlists
    WHERE playlistId = ?
  `, [playlistId]);
}

//update playlist 
export async function updatePlaylist(updPlaylist) {
    await pool.query(`
    UPDATE playlists
    SET playlistName = ?, isPublic = ?
    WHERE playlistId = ?
  `, [updPlaylist.playlistName, updPlaylist.isPublic, updPlaylist.playlistId]);
}


//get all playlists by userId
export async function getAllPlaylistsByUserId(userId) {
    const [playlists] = await pool.query(`
    SELECT * FROM playlists
    WHERE userId = ?
  `, [userId]);
    return playlists;
}

//get all public playlists
// export async function getAllPublicPlaylists(userId) {
//   const [playlists] = await pool.query(`
//   SELECT * FROM playlists
//   WHERE isPublic = true AND userId != ?
// `, [userId]);
//   return playlists;
// }
export async function getAllPublicPlaylists(userId) {
  const [playlists] = await pool.query(`
    SELECT playlists.*, users.userName AS creatorName 
    FROM playlists
    JOIN users ON playlists.userId = users.userId
    WHERE playlists.isPublic = true AND playlists.userId != ?
  `, [userId]);
  return playlists;
}


//add Like To playlist
export async function addLikeToPlaylist(playlistId) {
  await pool.query(`
    UPDATE playlists
    SET likes = likes + 1
    WHERE playlistId = ?
  `, [playlistId]);
}