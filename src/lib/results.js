const Hints = require('../constant/hints')

class Results {
    constructor(data = undefined, msg = undefined, code = 0) {
        this.data = data
        this.msg = msg
        this.code = code
    }

    static success(data) {
        return new Results(data, undefined, 1)
    }

    static failure(msg, code = 0) {
        return new Results(undefined, msg, code)
    }

    static kickoff() {
        return new Results(undefined, Hints.NOT_LOGIN, 999)
    }
}

module.exports = Results
