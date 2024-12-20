const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false, // Previously it was set as true 
  devServer: {
    host: 'localhost',
    port: 8080
  }
})
