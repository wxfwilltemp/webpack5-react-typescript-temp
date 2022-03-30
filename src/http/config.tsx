/*
 * @Author: will
 * @Date: 2021-09-07 14:26:34
 * @LastEditTime: 2022-03-30 13:39:11
 * @LastEditors: will
 * @Description:
 */
export default {
  method: 'get',
  // 基础url前缀
  baseUrl: process.env.API_URL,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  // 设置请求超时重新请求次数
  retry: 1,
  // 参数
  data: {},
  // 设置超时时间
  timeout: 5000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json',
};
