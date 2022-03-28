const webpack = require('webpack');
const path = require('path');
const WebpackBar = require('webpackbar');
const current_env_obj = require('./env.prefix.config.js');

// 路劲处理方法
function resolve(dir) {
  return path.join(__dirname, `../${dir}`);
}

const isDev = process.env.NODE_ENV === 'dev';

/**
 * @type {import('webpack').Configuration}
 */

module.exports = {
  entry: {
    index: './src/main.tsx',
  },
  output: {
    path: resolve('dist'),
    publicPath: current_env_obj.BASE_URL,
  },
  resolve: {
    extensions: ['.tsx', '.js', '.ts', '.json'],
    alias: {
      '@': resolve('src'),
    },
    modules: [resolve('src'), 'node_modules'], // 优先在src目录下查找要解析的文件
  },
  module: {
    rules: [
      {
        test: /\.tsx$/i,
        include: [resolve('src'), resolve('config')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDev && [require.resolve('react-refresh/babel'), { skipEnvCheck: true }],
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        // include: resolve("src"),
        type: 'asset',
        generator: {
          // 输出文件位置及文件名
          filename: 'images/[name][contenthash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024, // 超过50kb不转base64
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        include: resolve('src'),
        type: 'asset',
        generator: {
          // 输出文件位置及文件名
          filename: 'fonts/[name][contenthash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 超过10kb不转base64
          },
        },
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
    ],
  },
  cache: {
    type: 'filesystem',
  },
  stats: 'errors-warnings', // 仅输出控制的错误和警告
  plugins: [
    // 进度条
    new WebpackBar(),
    // 全局变量
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(current_env_obj.BASE_URL),
      'process.env.API_URL': JSON.stringify(current_env_obj.API_URL),
    }),
  ].filter(Boolean),
};
