//playlists.js
import {getPlaylist, postPlaylist, deletePlaylist, updatePlaylist, getAllPlaylistsByUserId, getAllPublicPlaylists,addLikeToPlaylist} from '../database/playlistDB.js';
import {deleteAllSongsFromPlaylist} from '../database/playlistSongsDB.js';
import express from "express";
const route = express.Router();

//getPlaylist
route.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const playlist = await getPlaylist(id);
        if (!playlist) {
            return res.sendStatus(404);
        }
        res.send(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//postPlaylist
// route.post('/', async (req, res) => {
//     try {
//         const { playlistName, userId, isPublic } = req.body;
        
//         const playlist = await postPlaylist({ playlistName, userId, isPublic }); 
//         // const playlist = await getPlaylist(req.body.playlistId); 
//         console.log('playlist '+playlist)
//         res.status(201).send(playlist);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });
route.post('/', async (req, res) => {
    try {
        const { playlistName, userId, isPublic, source } = req.body; // קבלת הפרמטר source מהבקשה
        console.log("source",source);
        const newPlaylist = { playlistName, userId, isPublic };
        const playlist = await postPlaylist(newPlaylist, source);
        console.log("playlist",playlist);
        res.status(201).send(playlist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//updatePlaylist
route.put('/:id', async (req, res) => {
    try {
        // const { id } = req.params;
        // const { playlistName, isPublic } = req.body;
        const { playlistId,playlistName, isPublic } = req.body;
        await updatePlaylist({ playlistId, playlistName, isPublic });
        res.status(200).json({ message: 'Playlist updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//deletePlaylist
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteAllSongsFromPlaylist(id);
        await deletePlaylist(id);
        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//getAllPlaylistsByUserId
route.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const playlists = await getAllPlaylistsByUserId(userId);
        res.send(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//getAllPublicPlaylists
route.get('/', async (req, res) => {
    const userId = req.query.userID;
    try {
        console.log('ani po!!!!!!!!!!!!');
        const playlists = await getAllPublicPlaylists(userId);
        res.send(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add like to playlist by ID
route.put('/:playlistId/addLike', async (req, res) => {
    try {
      const playlistId = req.params.playlistId;
      console.log("playlistIdLike", playlistId);
      await addLikeToPlaylist(playlistId);
      res.status(200).json({ message: 'playlist liked successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
export default route;
