import express from 'express';
let router = express.Router();
import connection from '../db';

//创建一个connection连接
connection.connect(function(err) {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  console.log('[connection connect] succeed!');
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
    res.send(rows);
  });
});

module.exports = router;
