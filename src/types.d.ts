/*
 * @Author: will
 * @Date: 2021-07-29 15:56:47
 * @LastEditTime: 2022-03-25 09:59:42
 * @LastEditors: will
 * @Description:
 */
declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.less';
declare module '*.jpg';
declare module '*.svg';
declare module 'react-pdf/*';
declare module 'react-read-pdf';
declare module 'pdfh5';
declare module 'react-router-config';
declare module 'xf-tools';
declare module 'redux-persist/*';

declare interface Window {
  wangEditor: any;
  Print: any;
  http: any;
}
