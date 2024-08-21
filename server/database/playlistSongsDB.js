import pool from './database.js';

//playlistSongs

//get playlistSongs by Id
export async function getPlaylistSongs(playlistId) {
    const [playlist] = await pool.query(`
    SELECT * FROM playlistsongs
    WHERE playlistId = ?
  `, [playlistId]);
console.log('Playlist:', JSON.stringify(playlist));
    return playlist;
}

//create new playlist
export async function postPlaylistSong(newPlaylistSong) {
console.log(newPlaylistSong);
    await pool.query(`
    INSERT INTO playlistsongs(songId, playlistId)
    VALUES (?, ?)
  `, [newPlaylistSong.songId, newPlaylistSong.playlistId]);
    // return await getPlaylist(newPlaylist.playlistId);// זה בעיה שזה בהערה?
}

// delete playlist by Id
export async function deletePlaylistSong(songId,playlistId) {
    console.log("songId,playlistId",songId,playlistId);
    await pool.query(`
    DELETE FROM playlistsongs
    WHERE songId = ? AND playlistId=?
  `, [songId,playlistId]);
}

// delete all songs from a playlist
export async function deleteAllSongsFromPlaylist(playlistId) {
  console.log("Deleting all songs from playlistId", playlistId);
  await pool.query(`
  DELETE FROM playlistsongs
  WHERE playlistId = ?
`, [playlistId]);
}
