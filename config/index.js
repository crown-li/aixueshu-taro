const path = require("path");
const { UnifiedWebpackPluginV5 } = require('weapp-tailwindcss/webpack')

const config = {
  projectName: "aixueshu",
  date: "2024-3-12",
  // designWidth: 750,
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  // compiler: "webpack5",
  compiler: {
    type: "webpack5",
    prebundle: {
      exclude: ['taro-ui']
    }
  },
  enable: true,
  config: {
    limit: 10240 // 设定转换尺寸上限
  },
  cache: {
    enable: false,
  },
  alias: {
    "@": path.resolve(__dirname, "..", "src"),
  },
  mini: {
    webpackChain(chain) {
      chain.module
        .rule('image')
        .test(/\.(png|jpe?g|gif|svg)$/i)
        .use('url-loader')
        .loader(require.resolve('url-loader'))
        .options({
          limit: 2048,
          name: 'assets/[name].[hash:8].[ext]'
        });
      chain.module
        .rule('scss')
        .test(/\.scss$/)
        .use('sass-loader')
        .loader(require.resolve('sass-loader'))
        .options({
          sassOptions: {
            quietDeps: true
          }
        });
      chain.merge({
        plugin: {
          install: {
            plugin: UnifiedWebpackPluginV5,
            args: [{
              appType: 'taro',
              // 下面个配置，会开启 rem -> rpx 的转化
              rem2rpx: true,
              // baseFontSize: 16
            }]
          }
        }
      })
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
        // basePx: 16
      },
      url: {
        enable: true,
        config: {
          limit: 1024,
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "assets",
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: "module",
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
