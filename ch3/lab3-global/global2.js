const { sayHello } = require('./global1')

global.message = 'world'

sayHello()