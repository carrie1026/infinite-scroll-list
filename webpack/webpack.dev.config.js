const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.config");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
  }
const PORT = 8087
const publicPath = '/';
const webpackConfigDev = {
    mode:'development',
    plugins:[
        // new openBrowserPlugin({url:"http://localhost:8080"})
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        // 将打包后的资源注入到html文件内    
        new HtmlWebpackPlugin({
            // inject: true, // will inject the main bundle to index.html
            template: resolve('../src/index.html'),
            // 这里列出要加入html中的js文件
            dlls: [
            './resource/dll/vendor.dll.js'
            ],
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}/index`,
        }),
        // new BundleAnalyzerPlugin({ analyzerPort: 3500 })
    ],
    devtool: 'source-map',
    devServer:{
        contentBase: path.join(__dirname,"../src"),
        hot: true,
        host:'localhost',
        publicPath: publicPath, //添加
        inline: true,
        port: PORT,
        historyApiFallback: true,
        disableHostCheck: true,
        compress: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        overlay: { warnings: false, errors: true },
    }
}
module.exports = merge(webpackConfigBase, webpackConfigDev);