// DB 연동 파일
const mysql = require("mysql2")

const conn = mysql.createConnection({
     host : "project-db-stu3.smhrd.com",
     port : 3307,
     user : "Insa5_JSB_hacksim_3",
     password : "aischool3",
     database : "Insa5_JSB_hacksim_3"
 })

// //연결 진행
 conn.connect();
 console.log("DB 연결 완료")
 module.exports = conn;