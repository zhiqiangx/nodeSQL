import mysql from 'mysql';

//创建一个connection
let connection = mysql.createConnection({
  host: 'myh', //主机
  user: 'root',     //数据库用户名
  password: '!QAZ2wsx',     //数据库密码
  port: '3306',
  charset: 'UTF8_GENERAL_CI' //数据库编码
});

export default connection;
