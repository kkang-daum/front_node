//npm i express-session
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')


const app = express()
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use(cookieParser('secret@1234'))//암호화된 쿠키를 사용하기 위한 임의 문자열(key)
app.use(session({
  secret: 'secret@1234',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,//front js 에서는 이 쿠키 데이터 접근하지 못하게.. 
  }
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  if(req.session.loginId) {
    //로그인한 유저.. 
    const output = `
      <h2>로그인한 사용자</h2>
      <p>${req.session.loginId}님 환영합니다.</p>
    `
    res.send(output)
  }else {
    //로그인 하지 않은 유저.. 
    const output = `
      <h2>로그인하지 않았습니다.</h2>
      <form action="login" method="post">
        ID <input type="text" name="id"/><br/>
        PW <input type="text" name="pw"/><br/>
        <input type="submit" value="login"/>
      </form>
    `
    res.send(output)
  }
})

app.post('/login', (req, res) => {
  //로그인 업무 처리.. 
  if(req.body.id && req.body.pw && req.body.id === req.body.pw){
    //로그인 성공으로 가정..
    //이후 이 유저 접속시에.. 로그인 상태 유지..
    req.session.loginId = req.body.id
    res.send(`
      <h3>${req.body.id}로 로그인 성공하였습니다.</h3>
      <a href="logout">logout</a><br/>
      <a href="/">main 페이지 가기</a>
    `)
  }else {
    //로그인 실패 상황..
    res.send(`
      <h3>로그인 실패하였습니다.</h3>
      <a href="/">main 페이지 가기</a>
    `)
  }
})

app.get('/logout', (req, res) => {
  //로그인 상태 유지를 위해 id 값을 유지하고 있음으로, 로그아웃 처리는 세션 삭제
  res.clearCookie('connect.sid')//세션 설정시 name 을 지정하지 않았다면.. 기본 name
  //이 connect.sid
  res.send(`
    <h3>logout</h3>
    <a href="/">main 페이지 가기</a>
  `)
})

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트로 대기중')
})