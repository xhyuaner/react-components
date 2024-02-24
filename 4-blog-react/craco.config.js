// npm i -D @craco/craco
// 扩展webpack别名配置
const path = require('path');

module.exports = {
    webpack:{
        alias: {
            '@': path.resolve(__dirname,'src')
        }
    }
}