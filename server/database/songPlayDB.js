import pool from './database.js';
import { format } from 'date-fns';

// Insert new song play
export async function addSongPlay(userId, songId, playDate) {
    try {
        const formattedDate = format(new Date(playDate), 'yyyy-MM-dd');
        
        const result = await pool.query(
            `INSERT INTO songplays (userId, songId, playDate) VALUES (?, ?, ?)`,
            [userId, songId, formattedDate]
        );
        return { success: true, insertId: result[0].insertId };
    } catch (error) {
        console.error('Error inserting song play:', error);
        return { success: false, error };
    }
}

// Delete all song plays by songId
export async function deleteSongPlaysBySongId(songId) {
    console.log("hereeee",songId);
    try {
        const result = await pool.query(
            `DELETE FROM songplays WHERE songId = ?`,
            [songId]
        );
        console.log("result",result);
        return { success: true, affectedRows: result[0].affectedRows };
    } catch (error) {
        console.error('Error deleting song plays:', error);
        return { success: false, error };
    }
}