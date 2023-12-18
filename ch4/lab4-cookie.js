const http = require('http')

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie)
  //응답하면서.. response header 에 쿠키 데이터 설정..
  //name=value 형식으로 몇개라도 전송 가능.. 
  //네트워크 통신에서 header, body 순서를 바꿀 수 없다..
  //항상 header 가 먼저 전송되고.. 그후에 body 전송.. 
  //아래의 두줄의 순서를 바꿀 수 없다..
  res.writeHead(200, {'Set-Cookie':'mycookie=test'})
  res.end('Hello Cookie')
})
.listen(8080, () => {
  console.log('8080 포트로 서버가 구동되었습니다.')
})

