module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns: false 默认值，无视浏览器兼容配置，引入所有 polyfill
        // useBuiltIns: entry 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill
        // useBuiltIns: usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
        useBuiltIns: 'entry',
        modules: false,
        corejs: '3.9.1',
        // targets: {
        //   ie: "11",
        //   chrome: "58",
        // },
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }], //  react 语法包，支持JSX、TSX语法格式 classic 旧的转换， automatic 新的转换
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持装饰器语法
    ['@babel/plugin-proposal-class-properties', { legacy: true }], // 支持装饰器语法
    ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: 'css' }],
  ],
};
