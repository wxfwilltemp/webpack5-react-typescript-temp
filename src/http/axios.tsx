/*
 * @Author: will
 * @Date: 2021-09-07 14:26:34
 * @LastEditTime: 2022-03-25 12:35:48
 * @LastEditors: will
 * @Description:
 */
import axios from 'axios';
import config from './config';
import { message } from 'antd';
// import { createBrowserHistory } from "history";
import store from '../store/index';
// const history = createBrowserHistory({ forceRefresh: true });

// 请求次数
let repeat_count = 0;

// token 过期处理
const handleExpire = (result: any) => {
  result && message.error({ content: result?.msg });
  store.dispatch({ type: 'TOKEN', token: null });
  // history.push(`${process.env.BASE_URL}login`);
};

const ajax = function $axios(options: any) {
  return new Promise((resolve: any, reject: any) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      // withCredentials: config.withCredentials,
    });

    // request 拦截器
    instance.interceptors.request.use(
      (configOpt: any) => {
        if (!options.isTips) {
          message.loading({ content: '加载中', duration: 0 });
        }
        let token = store.getState()?.userReducer?.token || null;
        configOpt.headers['Auth-Token'] = token;
        console.log(options);
        return configOpt;
      },

      (error) => {
        // 请求错误时
        console.log(error);
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          // return instance.request(originalRequest);// 再重复请求一次
        }
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      },
    );
    // response 拦截器
    instance.interceptors.response.use(
      (response) => {
        message?.destroy();
        console.log(response);

        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = JSON.parse(response.request.responseText);
        } else {
          data = response.data;
        }
        const { headers } = response;
        // 文件下载响应的文件流
        if (
          headers['content-type'] &&
          headers['content-type'].indexOf('application/octet-stream') > -1
        ) {
          console.log(response);
          console.log(response.data instanceof Blob);

          return response.data;
        }
        // 文件流错误 blol 转换成 json
        // const fileReader: any = new FileReader();
        // fileReader.onloadend = () => {
        //   const jsonData = JSON.parse(fileReader.result);
        //   handleExpire(jsonData);
        // };
        // data?.size && data?.type && fileReader.readAsText(data);
        // 根据返回的code值来做不同的处理
        if (data?.code === 0 || data?.code === 200) {
          return data;
        }
        if (data.code === 401) {
          // token过期
          handleExpire(data);
          return;
        }
        console.log(data);
        data?.msg && message.error({ content: data?.msg });
      },
      (err) => {
        message?.destroy();
        let error = JSON.parse(JSON.stringify(err));
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          // return instance.request(originalRequest); // 再重复请求一次
          // 请求处理
          repeat_count++;
          if (repeat_count > config.retry) {
            repeat_count = 0;
            return;
          }
          // 重新在请求一次
          return instance(options)
            .then((res) => {
              resolve(res);
              return false;
            })
            .catch((errormsg) => {
              reject(errormsg);
            });
        }
        return Promise.reject(err);
      },
    );

    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res);
        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default ajax;
