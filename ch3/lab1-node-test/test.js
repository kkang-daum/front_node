// 브라우저에서 실행시킬 것 아니다.. 
//브라우저의 내장 객체를 이용하면 안된다.. 
function helloNode(){
  console.log('hello node')
}
function helloWorld() {
  console.log('hello world')
  helloNode()
}
helloWorld()