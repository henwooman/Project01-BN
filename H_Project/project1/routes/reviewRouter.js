const express = require("express");
const router = express.Router();
const conn = require("../config/db");
const bodyParser = require('body-parser');
const axios = require('axios'); // axios 추가

// Body parser middleware 설정
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
    console.log("리뷰라우터 접속");
    res.send("리뷰 작성 페이지입니다.");
});

router.post("/send", async (req, res) => {
    console.log("리뷰 정보 입력 시 보내주는 코드 접속");
    const { storeName, reviewText } = req.body;
    console.log("가게명:", storeName);
    console.log("리뷰 내용:", reviewText);

    try {
        // Flask 서버에 리뷰 내용 보내는 부분
        const response = await axios.post('http://127.0.0.1:5000/analysis', { reviewText: reviewText });
    
        const pos_score = response.data.pos_score;
        const neg_score = response.data.neg_score;
        console.log("긍정 :", pos_score,"%");
        console.log("부정 :", neg_score,"%");

        // 데이터베이스에 저장
        const sql = "INSERT INTO member_wishlist (storeName, reviewText,pos_score,neg_score) VALUES (?, ?, ?,?)";
        conn.query(sql, [storeName, reviewText, pos_score,neg_score], (err, result) => {
            if (err) {
                console.error("리뷰 저장 중 오류 발생:", err);
                return res.status(500).json({ success: false, message: "리뷰 저장에 실패했습니다." });
            }
            console.log("리뷰 저장 성공:", result);
            res.json({ success: true, message: "리뷰가 성공적으로 저장되었습니다." });
        });
    } catch (error) {
        console.error("감성 분석 중 오류 발생:", error);
        res.status(500).json({ success: false, message: "감성 분석에 실패했습니다." });
    }
});

module.exports = router;
