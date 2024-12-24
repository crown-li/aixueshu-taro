module.exports = {
  env: {
    NODE_ENV: '"development"',
    // TARO_APP_API:'"http://192.168.3.85:3000/api/v1"'
    TARO_APP_API:'"http://192.168.11.4:32636/api/v1"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      port: 10086
    }
  }
}
