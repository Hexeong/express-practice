var express = require('express');
var router = express.Router();

// db 연결
var db = require('../config/MysqlDB')
var conn = db.init();

/* GET home page. */
// 상품 전체 조회
router.get("/", (req, res) => {
  var sql = "select * from items";
  conn.query(sql, (err, result) => {
    if (err) {
      console.log("query is not excuted : " + err);
      res.send("Error occured : Please confirm the console message!")
    }
      else res.render('showItems', {
        items : result
      })
  })
})

// 상품 상세 조회
router.get("/item/:id", (req, res) => {
  var sql = "select * from items where id=" + req.params.id;
  conn.query(sql, (err, result) => {
      if (err) {
        console.log("query is not excuted : " + err);
        res.send("Error occured : Please confirm the console message!")
      }
      else res.render('showItem',{
        item : result
      })
  })
})

// 상품 추가 페이지
router.get("/item/info", (req, res) => {
  res.render("addItem", {title : "New Item"})
})

module.exports = router;

// https://hasumang.tistory.com/56
// https://hanwitjus.tistory.com/60
// https://naltatis.github.io/jade-syntax-docs/#for
// https://junspapa-itdev.tistory.com/9