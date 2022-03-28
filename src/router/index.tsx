/*
 * @Author: will
 * @Date: 2022-03-25 09:52:07
 * @LastEditTime: 2022-03-25 17:54:25
 * @LastEditors: will
 * @Description:
 */
import { Suspense } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import routerArr from './router';
import { Spin } from 'antd';

const RenderRoutes = () => (
  <BrowserRouter basename={process.env.BASE_URL}>
    <Suspense fallback={<Spin />}>
      <Routes>
        {routerArr.map((item, i: any) => (
          <Route
            key={item.key || i}
            path={item.path}
            element={(() => {
              if (item?.path === '/' && item?.redirect) {
                return <Navigate to={item?.redirect} />;
              }
              return <item.component />;
            })()}
          />
        ))}
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default RenderRoutes;
