
// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// import { getAllSingers, getSinger, getSingerById, postSinger,deletePassword, deleteSinger, updateSinger, postPass,getPasswordBySingerId,updatePassword,countSingers,getTopSinger } from '../database/singersDB.js';
// import { fileURLToPath } from 'url'; // אם אתה משתמש ב-ESM modules
// import { constants } from 'buffer';
// import { log } from 'console';

// const __filename = fileURLToPath(import.meta.url); // אם אתה משתמש ב-ESM modules
// const __dirname = path.dirname(__filename); // אם אתה משתמש ב-ESM modules

// const route = express.Router();

// // הגדרת הנתיב המלא לתיקיית uploads
// const uploadsDir = path.join(__dirname, 'uploads');

// // בדוק אם התיקייה קיימת ואם לא, צור אותה
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // הגדרת Multer למיקום העלאת הקבצים
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir); // תיקיית יעד להעלאת קבצים
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // שם הקובץ עם חותמת זמן
//   }
// });

// const upload = multer({ storage: storage });


// // Get all singers
// route.get('/', async (req, res) => {
//   try {
//     const singers = await getAllSingers();
//     if (!singers) {
//       return res.sendStatus(404);
//     }
//     res.send(singers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get singer by ID
// route.get('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const singer = await getSingerById(id);
//     if (!singer) {
//       return res.sendStatus(404);
//     }
//     res.send(singer);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get singer by ID and password
// route.post('/singerLogin', async (req, res) => {
//   try {
//     console.log('ani po')
//     console.log(req.body)
//     const { userName, password } = req.body;
//     const singer = await getSinger(userName, password);
//     console.log("singer יקרק",singer)
//     if (!singer) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     res.send(singer);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// route.post('/verify-password', async (req, res) => {
//   try {
//     const { id, password } = req.body;
//     const singer = await getSinger(id, password);
//     if (singer) {
//       res.json({ valid: true });
//     } else {
//       res.json({ valid: false });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // Create new singer

// // יצירת זמר חדש
// route.post('/', upload.single('pictureUrl'), async (req, res) => {
//   try {
//     const { singerName, singerPhone, profile, password } = req.body;
//     const pictureUrl = req.file ? `/uploads/${req.file.filename}` : ''; // יצירת נתיב מלא לתמונה
//     const newSinger = await postSinger({ singerName, singerPhone, pictureUrl, profile });
//     await postPass(newSinger.singerId, password);
//     const data = await getSinger(newSinger.singerName, password);
//     res.status(201).send(data);
//   } catch (err) {
//     console.error('Error adding new singer:', err);
//     res.status(400).json({ message: err.message });
//   }
// });



// // Delete singer by ID
// route.delete('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     await deletePassword(id);
//     await deleteSinger(id);
//     res.status(200).json({ message: 'Singer deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create singer password
// route.post('/:id/password', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const password = req.body.password;
//     await postPass(id, password);
//     res.status(201).json({ message: 'Password created successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// // Get the password by singer ID
// route.get('/:id/password', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const password = await getPasswordBySingerId(id);
//     if (!password) {
//       return res.sendStatus(404);
//     }
//     res.json({ password });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /// Update singer (including password)
// route.put('/:id', upload.single('pictureUrl'), async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log("req.body",req.body);
//     const { singerName, singerPhone, profile, password } = req.body;
//     const pictureUrl = req.file ? `/uploads/${req.file.filename}` : req.body.pictureUrl;
//     console.log("pictureUrl",pictureUrl);
//     console.log("pictureUrl22",req.body.pictureUrl)

//     const updatedSinger = { singerName, singerPhone, profile, pictureUrl };

//     // Update singer details
//     const singer = await updateSinger(id, updatedSinger);
    
//     // Update password if provided
//     if (password) {
//       await updatePassword(id, password);
//     }

//     // Return response to client
//     console.log(singer);
//     res.status(200).json(singer);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// // route.get('/count', async (req, res) => {
// //   try {
// //     const [result] = await pool.query('SELECT COUNT(*) as count FROM singers');
// //     res.json(result[0]);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // Endpoint לספירת זמרים
// route.get('/count/:userId', async (req, res) => {
//   try {
//     const singerCount = await countSingers();
//     res.json({ count: singerCount });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// route.get('/favorite-singer/:userId', async (req, res) => {
//   try {
//     console.log("fdvsdacxSCD");
//     const favoriteSinger = await getTopSinger();
//     if (!favoriteSinger) {
//       return res.sendStatus(404);
//     }
//     res.send(favoriteSinger);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// export default route;

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAllSingers,getSinger, getSingerById, postSinger, deletePassword, deleteSinger, updateSinger, postPass, getPasswordBySingerId, updatePassword, countSingers, getTopSinger } from '../database/singersDB.js';
import { fileURLToPath } from 'url';
import { constants } from 'buffer';
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

// פונקציה לבדיקת תקינות נתונים ליצירת זמר חדש
function validateSinger(singer) {
  const singerSchema = Joi.object({
    singerName: Joi.string().required(),
    singerPhone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    profile: Joi.string().required(),
    password:Joi.required(),
    pictureUrl: Joi.any()
  });
  return singerSchema.validate(singer);
}




route.post('/', upload.single('pictureUrl'), async (req, res) => {
  try {
    const { singerName, singerPhone, profile, password } = req.body;
    const pictureUrl = req.file ? `/uploads/${req.file.filename}` : '';

    // בדיקת תקינות הנתונים שנקלטו
    const { error } = validateSinger({ singerName, singerPhone, profile, password, pictureUrl });
    if (error) {
      console.log("error",error.message);
      return res.status(400).json({ message: error.details[0].message });
    }

    const newSinger = await postSinger({ singerName, singerPhone, pictureUrl, profile });
    await postPass(newSinger.singerId, password);
    const data = await getSinger(newSinger.singerName, password);
    res.status(201).send(data);
  } catch (err) {
    console.error('Error adding new singer:', err);
    res.status(400).json({ message: err.message });
  }
});

route.get('/', async (req, res) => {
  try {
    const singers = await getAllSingers();
    if (!singers) {
      return res.sendStatus(404);
    }
    res.send(singers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const singer = await getSingerById(id);
    if (!singer) {
      return res.sendStatus(404);
    }
    res.send(singer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.post('/singerLogin', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const singer = await getSinger(userName, password);
    if (!singer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.send(singer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.post('/verify-password', async (req, res) => {
  try {
    const { id, password } = req.body;
    const singer = await getSinger(id, password);
    if (singer) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deletePassword(id);
    await deleteSinger(id);
    res.status(200).json({ message: 'Singer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.post('/:id/password', async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;
    await postPass(id, password);
    res.status(201).json({ message: 'Password created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get('/:id/password', async (req, res) => {
  try {
    const id = req.params.id;
    const password = await getPasswordBySingerId(id);
    if (!password) {
      return res.sendStatus(404);
    }
    res.json({ password });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.put('/:id', upload.single('pictureUrl'), async (req, res) => {
  try {
    const id = req.params.id;
    const { singerName, singerPhone, profile, password } = req.body;
    const pictureUrl = req.file ? `/uploads/${req.file.filename}` : req.body.pictureUrl;
    const updatedSinger = { singerName, singerPhone, profile, pictureUrl };

    const singer = await updateSinger(id, updatedSinger);
    
    if (password) {
      await updatePassword(id, password);
    }

    res.status(200).json(singer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get('/count/:userId', async (req, res) => {
  try {
    const singerCount = await countSingers();
    res.json({ count: singerCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

route.get('/favorite-singer/:userId', async (req, res) => {
  try {
    const favoriteSinger = await getTopSinger();
    if (!favoriteSinger) {
      return res.sendStatus(404);
    }
    res.send(favoriteSinger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default route;

