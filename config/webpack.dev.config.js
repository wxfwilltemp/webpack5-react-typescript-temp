const { merge } = require('webpack-merge');
const BaseConfig = require('./webpack.base.config');
const path = require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const PORT = 9006;

console.log('process.env.NODE_ENV=', process.env.NODE_ENV);

// 路劲处理方法
function resolve(dir) {
  return path.join(__dirname, `../${dir}`);
}

/**
 * @type {import('webpack').Configuration}
 */

const config = {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: resolve('public'), // 静态文件目录
    compress: true, // 是否启动压缩
    hot: true, // 热更新
    open: true,
    port: PORT,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/api': {
        target: 'http://172.16.121.19:8873',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/i,
        // include: resolve("src"),
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 开启HMR
    new HtmlWebapckPlugin({
      title: 'document',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      cdn: {
        css: [],
        js: [],
      },
    }),
    // 添加友好提示
    new FriendlyErrorsPlugin({
      // 成功的时候输出
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${PORT}`],
      },
      // 是否每次都清空控制台
      clearConsole: true,
      onErrors: (severity, errors) => {
        // 系统级桌面提示
        notifier.notify({
          title: 'webpack 编译失败了~',
          message: `${severity} ${errors[0].name}`,
          subtitle: errors[0].file || '',
          icon: resolve('public/favicon.ico'),
        });
      },
    }),
  ],
};

// console.log(merge(BaseConfig, config));

module.exports = merge(BaseConfig, config);
