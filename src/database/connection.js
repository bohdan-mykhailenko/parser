const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'admin',
  password: 'admin',
  database: 'store',
});

connection.connect();

module.exports = connection;
