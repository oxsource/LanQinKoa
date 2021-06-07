const Results = require('../lib/results')
const logger = require('../lib/logger')
const JournalService = require('../service/journal')

async function save(ctx, _) {
    const content = ctx.request.files
    let result = null
    try {
        const row = await JournalService.save(content)
        result = Results.success(row)
    } catch (error) {
        logger.error(error)
        result = Results.failure(error.message)
    }
    ctx.response.body = result
}

module.exports = {
    'POST /journal/save': save
}
