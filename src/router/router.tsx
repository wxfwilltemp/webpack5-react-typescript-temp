/*
 * @Author: will
 * @Date: 2021-09-07 14:26:34
 * @LastEditTime: 2022-03-25 12:01:38
 * @LastEditors: will
 * @Description:
 */
import { lazy } from 'react';
import type { PathRouteProps } from 'react-router-dom';
interface itemRoute {
  auth: boolean;
  component?: any;
  redirect?: string;
  key?: string | number;
}

type arrItemRoute = itemRoute & PathRouteProps;

const Login = lazy(() => import(/* webpackChunkName:"Login" */ '@/page/user/Login'));

const routerArr: arrItemRoute[] = [
  {
    path: '/',
    auth: false,
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
    auth: false,
  },
];

export default routerArr;
