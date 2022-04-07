const { merge } = require('webpack-merge');
const BaseConfig = require('./webpack.base.config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PurgecssPlugin = require('purgecss-webpack-plugin'); // 删除多余的css
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

console.log('process.env.NODE_ENV=', process.env.NODE_ENV);

// 路劲处理方法
function resolve(dir) {
  return path.join(__dirname, `../${dir}`);
}

/**
 * @type {import('webpack').Configuration}
 */

const config = {
  mode: 'production',
  output: {
    filename: 'js/[name]_[contenthash:8].js',
    chunkFilename: 'js/[name]_[contenthash:8].js',
    clean: true,
  },
  optimization: {
    usedExports: true, // 只导出被使用模块，即标记没有用的模块
    sideEffects: true, // 开启副作用
    minimize: true, // 开启压缩，摇掉没有用的模块
    concatenateModules: true, // 所有的模块合并到一个函数里面去
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false, // 不将注释提取到单独的文件中 即不生成 LICENSE.txt 文件
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.table'], // 删除console
          },
        },
      }),
    ],
    runtimeChunk: true, // 创建一个在所有生成chunk之间共享的运行时文件
    // 分包
    splitChunks: {
      cacheGroups: {
        // 配置提取模块的方案
        default: false,
        styles: {
          name: 'styles',
          test: /\.(s?css|less|sass)$/,
          chunks: 'all',
          enforce: true,
          priority: 10,
        },
        common: {
          name: 'chunk-common',
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          enforce: true,
          reuseExistingChunk: true,
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 2,
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.(le|c)ss$/i,
      //   // include: resolve("src"),
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      // },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/i,
        include: resolve('src'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'document',
      filename: 'index.html',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: {
        // 压缩HTML文件
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true, // 压缩内联css
      },
      cdn: {
        css: [],
        js: [],
      },
      cache: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    process.env.NODE_ENV === 'analyzer' &&
      new BundleAnalyzerPlugin({
        // analyzerMode: "disabled", // 不启动展示打包报告的http服务器
        // generateStatsFile: true, // 是否生成stats.json文件
      }),
    // 删除多余的css
    new PurgecssPlugin({
      paths: glob.sync(`${resolve('src')}/**/*`, { nodir: true }),
    }),
    // 拷贝静态文件
    new CopyPlugin({
      patterns: [
        {
          from: '*.js',
          context: resolve('public/static'),
          to: resolve('dist/static'),
        },
      ],
    }),
  ].filter(Boolean),
};

module.exports = merge(BaseConfig, config);
