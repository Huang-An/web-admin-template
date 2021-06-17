const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  parallel: false,

  publicPath: './',

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/var.scss";`
      }
    }
  },

  chainWebpack: (config) => {
    // 设置 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('enums', resolve('src/enums'))
      .set('layout', resolve('src/layout'))
      .set('mixins', resolve('src/mixins'))
      .set('plugin', resolve('src/plugin'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
  },

  configureWebpack: () => {
    const plugins = [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './skeleton/main.js')
          }
        },
        minimize: true,
        quiet: true
      })
    ]

    // 如果是生产 开启gzip
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/,
          threshold: 0,
          deleteOriginalAssets: false
        })
      )
    }

    return {
      plugins
    }
  }
}
