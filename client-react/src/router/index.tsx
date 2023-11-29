/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-30 11:51:57
 */

import { Skeleton } from 'antd';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'; //
const routes = [

  {
    path: '',
    element: <Navigate to="test1" />,

  },
  {
    path: '/',
    element: <Navigate to="test1" />
  },
]


const pages = import.meta.glob('../views/**/*.{tsx,jsx}', { eager: true, })

for (const page in pages) {
  // @ts-ignore
  const Module = pages[page]?.default
  routes.push({
    path: page.split('/views/').pop()?.split('/')[0] as string,
    element: <Module />
  })
}
// 快速导入工具函数
export const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`@/views/${moduleName}/index.tsx`))
  return (
    <Suspense fallback={<Skeleton active />}>
      <Module />
    </Suspense>
  )
}








export default routes



/**注册路由 */
export const registerRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} key={1} element={lazyLoad('layout')} />
      <Route path={'/login'} key={2} element={lazyLoad('login')} />
      <Route path={'/home'} key={3} element={lazyLoad('home')} />
      <Route path={'/three'} key={4} element={lazyLoad('three')} >
        <Route path={'base'} key={5} element={lazyLoad('three/base')} />
        <Route path={'test'} key={6} element={lazyLoad('three/test')} />
      </Route>
      <Route path={'*'} key={7} element={lazyLoad('not-found')} />
    </Routes>
  )
}
