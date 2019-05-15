const {User} = require('../repos/model')

function findByMobile(mobile) {
    if (null == mobile || mobile.length <= 0) return null
    return new Promise((resolve, reject) => {
        User.findOne({mobile}, function(error, row){
            if(error) return reject(error)
            resolve(row._doc)
        })
    })
}

function findById(uid) {
    if (null == uid || uid < 0) return null
    return new Promise((resolve, reject) => {
        User.findOne({uid}, function(error, row){
            if(error) return reject(error)
            resolve(row._doc)
        })
    })
}

module.exports = {
    findByMobile,
    findById
}