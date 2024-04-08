import mysql from 'mysql2';

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'thoaiky1992',
    database: 'stream',
    connectionLimit: 10
})

export default db;