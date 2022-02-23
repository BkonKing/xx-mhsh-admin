const path = require('path')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
const vueConfig = {
  publicPath: process.env.NODE_ENV === 'production' ? '/film' : '/',
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate
      })
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[ext]'
      })

    // 只留下Moment的中文包
    config
      .plugin('ContextReplacementPlugin')
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])

    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(WebpackBundleAnalyzer.BundleAnalyzerPlugin)
    }

    // 清除js版本号
    config.output.filename('static/[name].js').end()
    config.output.chunkFilename('static/[name].js').end()

    if (process.env.NODE_ENV === 'production') {
      // gzip开启
      // config
      //   .plugin('CompressionPlugin')
      //   .use(CompressionPlugin, [])
      // 清除hash css
      config.plugin('extract-css').tap(args => [{
        filename: 'static/[name].css',
        chunkFilename: 'static/[name].css'
      }])
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(__dirname, 'src/styles/variable.less')}"; @import "${path.join(__dirname, 'src/styles/mixins.less')}";`,
          // less 变量，定制主题
          'primary-color': '#1890ff',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000,
    open: true,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/apilife': {
        target: 'http://develop.mhshjy.com/life/spi/v1',
        // target: 'https://live.tosolomo.com/life/spi/v1',
        pathRewrite: {
          '^/apilife': ''
        }
      },
      '/apiwsolid': {
        target: 'https://develop.mhshjy.com/wsolid/spi/v1',
        // target: 'https://test.tosolomo.com/wsolid/spi/v1',
        pathRewrite: {
          '^/apiwsolid': ''
        }
      },
      '/api': {
        target: 'http://develop.mhshjy.com/nsolid/spi/v1',
        // target: 'https://test.tosolomo.com/nsolid/spi/v1',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/zht': {
        target: 'http://develop.mhshjy.com',
        // target: 'https://test.tosolomo.com',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/zht'
        }
      }
    }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
