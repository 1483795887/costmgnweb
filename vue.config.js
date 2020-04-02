module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }, devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': "/"
        }
      }
    }
  }
}