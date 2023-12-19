const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

//test1.... param 데이터.. 
//client 요청 url 의 path 값 추출.. 
//path 부분에 데이터를 받고자 하는 곳에 :xxx
app.get('/:name/:addr/:age',(req, res) => {
  res.send(`param test1 : ${req.params.name}, ${req.params.addr}, ${req.params.age}`)
})
app.get('/name/:name/data/:data', (req, res) => {
  res.send(`param test2 : ${req.params.name}, ${req.params.data}`)
})
//http://localhost:3000/index.html



app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트로 대기중')
})