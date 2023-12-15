// 이 파일은 브라우저에서 dynamic 역할을 할 js 파일
// 서버에서는 클라이언트 요청이 들어오면 그대로 클라이언트에게 전송할 static 파일

//html 로딩시에 실행되어 서버에 user 데이터 요청역할 함수.. 
async function getUser() {
  try{
    //서버 요청.. res-서버에서 받은 결과 데이터..
    //'/users' - url 의 path..
    const res = await axios.get('/users')
    //서버 데이터를 화면에 찍기 위한 부분..
    const users = res.data;
    const list = document.getElementById('list')
    list.innerHTML = '';

    //여러건이 넘어왔다.. 반복적으로 실행하면서..
    Object.keys(users).map(function(key){
      const userDiv = document.createElement('div')

      const span = document.createElement('span')
      span.textContent = users[key];

      const edit = document.createElement('button')
      edit.textContent='수정'
      edit.addEventListener('click', async () => {
        //유저가 수정 버튼을 클릭한다면.. 유저에게 수정할 데이터를 받자.. 간단하게
        //prompt 로..
        const name = prompt('바꿀 이름을 입력하세요')
        if(!name){//이름이 입력되지 않았다면.. 
          return alert('이름은 입력되어야 합니다.')
        }
        //위에, user 데이터를 받았을때와 다른 method(PUT)
        await axios.put('/user/'+key, {name})
        getUser()
      })

      const remove = document.createElement('button')
      remove.textContent='삭제'
      remove.addEventListener('click', async () => {
        //데이터 삭제를 위해서 다른 메서드 이용..
        await axios.delete('/user/'+key)
        getUser()
      })

      //동적으로 생성된 html태그를 화면에 출력.. 
      userDiv.appendChild(span)
      userDiv.appendChild(edit)
      userDiv.appendChild(remove)
      list.appendChild(userDiv)

    })
  }catch(err){
    console.error(err)
  }
}

window.onload = getUser

document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();//submit 버튼이 클릭된후 화면이 다른곳으로 전환되지 않게 하기 위해서
  //유저 입력 데이터 추출..
  const name = e.target.username.value;
  if(!name){
    return alert('이름을 입력하세요')
  }
  try{
    //서버에 등록 요청.. 
    await axios.post('/user', {name})
    getUser()
  }catch(err){
    console.error(err)
  }
  //화면에서 유저가 입력한 문자열 삭제.. 
  e.target.username.value=''
})