const log4js = require('log4js')
log4js.configure({
    appenders: {
        api: {
            type: 'dateFile',
            filename: 'logs/api',
            pattern: 'yyMMdd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {
            appenders: ['api'],
            level: 'info'
        }
    }
})

const logger = log4js.getLogger()

function error(e, ignore = ['ValidatorError']) {
    if (null == e) return (e.name in ignore ? console.log : logger.error)(e)
}

function info(i) {
    logger.info(i)
}

module.exports = {
    error,
    info
}