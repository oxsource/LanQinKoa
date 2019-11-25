const Results = require('../lib/results')
const logger = require('../lib/logger')
const ReportService = require('../service/report')

async function save(ctx, _) {
    const content = ctx.request.body
    let result = null
    try {
        const row = await ReportService.save(content)
        result = Results.success(row)
    } catch (error) {
        logger.error(error)
        result = Results.failure(error.message)
    }
    ctx.response.body = result
}

async function list(ctx, _) {
    const {page = 0, size = 5, kw = {}} = ctx.request.body
    let result = null
    try {
        const list = await ReportService.list(page, size, kw)
        result = Results.success(list)
    } catch (error) {
        logger.error(error)
        result = Results.failure(error.message)
    }
    ctx.response.body = result
}

async function detail(ctx, _) {
    const {id = -1} = ctx.request.query
    let result = null
    try {
        const row = await ReportService.detail(id)
        result = Results.success(row)
    } catch (error) {
        logger.error(error)
        result = Results.failure(error.message)
    }
    ctx.response.body = result
}

module.exports = {
    'POST /report/save': save,
    'POST /report/list': list,
    'GET /report/detail': detail
}
