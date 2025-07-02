import mysql from 'mysql2/promise';

const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp_db',
});

export default db;
