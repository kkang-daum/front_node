const http = require('http')
const fs = require('fs').promises
const path = require('path')

const resData = {}//응답데이터.. 

http.createServer(async (req, res) => {
  if(req.method === 'GET'){
    const data = await fs.readFile(path.join(__dirname, 'login.html'))
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    return res.end(data)
  }else if(req.method === 'POST'){
    //유저 전달 데이터 받기..
    let reqData = ''
    req.on('data', (data) => {
      reqData += data
    })
    req.on('end', ()=> {
      const {id, password} = JSON.parse(reqData)
      resData['id'] = id
      resData['password'] = password

      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
      res.end(JSON.stringify(resData))
    })
  }
})
.listen(8080, () => {
  console.log('서버 구동')
})