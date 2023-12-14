const string = 'abc'
const number = 1
const boolean = true
const obj = {
  outer: {
    inside: {
      key: 'value'
    }
  }
}

//매개변수는 개발자 임의 단어.. timeEnd() 의 매개변수와 맞추기만 하면된다..
//time() 과 timeEnd() 사이의 시간이 자동으로 측정된다.. 
console.time('전체시간')
//가장 기본 로그 출력.. 
//매개변수 여러개.... 하나하나를 스페이스로 연결해서 출력해 준다.. 
console.log(string, number, boolean)

//객체 로깅은 dir() 이 유용하다.. dir 을 사용하면서 option 지정해서.. depth 를 설정가능
console.dir(obj, {colors:false, depth: 2})
console.dir(obj, {colors:true, depth: 1})

// 로그를 테이블 형식으로도 출력이 가능하다..
console.table([{name: 'kim', age: 30}, {name: 'lee', age: 25}])

//time 은 중첩 가능, 어떻게 선언하든.. 매개변수가 동일한 영역사이의 시간.. 
console.time('시간측정')
for(let i = 0; i< 100000; i++){}
console.timeEnd('시간측정')

function b(){
  //이 함수를 어디서 호출했는지를 추적하고자 할때 이용
  console.trace('b 함수 호출 위치추적')
}
function a(){
  b()
}
a()

console.timeEnd('전체시간')
