import express from 'express';
let router = express.Router();
import connection from '../db';

//创建一个connection连接
connection.connect(function(err) {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  console.log('[connection connect] succeed!'); //如果连接成功 控制台输出 success 了
});

router.post('/exec', function(req, res, next) {
  const { type, sql } = req.body;
  console.log(sql.trim());
  connection.query(sql, function(err, rows, fields) {
    if (err) {
      console.log('[query] - :' + err);
      res.send(err);
      return;
    }
    res.send(rows);  //这里在页面上输出数据
  });
});

module.exports = router;
