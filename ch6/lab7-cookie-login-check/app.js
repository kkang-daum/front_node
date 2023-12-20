//npm i cookie-parser
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))//client form 데이터 획득.. 

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "loginForm.html"))
})
app.post('/login', (req, res) => {
  if(req.body.id_check && req.body.id_check == 'on'){
    //로그인 처리 업무로직이 들어가고.. 

    //유저가 전달한 id 를 쿠키로 유지... 
    res.cookie('loginId', req.body.id, {
      maxAge: 60*1000,
    })
  }else {
    //체크가 안된 상태.. 쿠키 데이터가 설정되어 있다면 삭제시켜서.. id 출력안되게
    res.clearCookie('loginId',{})
  }
  res.sendFile(path.join(__dirname, 'loginOk.html'))
})

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트로 대기중')
})