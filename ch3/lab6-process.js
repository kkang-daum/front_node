console.log(process.env.PATH)
console.log(process.env.MY_MYSQL_KEY)

setImmediate(()=> {
  console.log('immediate')
})

process.nextTick(()=> {
  console.log('nextTick')
})

setTimeout(()=> {
  console.log('timeout')
}, 0)

Promise.resolve().then(()=> console.log('promise'))