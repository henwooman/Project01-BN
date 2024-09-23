const express = require("express");
const router = express.Router();
const conn = require("../config/db")

// 1. 회원가입 로직  
router.post("/register", (req, res) => {
    let { id, pw, nick, email } = req.body;
    let sql = "insert into member_tbl values (?,?,?,?)"
    let = [
        id,
        pw,
        nick,
        email
    ]
    conn.query(sql, [id, pw, nick, email], (err, rows) => {
        console.log("DB insert:", rows);

        if (rows) {
            console.log("회원가입 성공");
            res.render("succesRegister")
        } else {
            
           // 로그인 실패
           console.log('로그인 실패: 사용자 정보 불일치');
           res.send("<script>alert('로그인 실패'); location.href='/login';</script>");
        }
    })
})

// 2. 로그인 로직
router.post("/login", (req, res) => {
    let { id, pw } = req.body;
    let sql = "select * from member_tbl where id = ? and pw = ?"
    let = [ id, pw ]
    conn.query(sql, [id, pw], (err, rows) => {
        if(rows.length > 0) {
            console.log("로그인성공");
            req.session.nick = rows[0].nick;
            req.session.email = rows[0].email;
            res.redirect("/")
        } else {
            console.log("로그인 실패");
            res.send("<script>alert('로그인 실패'); location.href='/login';</script>");
        }
    })
})

// 3.회원수정 로직 - 수정 
router.post("/updateRegister", (req, res) => {
    let { pw,nick } = req.body;
    let sql = "updateRogister member_tbl set nick =? where pw=?"
    let = [ pw,  nick ]

    conn.query(sql, [pw,nick], (err, rows) => {
        if (rows.affectedRows > 0) {
            console.log("변경성공");
            res.redirect("/")
        } else {
            console.log("변경 실패");
            res.send("<script>alert('로그인 실패')</script>")
        }
    })
})


// 4. 회원정보 삭제
router.post("/cancelMember", (req, res) => {
    console.log(req.body);
    let { id, pw, nick, email } = req.body;
    let sql = "DELETE FROM member_tbl WHERE id=? AND pw=? AND nick=? AND email=?";
    
    conn.query(sql, [id, pw, nick, email], (err, rows) => {
        if (err) {
            console.error('DB 삭제 에러:', err);
            res.status(500).send('서버 에러');
            return;
        }
        console.log("DB삭제 확인", rows);
        if (rows.affectedRows > 0) {
            console.log("정보 삭제 성공!");
            req.session.destroy();
            res.render("deleteAccount");
        } else {
            console.log("변경 없음!");
            res.send("<script>alert('회원정보가 없습니다.'); location.href='/cancelMember';</script>");
        }
    });
});


// 5. 로그아웃
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/")
})

module.exports = router;