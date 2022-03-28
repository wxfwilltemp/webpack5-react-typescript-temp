/*
 * @Author: will
 * @Date: 2021-12-30 10:54:08
 * @LastEditTime: 2022-03-25 17:54:45
 * @LastEditors: will
 * @Description:
 */
console.log(`当前的打包环境===${process.env.NODE_ENV}`);

// 不同环境下的打包配置文件

let current_env_obj = {
  dev: {
    // 开发
    BASE_URL: '/',
    API_URL: '/net',
  },
  test: {
    // 测试
    BASE_URL: '/kwy/service-terminal/',
    API_URL: 'http://test8.hua-cloud.net:5540/kwy/net',
  },
  prod: {
    // 部署
    BASE_URL: '/service-terminal/',
    API_URL: 'https://ycsd.jcy.gz.gov.cn/net',
  },
};

module.exports = current_env_obj[process.env.NODE_ENV];
