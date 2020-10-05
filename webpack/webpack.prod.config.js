// Important modules this config uses
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfigBase = require('./webpack.base.config')
const merge = require('webpack-merge')

const webpackConfigProd = {
  mode: 'production',
  output: {
    filename: '[name]_[hash:8].js',
    chunkFilename: '[name]_[hash:8].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          priority: 10,
          test: /[\\/]node_modules[\\/]/, 
          minSize: 30000,
          minChunks: 1,
          reuseExistingChunk: true // 是否复用已经打包过的代码
        },
        common: {
          name: 'common',
          priority: 20,
          minChunks: 2,
          minSize: 30000,
          reuseExistingChunk: true // 是否复用已经打包过的代码
        },
        default: {
          name: 'default',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single',
    usedExports: true, // 使得 tree shaking 能够生效,将 css 从代码中拆分出来
    namedModules: true,
  },
  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true, // 清理html中的注释
        collapseWhitespace: true, // 清理html中的空格、换行符
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true, // 去掉style和link标签的type属性
        keepClosingSlash: true,
        minifyJS: true, // 压缩html内的js
        minifyCSS: true, // 压缩html内的样式
        minifyURLs: true,
      },
      inject: true,
    }),
    
  ],
  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
};

module.exports = merge(webpackConfigBase, webpackConfigProd)