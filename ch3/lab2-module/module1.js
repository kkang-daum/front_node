// js 에서는 모듈이 js 파일이다..
// 단순 파일 개념이 아니라.. 이 파일에 있는 멤버(변수,함수,클래스) 를 외부에 공개할
//것인가? 의 문제이다..
let data = 10
function myFun(){}
class MyClass {
  data2 = 20
}

// 이 파일에 있는 멤버를 외부 파일에서 이용하려면. export(노출) 시켜야 한다..
// export 한 멤버만 외부에서 이용 가능. 모든 멤버를 export 할 필요는 없다..
// 외부에서 이용해야 하는 것만.. 

// exports.xxx = yyy 구조로 여러개 export
// yyy 는 이 파일내의 멤버 이름.. 
// xxx 는 외부에 노출되는 이름.. 실제 멤버 이름과 달라고 상관없다.. 
exports.MyClass = MyClass
exports.myData = data
exports.myFun = myFun