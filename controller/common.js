const path = require('path');
const fs = require('fs');


exports.upload = async ( ctx, next ) => {
    const { type } = ctx.request.query;
    const file = ctx.request.files['file'];
    if (file) {
        // 创建可读流
        const reader = await fs.createReadStream(file['path']);
        console.log('reader---------')
        console.log(reader)
        let filePath = `${path.resolve(__dirname, `../public/images/${type}/`)}/${file['name']}`;
        remotefilePath = `http://yourServerHostAndPath/images/${file['name']}`;
        // 创建可写流
        const upStream = await fs.createWriteStream(filePath);
        console.log(upStream)
        // 可读流通过管道写入可写流
        reader.pipe(upStream);

        ctx.body = {
            code: 200, 
            data: remotefilePath,
            message: '上传成功'
        }
      }

      
}

