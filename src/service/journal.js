const path = require("path")
const fs = require("fs")
const Hints = require('../constant/hints')

/**
 * 存储日志文件
 * @param {日志文件数组} files
 */
async function save(files) {
    if (null == files || null == files.file) throw Error(Hints.REQ_PARAM_ERROR)
    return new Promise((resolve, reject) => {
        const file = files.file;
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        const uploadDir = path.join(__dirname, '../../temps/upload/');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        const filePath = path.join(uploadDir, file.name);
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        resolve(filePath)
    })
}

module.exports = {
    save
}