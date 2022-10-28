const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'hook': path.join(__dirname, './src/hook')
            }
        }
    }
}