const url = require('url')//노드에서 기본으로 제공하는 모듈.. 

const { URL } = url
//테스트 url 
const myUrl = new URL('https://www.google.com/search?q=javascript&oq=javascript&gs_lcrp=EgZjaHJvbWUyDggAEEUYJxg5GIAEGIoFMgwIARAjGCcYgAQYigUyDQgCEAAYgwEYsQMYgAQyDQgDEAAYgwEYsQMYgAQyDQgEEAAYgwEYsQMYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxOTY2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8')

console.log('myUrl', myUrl)
//url 객체를 문자열로 변환.. 
console.log('format', url.format(myUrl))

//전체 url 에서 query 문자열만 획득..
console.log('querys', myUrl.searchParams)
//query 문자열은 key=value 형태이다.. 키를 명시해서 특정 데이터 추출..
//동일 키로 데이터가 여러개 넘어오는 경우, 예로 들면.. 
//~~~~~?a=10&a=20&a=30
//클라이언트 체크박스 체크의 경우..
//모두 한번에 추출..
console.log('getAll', myUrl.searchParams.getAll('q'))
//하나만 추출..
console.log('get', myUrl.searchParams.get('q'))

//모든 키 값 획득..
console.log('keys', myUrl.searchParams.keys())
//모든 값을 획득
console.log('values', myUrl.searchParams.values())

// 동적으로 query 문자열.. 만들기.....................
//query 문자열 추가.. 
myUrl.searchParams.append('aaa','bbb')
console.log('format', url.format(myUrl))

//해당 key query 문자열 삭제후 추가.. 
myUrl.searchParams.set('aaa','ccc')
console.log('format', url.format(myUrl))