const express = require("express");
const router = express.Router();
const conn = require("../config/db");

// 오너가 회원가입을 요청했을 때
router.post("/register", (req,res)=>{
    let { owner_id, owner_pw, store_name, business_registration_num, email } = req.body;
    let sql = "insert into owners values (?,?,?,?,?)"
    let = [
        owner_id, 
        owner_pw, 
        store_name, 
        business_registration_num, 
        email
    ]
    conn.query(sql, [owner_id, owner_pw, store_name, business_registration_num, email],(err, rows)=>{
        console.log("DB insert:", rows);

        if (rows) {
            console.log("점주 회원가입 성공");
            res.redirect("/")
        } else {
            res.send("<script>alert('회원가입 실패')</script>")
        }
    })
})

// 오너가 로그인을 요청했을 때
router.post("/login", (req,res)=>{
    let {id, pw} = req.body;
    let sql = "select * from owners where owner_id = ? and owner_pw =?"
    let = [id,pw]
    conn.query(sql, [id,pw], (err, rows)=>{
        if(rows.length > 0) {
            console.log("점주 로그인 성공");
            req.session.store_name = rows[0].store_name;
            req.session.email = rows[0].email;
            res.render("ownerpage", {
                store_name: req.session.store_name,
                email: req.session.email
            })
        } else {
            console.log("점주 로그인 실패")
            res.send("<script>alert('로그인 실패')</script>")
        }
    })
    
})

// 오너가 로그아웃을 요청했을 때
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})


module.exports = router;