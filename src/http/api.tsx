/*
 * @Author: will
 * @Date: 2021-09-07 14:26:34
 * @LastEditTime: 2022-02-24 14:16:21
 * @LastEditors: will
 * @Description:
 */
// 通用相关接口
import axios from './axios';
import configs from './config';

const postData = ({ url, data, configHeader, responseType, ...reset }: any) => {
  console.log({ ...configs.headers, ...configHeader });

  return axios({
    url,
    method: 'post',
    responseType: responseType || configs.responseType,
    data,
    headers: configHeader ? { ...configs.headers, ...configHeader } : configs.headers,
    ...reset,
  });
};

const getData = ({ url, data, configHeader, responseType, ...reset }: any) => {
  return axios({
    url,
    method: 'get',
    params: data,
    responseType: responseType || configs.responseType,
    headers: configHeader ? { ...configs.headers, ...configHeader } : configs.headers,
    ...reset,
  });
};

// 默认全部导出
export default {
  postData,
  getData,
};
