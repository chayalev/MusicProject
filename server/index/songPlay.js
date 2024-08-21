import express from 'express';
import { addSongPlay } from '../database/songPlayDB.js';

const route = express.Router();

// Add new song play
route.post('/', async (req, res) => {
    console.log( req.body)
    const { userId, songId, playDate } = req.body;
   
    if (!songId || !playDate) {
        console.log("try")
        return res.status(400).json({ error: 'Missing required fields' });
    }
 
    try {
       // console.log("try")
        const result = await addSongPlay(userId, songId, playDate);
        if (result.success) {
            res.status(200).json({ message: 'Song play recorded successfully', insertId: result.insertId });
        } else {
            res.status(500).json({ error: 'Failed to record song play', details: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred', details: error });
    }
});

export default route;
