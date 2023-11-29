/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-29 10:09:10
 */

import { useCss } from '@/hooks/useCss';
import { Outlet, useRoutes, } from 'react-router-dom'
import routes from '@/router';
import { Skeleton } from 'antd';
import { Suspense } from 'react';

const App = () => {
  useCss()
  return (
    <>
      {useRoutes(routes)}
      <Suspense fallback={<Skeleton active />}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default App;