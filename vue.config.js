module.exports = {
  configureWebpack: {
    devtool: 'eval-source-map',

  },
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    disableHostCheck: true,
    proxy: 'http://localtesting.com',

  }
}