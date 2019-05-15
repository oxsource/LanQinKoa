const mongoose = require('mongoose')

/**日志信息结构 */
const logSchema = new mongoose.Schema({
    //基本信息
    appId: String,
    appVersion: String,
    appChannel: String,
    happenTime: Number,
    phoneModel: String,
    osInfo: String,
    sdkInt: Number,
    //内存信息
    memMax: Number,
    memTotal: Number,
    memTotal: Number,
    memFree: Number,
    memUsage: Number,
    //网络时间
    netSpendSec: Number,
    //错误信息
    errTag: String,
    errStack: String,
    errStack: String,
    //用户信息
    userAccount: String,
    lastLoginTime: String,
    //日志级别：普通-0，调试-1，错误-2，奔溃-3
    level: Number,
    //记录时间
    createTime: Number
})

/**用户信息结构 */
const userSchema = new mongoose.Schema({
    uid: {type: String, unique: true},
    mobile: {type: String, unique: true},
    pin: String,
    forbid: {type: Boolean, default: false},
    createTime: Number
})

/**应用信息结构 */
const appSchema = new mongoose.Schema({
    appid: {type: String, unique: true},
    pkgName: {type: String, unique: true},
    forbid: {type: Boolean, default: false},
    createTime: Number
})

module.exports = {
    Log: mongoose.model("Log", logSchema),
    User: mongoose.model("User", userSchema),
    App: mongoose.model("App", appSchema)
}