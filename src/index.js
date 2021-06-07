const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const route = require('./lib/route')
const Format = require('./lib/format')
const logger = require('./lib/logger')
const Keys = require('./constant/keys')
const cors = require('koa2-cors')
const JWT = require('./lib/jwt')
const koaBody = require('koa-body')

//import config
const conf = require(`./config/${process.env.NODE_ENV == Keys.ENV_PRD ? 'prd' : 'dev'}`)
//unite format 
Format.initDateJsonFormat()
//controller注入
const router = route.routes(`${__dirname}/controller`, conf.server.prefix)
//connect to mongo
const mongoOptions = {
    useNewUrlParser: true,
    server: {
        auto_reconnect: true,
        poolSize: 20
    }
}
mongoose.connect(conf.mongo.url, mongoOptions)
//koa-body config
const koaBodyOptions = {
    multipart: true,
    formidable: {
        maxFileSize: 10 * 1024 * 1024
    }
}

//create app
const app = new Koa()
app.use(cors())
app.use(JWT.endpoint)
app.use(JWT.inject([/^\/$/, /^\/security\/login/, /^\/report\//, /^\/journal\//]))
app.use(bodyParser()) //body解析
app.use(koaBody(koaBodyOptions));
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(conf.server.port)
logger.info(`app start at port ${conf.server.port}`)