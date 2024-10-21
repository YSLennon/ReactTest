const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'sample'
});

connection.connect((err) => {
    if(err) {
        console.error('MySQL 연결 에러: ', err);
        return;
    }
    console.log('MySQL 연결 성공')
})

module.exports = connection;