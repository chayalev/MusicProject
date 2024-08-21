

// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { getAllSongs, getAllSongsBySinger, getSong, postSong, deleteSong, updateSong, addLikeToSong, deleteSongFromPlaylists, getTopPlayedSongLastWeek, getMostLikedSongBySinger, getMostPlayedSongBySinger,countSongs } from '../database/songsDB.js';
// import { deleteSongPlaysBySongId } from '../database/songPlayDB.js'
// import {deleteCommentsBySongId} from '../database/commentsDB.js'
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const route = express.Router();

// const uploadsDir = path.join(__dirname, 'uploads');

// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// route.get('/', async (req, res) => {
//   try {
//     const songs = await getAllSongs();
//     if (!songs) {
//       return res.sendStatus(404);
//     }
//     res.send(songs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// route.get('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const song = await getSong(id);
//     if (!song) {
//       return res.sendStatus(404);
//     }
//     res.send(song);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// route.get('/singer/:singerId', async (req, res) => {
//   try {
//     const singerId = req.params.singerId;
//     const songs = await getAllSongsBySinger(singerId);
//     if (!songs) {
//       return res.sendStatus(404);
//     }
//     res.send(songs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// route.post('/', upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'songLink', maxCount: 1 }]), async (req, res) => {
//   try {
//     const newSong = req.body;
//     console.log('New song data received:', newSong);

//     if (req.files) {
//       if (req.files.picture) {
//         newSong.pictureUrl = '/uploads/' + req.files.picture[0].filename;
//       } else {
//         newSong.pictureUrl = '/uploads/default.png'; // Set default image
//       }
//       if (req.files.songLink) {
//         newSong.songLink = '/uploads/' + req.files.songLink[0].filename;
//       }
//     }

//     console.log('Final new song data:', newSong);
//     const createdSong = await postSong(newSong);
//     res.status(201).send(createdSong);
//   } catch (error) {
//     console.error('Error creating song:', error);
//     res.status(400).json({ message: error.message });
//   }
// });

// route.put('/:id', upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'songLink', maxCount: 1 }]), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const existingSong = await getSong(id); // קבל את נתוני השיר הקיימים
//     const updatedSong = req.body;
//     console.log(req.body, req.files);
//     if (req.files) {
//       if (req.files.picture) {
//         updatedSong.pictureUrl = '/uploads/' + req.files.picture[0].filename;
//       } else {
//         updatedSong.pictureUrl = existingSong.pictureUrl; // שמור על תמונה קיימת
//       }
//       if (req.files.songLink) {
//         updatedSong.songLink = '/uploads/' + req.files.songLink[0].filename;
//       } else {
//         updatedSong.songLink = existingSong.songLink; // שמור על קובץ שמע קיים
//       }
//     } else {
//       updatedSong.pictureUrl = existingSong.pictureUrl; // שמור על תמונה קיימת אם אין קבצים חדשים
//       updatedSong.songLink = existingSong.songLink; // שמור על קובץ שמע קיים אם אין קבצים חדשים
//     }

//     await updateSong(id, updatedSong);
//     res.status(200).json({ message: 'Song updated successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// route.delete('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     await deleteSongPlaysBySongId(id)
//     await deleteSongFromPlaylists(id);
//     await deleteCommentsBySongId(id)
//     await deleteSong(id);
//     res.status(200).json({ message: 'Song deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// route.put('/:songId/addLike', async (req, res) => {
//   try {
//     const songId = req.params.songId;
//     console.log("songIdLike", songId);
//     await addLikeToSong(songId);
//     res.status(200).json({ message: 'Song liked successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// route.get('/top/all/:singerId', async (req, res) => {
//   try {
//     const { singerId } = req.params;
//     const [topSong, mostLikedSong, mostPlayedSong] = await Promise.all([
//       getTopPlayedSongLastWeek(singerId),
//       getMostLikedSongBySinger(singerId),
//       getMostPlayedSongBySinger(singerId)
//     ]);
//     res.json({ topSong, mostLikedSong, mostPlayedSong });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Endpoint לספירת שירים
// route.get('/count/:userId', async (req, res) => {
//   try {
//     const songCount = await countSongs();
//     res.json({ count: songCount });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// export default route;

// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { getAllSongs, getAllSongsBySinger, getSong, postSong, deleteSong, updateSong, addLikeToSong, deleteSongFromPlaylists, getTopPlayedSongLastWeek, getMostLikedSongBySinger, getMostPlayedSongBySinger, countSongs } from '../database/songsDB.js';
// import { deleteSongPlaysBySongId } from '../database/songPlayDB.js'
// import { deleteCommentsBySongId } from '../database/commentsDB.js';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllSongs, getAllSongsBySinger, getSong, postSong, deleteSong, updateSong, addLikeToSong, deleteSongFromPlaylists, getTopPlayedSongLastWeek, getMostLikedSongBySinger, getMostPlayedSongBySinger,countSongs } from '../database/songsDB.js';
import { deleteSongPlaysBySongId } from '../database/songPlayDB.js'
import {deleteCommentsBySongId} from '../database/commentsDB.js'
import Joi from 'joi';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const route = express.Router();

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Joi schema for song validation
const songSchema = Joi.object({
  songName: Joi.string().required(),
  description: Joi.string().required(),
  typeId:Joi.required(),
  singerId:Joi.required(),
  likes:Joi.required(),
  songLink: Joi.string().regex(/\.mp3$/).required(),
  pictureUrl: Joi.any()
});

route.get('/', async (req, res) => {
  try {
    const songs = await getAllSongs();
    if (!songs) {
      return res.sendStatus(404);
    }
    res.send(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const song = await getSong(id);
    if (!song) {
      return res.sendStatus(404);
    }
    res.send(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.get('/singer/:singerId', async (req, res) => {
  try {
    const singerId = req.params.singerId;
    const songs = await getAllSongsBySinger(singerId);
    if (!songs) {
      return res.sendStatus(404);
    }
    res.send(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.post('/', upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'songLink', maxCount: 1 }]), async (req, res) => {
  try {
    const newSong = req.body;


    if (req.files) {
      if (req.files.picture) {
        newSong.pictureUrl = '/uploads/' + req.files.picture[0].filename;
      } else {
        newSong.pictureUrl = '/uploads/default.png'; // Set default image
      }
      if (req.files.songLink) {
        newSong.songLink = '/uploads/' + req.files.songLink[0].filename;
      }
    }
    console.log("newSong",newSong);
    // Validate the incoming data using JOI schema
    const { error } = songSchema.validate(newSong);
   
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const createdSong = await postSong(newSong);
    res.status(201).send(createdSong);
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(400).json({ message: error.message });
  }
});

route.put('/:id', upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'songLink', maxCount: 1 }]), async (req, res) => {
  try {
    const { id } = req.params;
    const existingSong = await getSong(id);
    const updatedSong = req.body;

    if (req.files) {
      if (req.files.picture) {
        updatedSong.pictureUrl = '/uploads/' + req.files.picture[0].filename;
      } else {
        updatedSong.pictureUrl = existingSong.pictureUrl; // Keep existing image
      }
      if (req.files.songLink) {
        updatedSong.songLink = '/uploads/' + req.files.songLink[0].filename;
      } else {
        updatedSong.songLink = existingSong.songLink; // Keep existing song file
      }
    } else {
      updatedSong.pictureUrl = existingSong.pictureUrl; // Keep existing image if no new files
      updatedSong.songLink = existingSong.songLink; // Keep existing song file if no new files
    }

    await updateSong(id, updatedSong);
    res.status(200).json({ message: 'Song updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteSongPlaysBySongId(id)
    await deleteSongFromPlaylists(id);
    await deleteCommentsBySongId(id)
    await deleteSong(id);
    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.put('/:songId/addLike', async (req, res) => {
  try {
    const songId = req.params.songId;
    await addLikeToSong(songId);
    res.status(200).json({ message: 'Song liked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.get('/top/all/:singerId', async (req, res) => {
  try {
    const { singerId } = req.params;
    const [topSong, mostLikedSong, mostPlayedSong] = await Promise.all([
      getTopPlayedSongLastWeek(singerId),
      getMostLikedSongBySinger(singerId),
      getMostPlayedSongBySinger(singerId)
    ]);
    res.json({ topSong, mostLikedSong, mostPlayedSong });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to count songs
route.get('/count/:userId', async (req, res) => {
  try {
    const songCount = await countSongs();
    res.json({ count: songCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default route;


