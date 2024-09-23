const express = require("express");
const router = express.Router();
const conn = require("../config/db");

router.get("/", (req,res)=> {
    if(req.session.nick){
        res.render("main",{nick : req.session.nick})
    } else {
        res.render("main")
    }
})

// 사용자가 회원가입을 요청했을 때
router.get("/register", (req,res)=>{
    res.render("register")
})

// 사용자가 로그인을 요청했을 때
router.get("/login", (req,res)=>{
    res.render("login")
})

// 사용자가 로그아웃을 요청했을 때
router.get("/logout",(req,res)=>{
    res.render("logout")
})

// 마이페이지 이동
router.get("/mypage", (req,res)=>{
    if(req.session.nick){
        res.render("mypage", { 
            nick: req.session.nick,
            email: req.session.email
         });
    } else {
        res.render("mypage")
    } 
    console.log("마이페이지 이동")
})


// 사용자가 정보수정을 요청했을 때
router.get("/updateRegister", (req,res)=>{
    if(req.session.nick){
        res.render("updateRegister", { 
            nick: req.session.nick,
            email: req.session.email
         });
    } else {
        res.render("updateRegister")
    } 
    console.log("정보수정페이지 이동")
})

// 회원탈퇴 페이지 이동
router.get("/cancelMember", (req, res) => {
    if (req.session.nick) {
        res.render("cancelMember",{
            nick: req.session.nick,
            email: req.session.email
        });
    } else {
        res.render("cancelMember");
    }
    console.log("회원탈퇴페이지 이동");
});



// 찜 목록 이동
router.get("/wishList", (req,res)=>{
    if(req.session.nick){
        res.render("wishList", { 
            nick: req.session.nick,
            email: req.session.email
         });
    } else {
        res.render("wishList")
    } 
})

// 리뷰 페이지 이동
router.get("/reviewpage", (req,res)=>{
    if(req.session.nick){
        res.render("reviewpage", {
            nick: req.session.nick,
            email: req.session.email
        });
    } else {
        res.render("reviewpage")
    }
})

// REST API 엔드포인트
router.get('/getRestaurantDetails', (req, res) => {
    const restListName = req.query.rest_list_name;
    if (!restListName) {
        return res.status(400).json({ error: 'Restaurant name is required' });
    }

    const query = 'SELECT rest_list_price, rest_food_name FROM rest_product_tbl WHERE rest_list_name = ?';
    conn.query(query, [restListName], (err, results) => {
        console.log("음식db연결완료");
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length > 0) {
            res.json(results); // 배열 전체를 반환
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    });
});



module.exports = router;