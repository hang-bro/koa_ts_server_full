/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 09:44:05
 */

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'welcome',
      query: {
        appName: 'koa',
      },
    },
  },

  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/views/welcome/index.vue'),
    meta: {
      title: '欢迎',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: 'dashboard',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'login',
    },
  },
  {
    path: '/resetPwd',
    name: 'resetPwd',
    component: () => import('@/views/login/resetPwd.vue'),
    meta: {
      title: '重置密码',
    },
  },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('@/views/login/regist.vue'),
    meta: {
      title: '注册',
    },
  },
  {
    path: '/onlineEditor',
    name: 'onlineEditor',
    redirect: {
      name: 'project',
    },
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/onlineEditor/components/project.vue'),
    meta: {
      title: '项目列表',
    },
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/onlineEditor/components/editor.vue'),
    meta: {
      title: '编辑器',
    },
  },

  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
    },
  },
]

export default routes
