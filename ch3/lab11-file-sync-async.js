const fs = require('fs')

//fs 모듈의 기본은 비동기이다.. 
//빠르게 진행되기는 하지만.. 여러개를 비동기로 요청하는 경우 작업의 순서를 
//제어할 수 없다..
//작업 순서를 제어해야 한다면.. 동기방식..
//동기방식을 위해 함수명+Sync 를 제공한다..

//동기 테스트........................
//동기적으로. 함수 호출후.. 함수가 끝날 때가지 대기(blocking)임으로..
//결과를 콜백으로 받는 것이 아니라.. 함수의 리턴 값으로.. 
console.log('start...................')
let data = fs.readFileSync('./sample.txt')
console.log('step1', data.toString())

data = fs.readFileSync('./sample.txt')
console.log('step2', data.toString())

data = fs.readFileSync('./sample.txt')
console.log('step3', data.toString())

//여러 io 가 발생하고.. 그 io 작업이 동기적으로 실행해야 한다고 하더라도..
//위처럼 작성하면 성능에 문제가 될 수도 있다..
//한 유저가 접속해서 3개의 파일을 순차적으로 읽으면 상관이 없는데..
//10명의 유저가 동시접속했다.. single thread 에 의해 동작한다..
//1명의 유저 작업이 동기적으로 모두 끝나야.. 2번 유저가 작업, 3번 유저 작업...

//순서에 의해 io 가 실행된다고 하더라도..
//비동기로 처리하고.. 그러면 10명의 요청이 백그라운드에서 동시에 진행가능.. 
//백그라운드에서 작업을 콜백안에 명시해서.. 하나의 작업이 끝나면 다음 작업이 이루어지게

//위의 작업을 백그라운드에서.. 순서를 맞추면서..
console.log('start.................')
fs.readFile('./sample.txt', (err, data) => {
  if(err){
    throw err;
  }
  console.log('step1', data.toString())
  fs.readFile('./sample.txt', (err, data) => {
    if(err){
      throw err;
    }
    console.log('step2', data.toString())
    fs.readFile('./sample.txt', (err, data) => {
      if(err){
        throw err;
      }
      console.log('step3', data.toString())
    })
  })
})


