const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const route = require('./lib/route')
const Format = require('./lib/format')
const logger = require('./lib/logger')
const Keys = require('./constant/keys')
const cors = require('koa2-cors')
const JWT = require('./lib/jwt')

//import config
const conf = require(`./config/${process.env.NODE_ENV==Keys.ENV_PRD?'prd':'dev'}`)
//unite format 
Format.initDateJsonFormat()
//controller注入
const router = route.routes(`${__dirname}/controller`, conf.server.prefix)
//connect to mongo
mongoose.connect(conf.mongo.url)

//create app
const app = new Koa()
app.use(cors())
app.use(JWT.endpoint)
app.use(JWT.inject([/^\/$/, /^\/security\/login/]))
app.use(bodyParser()) //body解析
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(conf.server.port)
logger.info(`app start at port ${conf.server.port}`)