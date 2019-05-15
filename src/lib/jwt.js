const Results = require('./results')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const secret = 'jwt_lm_law'

module.exports = {
    inject: (path) => jwtKoa({
        secret
    }).unless({
        path
    }),

    sign: (content) => jwt.sign(content, secret, {
        expiresIn: '2h'
    }),

    endpoint: async (ctx, next) => {
        return await next().catch(error => {
            const message = error.originalError ? error.originalError.message : error.message
            ctx.body = error.status === 401 ? Results.kickoff() : Results.failure(message)
        })
    }
}