
import mysql from 'mysql2'

//conect to sql database
const pool = mysql.createPool({
    host: '127.0.0.1',
    password: 'Chayale1',
    user: 'root',
    database: 'musicdb',
}).promise();

export default pool;






























