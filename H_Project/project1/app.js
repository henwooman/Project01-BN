const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const path = require("path")
const bp = require("body-parser");
const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const ownerRouter = require("./routes/ownerRouter");
const reviewRouter = require("./routes/reviewRouter");
const session = require("express-session");
const fileStore = require('session-file-store')(session);



// css 출력
app.use(express.static(path.join(__dirname, 'public')));


// post 데이터 처리 등록
app.use(bp.urlencoded({extended : true}));

// 세션 설정
app.use(session({
    httpOnly : true,
    resave : false,
    secret : "secret",
    store : new fileStore(),
    saveUninitialized : false
}))



// 라우터 등록
app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/owner", ownerRouter);
app.use("/review", reviewRouter);



// 넌적스 셋팅
app.set("view engine", "html")
nunjucks.configure("views", {
    express : app,
    watch : true
});




app.listen(3000);


