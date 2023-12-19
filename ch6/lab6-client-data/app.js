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

//test2...... query(search) 문자열 획득.. 
//url ? 뒤에 등록되어 전달되는 데이터.. 
//url 이 request header 정보임으로.. query 문자열은 body 데이터는 아니고.. 
//header 데이터.. 
app.get('/query1', (req, res) => {
  res.send(`
  query1 test: name=${req.query.name}, addr=${req.query.addr}, age=${req.query.age}`)
})

app.get('/query2', (req, res) => {
  let ide = req.query.ide
  console.dir(ide)
  //ide 로 데이터가 안넘어 올수도 있고(유저가 선택 안했다면)
  //ide 로 데이터가 하나만 넘어올수도 있고.. (유저가 하나만 선택하면..)
  //ide 로 데이터가 여러개 넘어올수도 있고.. (유저가 여러개 선택하면.. ) ==>배열로..
  let ideResult = ''
  if(ide && Array.isArray(ide)){
    ide.forEach((element) => {
      ideResult += element + ','
    })
  }else {
    ideResult = ide
  }

  let car2 = req.query.cars2
  let car2Result = ''
  if(car2 && Array.isArray(car2)){
    car2.forEach((element) => {
      car2Result += element + ','
    })
  }else {
    car2Result = car2
  }

  res.send(`
    입력하신 데이터는, 
    name=${req.query.name},
    apple=${req.query.apple},
    peach=${req.query.peach},
    ide=${ideResult},
    language=${req.query.language},
    car1=${req.query.cars1},
    car2=${car2Result}
  `)
})



app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트로 대기중')
})