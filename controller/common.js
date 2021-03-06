const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs')
const CONFIG = require('../config/default')

exports.upload = async (ctx, next) => {
    const { type } = ctx.request.query;
    const file = ctx.request.files['file'];
    if (file) {
        // 创建可读流
        const reader = await fs.createReadStream(file['path']);
        const mkdirName = dayjs().format('YYYYMMDD');
        const fileNames = file.name.split('.');
        const name = `thumb-${dayjs().format('YYYYMMDDHHMMss')}.${fileNames[fileNames.length - 1]}`;
        const pathName = `../public/images/${type}/${mkdirName}`;
        const mkdirPath = path.resolve(__dirname, pathName);
        let filePath = path.resolve(__dirname, `${pathName}/${name}`);
        
        console.log(process.env.NODE_ENV)
        
        const host =  process.env.NODE_ENV === 'development' ? `http://localhost:${CONFIG.port}` : 'http://jhapi.fj-wanhe.com',
        remotefilePath = `${host}/images/${type}/${mkdirName}/${name}`;

        const whiteFile = async () => {
            const upStream = await fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
            ctx.body = {
                code: 200,
                data: remotefilePath,
                message: '上传成功'
            }
        }
        if (!fs.existsSync(mkdirPath)) {
            fs.mkdirSync(path.resolve(mkdirPath))
            await whiteFile()
        }
        else {
            await whiteFile()
        }
    }
}

