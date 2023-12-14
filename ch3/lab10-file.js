const fs1 = require('fs')
const fs2 = require('fs').promises

//callback 방식.. 
fs1.writeFile('./sample.txt', '안녕하세요. 반값습니다.', (err) => {
  if(err){
    //write 실패.. 
    throw err
  }
  fs1.readFile('./sample.txt', (err, data) => {
    if(err){
      throw err
    }
    console.log(data.toString())
  })
})

fs2.writeFile('./sample2.txt', '파일 내용입니다.')
  .then(()=>{
    return fs2.readFile('./sample2.txt')
  })
  .then((data)=>{
    console.log(data.toString())
  })
  .catch((err)=>{
    console.error(err)
  })
//file read/write.. IO 발생하는 부분이다.
//위의 api 는 자동으로 콜백함수를 백그라운드로 보낸다..
//그럼으로 실행순서는 테스트 할때마다 차이가 날 수 있다..