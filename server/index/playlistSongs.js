//playlistSongs.js
import {getPlaylistSongs, postPlaylistSong,deletePlaylistSong} from '../database/playlistSongsDB.js';
import express from "express";
const route = express.Router();

//getPlaylist
route.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const playlistSongs = await getPlaylistSongs(id);
        console.log("playlistSongs "+playlistSongs);
        if (!playlistSongs) {
            return res.sendStatus(404);
        }
        res.send(playlistSongs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// //postPlaylistSong
// route.post('/', async (req, res) => {
//     try {
//         console.log('ani po');
//         const { songId, playlistId } = req.body;
//         console.log(" songId, playlistId", songId, playlistId);
        
//         console.log(songId+" "+playlistId);
//         await postPlaylistSong({ songId, playlistId });
//         // const playlistSong = await getPlaylist(req.body.playlistId); 
//         // res.status(201).send(playlist);
//     } 
//     catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// postPlaylistSong
route.post('/', async (req, res) => {
    try {
        console.log('ani po');
        const { songId, playlistId } = req.body;
        console.log(" songId, playlistId", songId, playlistId);

        if (!songId || !playlistId) {
            throw new Error('Missing songId or playlistId');
        }

        console.log(songId + " " + playlistId);
        await postPlaylistSong({ songId, playlistId });

        res.status(201).json({ message: 'Song added to playlist successfully' });
    } catch (err) {
        console.error('Error in postPlaylistSong:', err.message);
        res.status(400).json({ message: err.message });
    }
});

route.delete('/:playlistId/:songId', async (req, res) => {
    try {
        const { songId, playlistId } = req.params;
        await deletePlaylistSong(songId, playlistId);
        res.status(200).json({ message: 'PlaylistSong deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




export default route;
