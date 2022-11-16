const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@IotIndex': path.join(__dirname, './src/components/IotIndex'),
                '@hook': path.join(__dirname, './src/hook'),
                '@parts': path.join(__dirname, './src/components/parts'),
                '@store':path.join(__dirname,'./src/store.ts')
            }
        }
    }
}