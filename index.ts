const express = require('express'),
  http = require('http'),
  swaggerUI = require('swagger-ui-express')
import swDocument from './swagger.def'
const app = express()
const bodyParser = require('body-parser').json()
app.use(bodyParser)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swDocument))
import loginRouter from './routes/login'
app.use('/login', loginRouter)
const server = http.createServer(app)
const hostname = '0.0.0.0'
const port = 3001
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})