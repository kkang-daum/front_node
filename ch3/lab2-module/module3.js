let data3 = 10
function myFun3() {}
class MyClass3 {
  data2 = 30
}

// 가장 일반적인 형태..
// 여러개를 json object 로.. 
module.exports = {
  data3,//json 은 key:value 형태이지만.. key 와 value 가 동일하다면, data3:data3
  myFun22: myFun3,//myFun3 을 외부에는 myFun22 로.. 
  MyClass3
}