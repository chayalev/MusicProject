import pool from './database.js'

//Singers

//create password
export async function postPass(singerId, password) {
    console.log("db")
    console.log(singerId, password)
    await pool.query('INSERT INTO passwords(singerId,password) VALUES (?, ?)', [singerId,password]);
}


//getAllSingers
export async function getAllSingers() {
    const [singers] = await pool.query(`select * from singers`);
    return singers;
}

//get singer
export async function getSingerById(id) {
    const [[singer]]=await pool.query(`select * from singers where singerId= ?`, [id])
    return singer
     
}


//get Singer by Id and password
export async function getSinger(name, pass) {
    const [[singer]] = await pool.query(`
    SELECT singers.* FROM singers
    JOIN passwords ON singers.singerId = passwords.singerId
    WHERE singers.singerName = ? AND passwords.password = ?
  `, [name, pass]);
    return singer;
}


//create new singer
export async function postSinger(newSinger) {
    console.log(newSinger)
    const result = await pool.query(`insert into singers(singerName, singerPhone, pictureUrl, profile) VALUES (?, ?, ?, ?)`,
        [newSinger.singerName, newSinger.singerPhone, newSinger.pictureUrl, newSinger.profile]);
    return await getSingerById(result[0].insertId);
}
//delete password bySingerId
export async function deletePassword(id) {
    await pool.query(`DELETE FROM passwords WHERE singerId =?`, [id]);
}
//delete singer by Id
export async function deleteSinger(id) {
    await pool.query(`DELETE FROM singers WHERE singerId =?`, [id]);

}


// update singer 
export async function updateSinger(id, updSinger) {
    await pool.query(`
      UPDATE singers
      SET singerName = ?,
      singerPhone = ?,
      profile = ?,
      pictureUrl = ?
      WHERE singerId = ?
    `, [
      updSinger.singerName,
      updSinger.singerPhone,
      updSinger.profile,
      updSinger.pictureUrl,
      id
    ]);
  
    // לאחר העדכון, ביצוע שאילתה נוספת לקבלת פרטי הזמר המעודכנים
    const singer= await getSingerById(id)
    console.log("Singer", singer);
    return singer;
  }
  

// Get password by singer ID
export async function getPasswordBySingerId(singerId) {
    const [[password]] = await pool.query(`SELECT password FROM passwords WHERE singerId = ?`, [singerId]);
    return password;
  }
  
  // Update password
  export async function updatePassword(singerId, newPassword) {
    console.log("singerId, newPassword",singerId, newPassword)
    await pool.query(`UPDATE passwords SET password = ? WHERE singerId = ?`, [newPassword, singerId]);
  }

  // פונקציה לספירת זמרים
export async function countSingers() {
    const [[singer]] = await pool.query('SELECT COUNT(*) as count FROM singers');
    return singer.count; // החזרת מספר הזמרים
}

export async function getTopSinger() {
    const [[singer]] = await pool.query(`
        SELECT si.*, SUM(sp.playCount) as totalPlays
        FROM singers si
        JOIN songs s ON si.singerId = s.singerId
        JOIN songplays sp ON s.songId = sp.songId
        GROUP BY si.singerId
        ORDER BY totalPlays DESC
        LIMIT 1
    `);
    return singer;
}