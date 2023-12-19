//node 에서 제공하는 모듈, node_modules 에 있는 모듈은 경로 명시할 필요 없이..
//모듈명을 그대로..
const express = require('express')
const path = require('path')

//서버 준비..
const app = express()
//app.set(), app 객체에 개발자 임의 데이터 담을 수 있다.. 그때 함수가 set()
app.set('port', process.env.PORT || 3000)

//get 방식으로 들어오는 요청 처리..
app.get('/', (req, res) => {
  // res.send('hello world3, express')
  //express 를 이용하면 fs 모듈을 직접 사용하지 않아도 된다. 내부적으로 이용해 준다.
  res.sendFile(path.join(__dirname, '/index.html'))
})

//app 에 담긴 데이터 획득, get()
app.listen(app.get('port'), () => {
  console.log('서버 실행중.. ')
})


//test1......................
//>node app1.js
//http://localhost:3000/ 로 확인 => ok
//코드 수정, 저장.. 
//브라우저 새로고침 ==> 변경사항 반영 안된다..
//서버 종료,  다시 서버 실행
//==>node 명령으로 서버 실행은 잘되지만.. 변경사항이 동적 적용되지 않아서(hot deploy)
//불편하다..

//test2...............
//>nodemon app1.js
//nodemon 이 설치되었다고 하더라도 라이브러리 모듈이 아니라, 툴이다(실행 명령어)
//위처럼 실행시키면 에러가 나는데, 아래처럼.. 명령어를 npx 로..
//>npx nodemon app1.js
//코드 수정, 저장, 브라우저 새로고침.. ==> 변경사항 반영(hot deploy 지원)

//test3...................
//package.json 에 실행 명령어 등록.. 
//>npm start
